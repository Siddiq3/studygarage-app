import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Image, Modal, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../../components/ui/PressableScale";

const COIN_IMAGE = require("../../../assets/coin.png");

const SCRIM_IN_MS = 180;
const BLAST_START_DELAY_MS = 160;
const BLAST_WAVE_DELAYS = [BLAST_START_DELAY_MS, BLAST_START_DELAY_MS + 380];
const PAPER_WAVE_DELAYS = [
  BLAST_START_DELAY_MS + 80,
  BLAST_START_DELAY_MS + 820,
  BLAST_START_DELAY_MS + 1660,
];
const CARD_IN_DELAY_MS = 980;
const CARD_IN_MS = 220;
const MIN_VISIBLE_MS = 6800;
const PARTICLE_COUNT = 40;
const CUT_COUNT = 180;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SCREEN_DIAGONAL = Math.hypot(SCREEN_WIDTH, SCREEN_HEIGHT);

type RedeemSuccessData = {
  voucherType?: string;
  amount?: number;
  coinsUsed?: number;
  status?: string;
};

type Props = {
  visible: boolean;
  data?: RedeemSuccessData;
  onClose?: () => void;
  onViewHistory?: () => void;
  autoDismiss?: boolean;
  minimumVisibleMs?: number;
  hapticsEnabled?: boolean;
};

type ParticleMeta = {
  id: string;
  kind: "coin" | "dot";
  angle: number;
  radius: number;
  rotateDeg: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
};

type PendingAction = "close" | "history" | null;

type CutMeta = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  rotateStart: number;
  rotateEnd: number;
  duration: number;
  delay: number;
  color: string;
};

function createSeededRandom(seed: number) {
  let current = seed % 2147483647;
  if (current <= 0) current += 2147483646;
  return () => {
    current = (current * 16807) % 2147483647;
    return (current - 1) / 2147483646;
  };
}

function buildParticleMeta(seed: number): ParticleMeta[] {
  const rand = createSeededRandom(seed);
  const result: ParticleMeta[] = [];

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const angle = rand() * Math.PI * 2;
    const radius = SCREEN_DIAGONAL * (0.42 + rand() * 0.28);
    const duration = 980 + rand() * 520;
    const stagger = 18 + Math.round(rand() * 17);
    const delay = index * stagger;
    const kind: "coin" | "dot" = rand() > 0.38 ? "coin" : "dot";
    const size = kind === "coin" ? 13 + rand() * 11 : 4 + rand() * 7;
    const rotateDeg = -25 + rand() * 50;
    const dotPalette = ["#FFD86B", "#9D78FF", "#36D8A3", "#E9EEFF"];
    const color =
      kind === "dot" ? dotPalette[index % dotPalette.length] : "transparent";

    result.push({
      id: `blast_${seed}_${index}`,
      kind,
      angle,
      radius,
      rotateDeg,
      duration,
      delay,
      size,
      color,
    });
  }

  return result;
}

function buildCutMeta(seed: number): CutMeta[] {
  const rand = createSeededRandom(seed * 17 + 91);
  const colors = ["#FFD86B", "#9D78FF", "#36D8A3", "#DCE3F8", "#7C5CFF"];
  const result: CutMeta[] = [];

  for (let index = 0; index < CUT_COUNT; index += 1) {
    const edgeRoll = rand();
    const startRegion: "top" | "left" | "right" =
      edgeRoll < 0.45 ? "top" : edgeRoll < 0.72 ? "left" : "right";

    let startX = 0;
    let startY = 0;
    let endX = 0;

    if (startRegion === "top") {
      startX = rand() * SCREEN_WIDTH;
      startY = -30 - rand() * 180;
      endX = startX + (-140 + rand() * 280);
    } else if (startRegion === "left") {
      startX = -35 - rand() * 95;
      startY = -40 + rand() * SCREEN_HEIGHT * 0.62;
      endX = startX + SCREEN_WIDTH * (0.55 + rand() * 0.6);
    } else {
      startX = SCREEN_WIDTH + 35 + rand() * 95;
      startY = -40 + rand() * SCREEN_HEIGHT * 0.62;
      endX = startX - SCREEN_WIDTH * (0.55 + rand() * 0.6);
    }

    const endY = SCREEN_HEIGHT + 90 + rand() * 240;
    const width = 3 + rand() * 5;
    const height = 13 + rand() * 22;
    const rotateStart = -45 + rand() * 90;
    const rotateEnd = rotateStart + (-360 + rand() * 720);
    const duration = 2050 + rand() * 1850;
    const delay = rand() * 2900;
    const color = colors[index % colors.length];

    result.push({
      id: `cut_${seed}_${index}`,
      startX,
      startY,
      endX,
      endY,
      width,
      height,
      rotateStart,
      rotateEnd,
      duration,
      delay,
      color,
    });
  }

  return result;
}

async function maybeTriggerHaptic(enabled: boolean) {
  if (!enabled) return;

  try {
    const module = await import("expo-haptics");
    const Haptics = module?.default || module;
    const impactStyle = Haptics?.ImpactFeedbackStyle?.Light;
    if (!Haptics?.impactAsync || !impactStyle) return;
    await Haptics.impactAsync(impactStyle);
  } catch (_error) {
    // Silent fallback by design.
  }
}

function BlastParticle({
  meta,
  blastToken,
}: {
  meta: ParticleMeta;
  blastToken: number;
}) {
  const progress = useSharedValue(0);
  const waveShift = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    if (blastToken < 1) return;
    waveShift.value = ((blastToken % 4) - 1.5) * 0.12;

    progress.value = withDelay(
      meta.delay,
      withTiming(1, {
        duration: meta.duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [blastToken, meta.delay, meta.duration, progress, waveShift]);

  useEffect(
    () => () => {
      cancelAnimation(progress);
    },
    [progress]
  );

  const particleStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const angle = meta.angle + waveShift.value;
    const tx = Math.cos(angle) * meta.radius * p;
    const ty = Math.sin(angle) * meta.radius * p;
    const rotate = meta.rotateDeg * p;

    return {
      opacity: interpolate(p, [0, 0.06, 0.82, 1], [0, 1, 0.88, 0]),
      transform: [
        { translateX: tx },
        { translateY: ty },
        { rotateZ: `${rotate}deg` },
        { scale: interpolate(p, [0, 1], [0.9, 1]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        particleStyle,
        {
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: -meta.size / 2,
          marginTop: -meta.size / 2,
        },
      ]}
    >
      {meta.kind === "coin" ? (
        <Image
          source={COIN_IMAGE}
          resizeMode="contain"
          style={{ width: meta.size, height: meta.size }}
        />
      ) : (
        <View
          style={{
            width: meta.size,
            height: meta.size,
            borderRadius: meta.size / 2,
            backgroundColor: meta.color,
            opacity: 0.95,
          }}
        />
      )}
    </Animated.View>
  );
}

function PaperCut({ meta, fallToken }: { meta: CutMeta; fallToken: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    if (fallToken < 1) return;

    progress.value = withDelay(
      meta.delay,
      withTiming(1, {
        duration: meta.duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [fallToken, meta.delay, meta.duration, progress]);

  useEffect(
    () => () => {
      cancelAnimation(progress);
    },
    [progress]
  );

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const fallCurve = p * p * 0.82 + p * 0.18;
    const x = meta.startX + (meta.endX - meta.startX) * p;
    const y = meta.startY + (meta.endY - meta.startY) * fallCurve;
    const rotate = meta.rotateStart + (meta.rotateEnd - meta.rotateStart) * p;

    return {
      opacity: interpolate(p, [0, 0.08, 0.82, 1], [0, 0.95, 0.9, 0]),
      transform: [
        { translateX: x },
        { translateY: y },
        { rotateZ: `${rotate}deg` },
        { scale: interpolate(p, [0, 1], [0.8, 1]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        style,
        {
          position: "absolute",
          width: meta.width,
          height: meta.height,
          borderRadius: 2,
          backgroundColor: meta.color,
        },
      ]}
    />
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View className="mb-2 mr-2 rounded-full border border-white/12 bg-[#1A2233] px-3 py-1.5">
      <Text className="text-[11px] font-bold text-[#D9E0F0]">{label}</Text>
    </View>
  );
}

export default function RedeemSuccessOverlay({
  visible,
  data,
  onClose,
  onViewHistory,
  autoDismiss = false,
  minimumVisibleMs = MIN_VISIBLE_MS,
  hapticsEnabled = false,
}: Props) {
  const [mounted, setMounted] = useState(visible);
  const [canDismiss, setCanDismiss] = useState(false);
  const [blastToken, setBlastToken] = useState(0);
  const [fallToken, setFallToken] = useState(0);
  const [seed, setSeed] = useState(1);

  const openCountRef = useRef(0);
  const pendingActionRef = useRef<PendingAction>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scrimOpacity = useSharedValue(0);
  const scrimLiftOpacity = useSharedValue(0);
  const shockwaveScale = useSharedValue(0.2);
  const shockwaveOpacity = useSharedValue(0);
  const shockwaveScale2 = useSharedValue(0.2);
  const shockwaveOpacity2 = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.96);
  const cardTranslateY = useSharedValue(10);
  const checkScale = useSharedValue(0.95);

  const particles = useMemo(() => buildParticleMeta(seed), [seed]);
  const paperCuts = useMemo(() => buildCutMeta(seed), [seed]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const fireAction = useCallback(
    (action: PendingAction) => {
      if (action === "history") {
        onViewHistory?.();
      } else {
        onClose?.();
      }
    },
    [onClose, onViewHistory]
  );

  const finishClose = useCallback(
    (action: PendingAction) => {
      clearTimers();
      setMounted(false);
      setCanDismiss(false);
      pendingActionRef.current = null;
      fireAction(action);
    },
    [clearTimers, fireAction]
  );

  const closeWithAnimation = useCallback(
    (action: PendingAction) => {
      scrimOpacity.value = withTiming(0, { duration: 150 });
      cardOpacity.value = withTiming(0, { duration: 150 });
      cardScale.value = withTiming(0.97, { duration: 170 });
      cardTranslateY.value = withTiming(8, { duration: 170 }, (finished) => {
        if (finished) {
          runOnJS(finishClose)(action);
        }
      });
    },
    [cardOpacity, cardScale, cardTranslateY, finishClose, scrimOpacity]
  );

  const requestAction = useCallback(
    (action: PendingAction) => {
      if (!canDismiss) {
        pendingActionRef.current = action;
        return;
      }
      closeWithAnimation(action);
    },
    [canDismiss, closeWithAnimation]
  );

  useEffect(() => {
    if (!visible) {
      clearTimers();
      setMounted(false);
      setCanDismiss(false);
      pendingActionRef.current = null;
      scrimOpacity.value = 0;
      scrimLiftOpacity.value = 0;
      shockwaveScale.value = 0.2;
      shockwaveOpacity.value = 0;
      shockwaveScale2.value = 0.2;
      shockwaveOpacity2.value = 0;
      cardOpacity.value = 0;
      cardScale.value = 0.96;
      cardTranslateY.value = 10;
      checkScale.value = 0.95;
      return;
    }

    openCountRef.current += 1;
    const nextSeed = 1000 + openCountRef.current * 97;

    setMounted(true);
    setCanDismiss(false);
    setSeed(nextSeed);
    setBlastToken(0);
    setFallToken(0);
    pendingActionRef.current = null;
    clearTimers();

    scrimOpacity.value = 0;
    scrimLiftOpacity.value = 0;
    shockwaveScale.value = 0.2;
    shockwaveOpacity.value = 0;
    shockwaveScale2.value = 0.2;
    shockwaveOpacity2.value = 0;
    cardOpacity.value = 0;
    cardScale.value = 0.96;
    cardTranslateY.value = 10;
    checkScale.value = 0.95;

    scrimOpacity.value = withTiming(1, { duration: SCRIM_IN_MS });

    BLAST_WAVE_DELAYS.forEach((waveDelay, waveIndex) => {
      timersRef.current.push(
        setTimeout(() => {
          scrimLiftOpacity.value = withSequence(
            withTiming(1, { duration: 120, easing: Easing.out(Easing.cubic) }),
            withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) })
          );

          if (waveIndex === 0) {
            maybeTriggerHaptic(hapticsEnabled);
          }

          shockwaveOpacity.value = 0.35 - waveIndex * 0.06;
          shockwaveScale.value = 0.2;
          shockwaveScale.value = withTiming(2.8 + waveIndex * 0.3, {
            duration: 900,
            easing: Easing.out(Easing.cubic),
          });
          shockwaveOpacity.value = withTiming(0, {
            duration: 860,
            easing: Easing.out(Easing.cubic),
          });

          shockwaveOpacity2.value = 0.24 - waveIndex * 0.05;
          shockwaveScale2.value = 0.2;
          shockwaveScale2.value = withDelay(
            70,
            withTiming(3.4 + waveIndex * 0.35, {
              duration: 980,
              easing: Easing.out(Easing.cubic),
            })
          );
          shockwaveOpacity2.value = withDelay(
            70,
            withTiming(0, {
              duration: 940,
              easing: Easing.out(Easing.cubic),
            })
          );

          setBlastToken((token) => token + 1);
        }, waveDelay)
      );
    });

    PAPER_WAVE_DELAYS.forEach((waveDelay) => {
      timersRef.current.push(
        setTimeout(() => {
          setFallToken((token) => token + 1);
        }, waveDelay)
      );
    });

    timersRef.current.push(
      setTimeout(() => {
        cardOpacity.value = withTiming(1, { duration: CARD_IN_MS });
        cardTranslateY.value = withTiming(0, {
          duration: CARD_IN_MS,
          easing: Easing.out(Easing.cubic),
        });
        cardScale.value = withSpring(1, {
          damping: 14,
          stiffness: 210,
          mass: 0.82,
        });
        checkScale.value = withSequence(
          withTiming(1.08, { duration: 220, easing: Easing.out(Easing.cubic) }),
          withTiming(1, { duration: 210, easing: Easing.out(Easing.cubic) })
        );
      }, CARD_IN_DELAY_MS)
    );

    timersRef.current.push(
      setTimeout(() => {
        setCanDismiss(true);
        if (pendingActionRef.current) {
          const pending = pendingActionRef.current;
          pendingActionRef.current = null;
          closeWithAnimation(pending);
        } else if (autoDismiss) {
          closeWithAnimation("close");
        }
      }, Math.max(minimumVisibleMs, MIN_VISIBLE_MS))
    );
  }, [
    autoDismiss,
    cardOpacity,
    cardScale,
    cardTranslateY,
    checkScale,
    clearTimers,
    closeWithAnimation,
    hapticsEnabled,
    minimumVisibleMs,
    scrimLiftOpacity,
    scrimOpacity,
    shockwaveOpacity,
    shockwaveOpacity2,
    shockwaveScale,
    shockwaveScale2,
    visible,
  ]);

  useEffect(
    () => () => {
      clearTimers();
      cancelAnimation(scrimOpacity);
      cancelAnimation(scrimLiftOpacity);
      cancelAnimation(shockwaveScale);
      cancelAnimation(shockwaveOpacity);
      cancelAnimation(shockwaveScale2);
      cancelAnimation(shockwaveOpacity2);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(checkScale);
    },
    [
      cardOpacity,
      cardScale,
      cardTranslateY,
      checkScale,
      clearTimers,
      scrimLiftOpacity,
      scrimOpacity,
      shockwaveOpacity,
      shockwaveOpacity2,
      shockwaveScale,
      shockwaveScale2,
    ]
  );

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));

  const scrimLiftStyle = useAnimatedStyle(() => ({
    opacity: scrimLiftOpacity.value * 0.16,
  }));

  const shockwaveStyle = useAnimatedStyle(() => ({
    opacity: shockwaveOpacity.value,
    transform: [{ scale: shockwaveScale.value }],
  }));

  const shockwaveStyle2 = useAnimatedStyle(() => ({
    opacity: shockwaveOpacity2.value,
    transform: [{ scale: shockwaveScale2.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  if (!visible && !mounted) return null;

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      statusBarTranslucent
      hardwareAccelerated
      presentationStyle="overFullScreen"
    >
      <View className="flex-1 items-center justify-center px-6">
        <Animated.View
          style={[
            scrimStyle,
            {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(10,10,10,0.78)",
            },
          ]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            scrimLiftStyle,
            {
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "#7C5CFF",
            },
          ]}
        />

        <Animated.View
          style={cardStyle}
          className="w-full max-w-[390px] rounded-[26px] border border-white/14 bg-[#151B28] px-5 pb-5 pt-6"
        >
          <View className="items-center">
            <View className="h-[86px] w-[86px] items-center justify-center rounded-full border border-[#47E4B8]/35 bg-[#164E45]/55">
              <Animated.View style={checkStyle}>
                <Ionicons name="checkmark" size={40} color="#56FFD0" />
              </Animated.View>
            </View>
            <Text className="mt-3 text-center text-[28px] font-black text-[#F5F7FF]">
              Request Submitted
            </Text>
            <Text className="mt-2 text-center text-[13px] font-medium leading-[18px] text-[#B8C0D4]">
              We’ll update your wallet after verification.
            </Text>
          </View>

          <View className="mt-5 flex-row flex-wrap items-center justify-center">
            <Chip label={`Voucher: ${data?.voucherType || "Google"}`} />
            <Chip label={`Amount: ₹${Number(data?.amount || 0)}`} />
            <Chip label={`Coins Used: ${Number(data?.coinsUsed || 0)}`} />
            <Chip
              label={`Status: ${String(
                data?.status || "PENDING"
              ).toUpperCase()}`}
            />
          </View>

          <View className="mt-6">
            <PressableScale
              onPress={() => requestAction("close")}
              activeScale={0.96}
              className="rounded-[15px] border border-white/12 bg-[#1A1C2E] py-3"
            >
              <Text className="text-center text-[15px] font-extrabold text-[#F5F7FF]">
                Done
              </Text>
            </PressableScale>

            <PressableScale
              onPress={() => requestAction("history")}
              activeScale={0.96}
              className="pb-1 pt-3"
            >
              <Text className="text-center text-[13px] font-bold text-[#CFD7EA]">
                View History
              </Text>
            </PressableScale>
          </View>
        </Animated.View>

        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          {paperCuts.map((cut) => (
            <PaperCut key={cut.id} meta={cut} fallToken={fallToken} />
          ))}
          <Animated.View
            style={[
              shockwaveStyle,
              {
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -110,
                marginTop: -110,
                width: 220,
                height: 220,
                borderRadius: 110,
                borderWidth: 2,
                borderColor: "rgba(124,92,255,0.32)",
                backgroundColor: "rgba(124,92,255,0.08)",
              },
            ]}
          />
          <Animated.View
            style={[
              shockwaveStyle2,
              {
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -140,
                marginTop: -140,
                width: 280,
                height: 280,
                borderRadius: 140,
                borderWidth: 1.5,
                borderColor: "rgba(157,120,255,0.26)",
                backgroundColor: "rgba(157,120,255,0.06)",
              },
            ]}
          />
          {particles.map((meta) => (
            <BlastParticle key={meta.id} meta={meta} blastToken={blastToken} />
          ))}
        </View>
      </View>
    </Modal>
  );
}

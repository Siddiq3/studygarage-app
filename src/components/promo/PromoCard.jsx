import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Linking, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import PressableScale from "../ui/PressableScale";

const PROMO_REMOTE_URL =
  "https://raw.githubusercontent.com/Siddiq3/Api/main/promotions.json";
const PROMO_CACHE_KEY = "sg_promo_cards_cache_v1";
const PROMO_CACHE_UPDATED_AT_KEY = "sg_promo_cards_cache_updated_at_v1";
const AUTO_SCROLL_INTERVAL_MS = 3600;
const AUTO_SCROLL_RESUME_DELAY_MS = 2400;
const FALLBACK_IMAGE_ASPECT_RATIO = 1.5;

const toText = (value) => String(value ?? "").trim();
const toArray = (value) => (Array.isArray(value) ? value : []);

const normalizeClassKey = (value) =>
  toText(value)
    .toLowerCase()
    .replace(/[\s_-]+/g, "");

const normalizeBoardKey = (value) => {
  const normalized = toText(value)
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
  if (
    normalized === "ap" ||
    normalized === "andhra" ||
    normalized === "andhrapradesh"
  ) {
    return "andhrapradesh";
  }
  if (
    normalized === "ts" ||
    normalized === "tg" ||
    normalized === "telangana"
  ) {
    return "telangana";
  }
  if (normalized === "ka" || normalized === "karnataka") {
    return "karnataka";
  }
  return normalized;
};

const normalizeBoardClassPair = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    const board = normalizeBoardKey(value?.stateBoard || value?.board);
    const classKey = normalizeClassKey(value?.classValue || value?.class);
    if (!board || !classKey) return "";
    return `${board}:${classKey}`;
  }

  const raw = toText(value);
  if (!raw) return "";
  const [boardPart, classPart] = raw.split(/[:|/]/);
  const board = normalizeBoardKey(boardPart);
  const classKey = normalizeClassKey(classPart);
  if (!board || !classKey) return "";
  return `${board}:${classKey}`;
};

const normalizeCard = (item = {}, index = 0) => {
  const isActive =
    item?.isActive === true ||
    String(item?.isActive ?? "").toLowerCase() === "true";

  const targeting = item?.targeting || {};
  const stateBoardsRaw = toArray(item?.stateBoards).concat(
    toArray(targeting?.stateBoards)
  );
  const classValuesRaw = toArray(item?.classValues)
    .concat(toArray(item?.classes))
    .concat(toArray(targeting?.classValues))
    .concat(toArray(targeting?.classes));
  const boardClassPairsRaw = toArray(item?.boardClassPairs)
    .concat(toArray(targeting?.boardClassPairs))
    .concat(toArray(targeting?.boardClass));

  return {
    id: toText(item?.id) || `promo-${index}`,
    title: toText(item?.title),
    description: toText(item?.description),
    image: toText(item?.image),
    buttonText: toText(item?.buttonText || item?.ctaText) || "Explore",
    url: toText(item?.url || item?.targetUrl),
    isActive,
    priority: Number.isFinite(Number(item?.priority))
      ? Number(item.priority)
      : 999,
    targeting: {
      stateBoards: stateBoardsRaw.map(normalizeBoardKey).filter(Boolean),
      classValues: classValuesRaw.map(normalizeClassKey).filter(Boolean),
      boardClassPairs: boardClassPairsRaw
        .map(normalizeBoardClassPair)
        .filter(Boolean),
    },
  };
};

const extractCards = (payload) => {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.cards)
    ? payload.cards
    : Array.isArray(payload?.results)
    ? payload.results
    : [];

  return list
    .map((item, index) => normalizeCard(item, index))
    .filter((card) => card.image && card.url);
};

const getAudienceMatch = (card, audience) => {
  const boardKey = normalizeBoardKey(audience?.stateBoard);
  const classKey = normalizeClassKey(audience?.classValue);
  const pairKey = boardKey && classKey ? `${boardKey}:${classKey}` : "";

  const stateBoards = toArray(card?.targeting?.stateBoards);
  const classValues = toArray(card?.targeting?.classValues);
  const boardClassPairs = toArray(card?.targeting?.boardClassPairs);
  const hasTargeting =
    stateBoards.length > 0 ||
    classValues.length > 0 ||
    boardClassPairs.length > 0;

  if (!hasTargeting) {
    return { matched: true, score: 0 };
  }

  let matched = true;
  let score = 0;

  if (boardClassPairs.length > 0) {
    const pairMatched = pairKey && boardClassPairs.includes(pairKey);
    if (!pairMatched) matched = false;
    else score += 4;
  }

  if (stateBoards.length > 0) {
    const boardMatched = boardKey && stateBoards.includes(boardKey);
    if (!boardMatched) matched = false;
    else score += 2;
  }

  if (classValues.length > 0) {
    const classMatched = classKey && classValues.includes(classKey);
    if (!classMatched) matched = false;
    else score += 2;
  }

  return { matched, score };
};

const selectActiveCardsForAudience = (cards = [], audience) => {
  const activeCards = cards.filter((card) => card.isActive);
  if (!activeCards.length) return [];

  return activeCards
    .map((card) => ({ card, match: getAudienceMatch(card, audience) }))
    .filter((entry) => entry.match.matched)
    .sort((a, b) => {
      if (a.match.score !== b.match.score) {
        return b.match.score - a.match.score;
      }
      return a.card.priority - b.card.priority;
    })
    .map((entry) => entry.card);
};

function PromoTile({
  item,
  width,
  imageFailed,
  onImageError,
  onImageLoad,
  onPress,
  imageAspectRatio,
}) {
  const bannerAspectRatio =
    Number.isFinite(imageAspectRatio) && imageAspectRatio > 0
      ? imageAspectRatio
      : FALLBACK_IMAGE_ASPECT_RATIO;

  return (
    <View style={{ width }}>
      <PressableScale
        onPress={onPress}
        activeScale={0.975}
        accessibilityRole="link"
        accessibilityLabel={item.title || item.id || "Featured tool"}
        accessibilityHint="Opens in browser"
      >
        <LinearGradient
          colors={["rgba(139,92,246,0.38)", "rgba(59,130,246,0.2)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="overflow-hidden rounded-[18px] p-[1px]"
        >
          <View className="overflow-hidden rounded-[17px] border border-white/10 bg-[#111726]">
            {!imageFailed && item.image ? (
              <View className="relative">
                <Image
                  source={{ uri: item.image }}
                  resizeMode="contain"
                  onError={onImageError}
                  onLoad={onImageLoad}
                  style={{
                    width: "100%",
                    aspectRatio: bannerAspectRatio,
                    backgroundColor: "#111726",
                  }}
                />
                <LinearGradient
                  colors={["rgba(8,10,16,0.08)", "rgba(8,10,16,0.34)"]}
                  start={{ x: 0.5, y: 0.1 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute inset-0"
                />
              </View>
            ) : (
              <View
                className="w-full items-center justify-center bg-[#0E1320]"
                style={{ aspectRatio: bannerAspectRatio }}
              >
                <Ionicons name="apps-outline" size={30} color="#B8C0D4" />
              </View>
            )}

            <View className="absolute right-3 top-3 h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/35">
              <Ionicons name="open-outline" size={18} color="#F3F7FF" />
            </View>
          </View>
        </LinearGradient>
      </PressableScale>
    </View>
  );
}

export default function PromoCard({ stateBoard = "", classValue = "" }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFailures, setImageFailures] = useState({});
  const [imageAspectRatios, setImageAspectRatios] = useState({});
  const [sliderWidth, setSliderWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mountedRef = useRef(true);
  const flatListRef = useRef(null);
  const autoScrollTimerRef = useRef(null);
  const autoResumeTimerRef = useRef(null);
  const userDraggingRef = useRef(false);
  const currentIndexRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
    if (autoResumeTimerRef.current) {
      clearTimeout(autoResumeTimerRef.current);
      autoResumeTimerRef.current = null;
    }
  }, []);

  const hydrateFromCache = useCallback(async () => {
    try {
      const cachedRaw = await AsyncStorage.getItem(PROMO_CACHE_KEY);
      if (!cachedRaw) return [];

      const cachedPayload = JSON.parse(cachedRaw);
      const allCards = extractCards(cachedPayload);
      return selectActiveCardsForAudience(allCards, { stateBoard, classValue });
    } catch (_error) {
      return [];
    }
  }, [classValue, stateBoard]);

  const refreshRemote = useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(PROMO_REMOTE_URL, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Promo request failed: ${response.status}`);
      }

      const payload = await response.json();
      const allCards = extractCards(payload);
      const selectedCards = selectActiveCardsForAudience(allCards, {
        stateBoard,
        classValue,
      });

      await Promise.all([
        AsyncStorage.setItem(PROMO_CACHE_KEY, JSON.stringify(payload)),
        AsyncStorage.setItem(
          PROMO_CACHE_UPDATED_AT_KEY,
          new Date().toISOString()
        ),
      ]);

      if (mountedRef.current) {
        setCards(selectedCards);
        setCurrentIndex(0);
        currentIndexRef.current = 0;
      }
    } catch (_error) {
    } finally {
      clearTimeout(timeoutId);
    }
  }, [classValue, stateBoard]);

  useEffect(() => {
    mountedRef.current = true;

    const load = async () => {
      const cachedCards = await hydrateFromCache();
      if (!mountedRef.current) return;

      if (cachedCards.length > 0) {
        setCards(cachedCards);
        setCurrentIndex(0);
        currentIndexRef.current = 0;
        setLoading(false);
      }

      await refreshRemote();

      if (mountedRef.current) {
        setLoading(false);
      }
    };

    load().catch(() => {
      if (mountedRef.current) {
        setLoading(false);
      }
    });

    return () => {
      mountedRef.current = false;
      clearTimers();
    };
  }, [clearTimers, hydrateFromCache, refreshRemote]);

  useEffect(() => {
    clearTimers();

    if (cards.length <= 1 || sliderWidth <= 0) {
      return undefined;
    }

    autoScrollTimerRef.current = setInterval(() => {
      if (userDraggingRef.current) return;

      const nextIndex = (currentIndexRef.current + 1) % cards.length;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * sliderWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
      currentIndexRef.current = nextIndex;
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => {
      clearTimers();
    };
  }, [cards.length, clearTimers, sliderWidth]);

  const handleOpen = useCallback(async (url) => {
    if (!url) return;

    try {
      await Linking.openURL(url);
    } catch (_error) {}
  }, []);

  const onSliderLayout = useCallback((event) => {
    const width = event?.nativeEvent?.layout?.width;
    if (!Number.isFinite(width) || width <= 0) return;
    setSliderWidth(width);
  }, []);

  const markImageFailed = useCallback((cardId) => {
    setImageFailures((prev) => {
      if (prev[cardId]) return prev;
      return { ...prev, [cardId]: true };
    });
  }, []);

  const clearImageFailure = useCallback((cardId) => {
    setImageFailures((prev) => {
      if (!prev[cardId]) return prev;
      const next = { ...prev };
      delete next[cardId];
      return next;
    });
  }, []);

  const cacheImageAspectRatio = useCallback((cardId, imageUrl) => {
    if (!cardId || !imageUrl) return;

    Image.getSize(
      imageUrl,
      (imageWidth, imageHeight) => {
        const aspectRatio = imageWidth / imageHeight;
        if (
          !mountedRef.current ||
          !Number.isFinite(aspectRatio) ||
          aspectRatio <= 0
        ) {
          return;
        }

        setImageAspectRatios((prev) => {
          if (prev[cardId] === aspectRatio) return prev;
          return { ...prev, [cardId]: aspectRatio };
        });
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    setImageFailures({});
  }, [cards]);

  useEffect(() => {
    cards.forEach((card) => {
      if (!card?.id || !card?.image || imageAspectRatios[card.id]) {
        return;
      }
      cacheImageAspectRatio(card.id, card.image);
    });
  }, [cacheImageAspectRatio, cards, imageAspectRatios]);

  const handleScrollBeginDrag = useCallback(() => {
    userDraggingRef.current = true;
    if (autoResumeTimerRef.current) {
      clearTimeout(autoResumeTimerRef.current);
      autoResumeTimerRef.current = null;
    }
  }, []);

  const handleScrollRelease = useCallback(() => {
    if (autoResumeTimerRef.current) {
      clearTimeout(autoResumeTimerRef.current);
    }

    autoResumeTimerRef.current = setTimeout(() => {
      userDraggingRef.current = false;
    }, AUTO_SCROLL_RESUME_DELAY_MS);
  }, []);

  const handleMomentumEnd = useCallback(
    (event) => {
      if (sliderWidth <= 0) return;
      const x = event?.nativeEvent?.contentOffset?.x || 0;
      const nextIndex = Math.max(
        0,
        Math.min(cards.length - 1, Math.round(x / sliderWidth))
      );
      setCurrentIndex(nextIndex);
      currentIndexRef.current = nextIndex;
      handleScrollRelease();
    },
    [cards.length, handleScrollRelease, sliderWidth]
  );

  const handleScrollToIndexFailed = useCallback(
    (info) => {
      if (sliderWidth <= 0) return;
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToOffset({
          offset: info.index * sliderWidth,
          animated: true,
        });
      });
    },
    [sliderWidth]
  );

  if ((loading && cards.length === 0) || cards.length === 0) {
    return null;
  }

  return (
    <View onLayout={onSliderLayout} className="mb-4">
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={cards}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollRelease}
        onMomentumScrollEnd={handleMomentumEnd}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <PromoTile
            item={item}
            width={sliderWidth > 0 ? sliderWidth : 300}
            imageFailed={!!imageFailures[item.id]}
            imageAspectRatio={imageAspectRatios[item.id]}
            onImageError={() => markImageFailed(item.id)}
            onImageLoad={() => clearImageFailure(item.id)}
            onPress={() => handleOpen(item.url)}
          />
        )}
      />

      {cards.length > 1 ? (
        <View className="mt-3 flex-row items-center justify-center">
          {cards.map((item, index) => {
            const active = index === currentIndex;
            return (
              <View
                key={`${item.id}-dot-${index}`}
                className={`mx-1 rounded-full ${
                  active ? "h-2 w-5" : "h-2 w-2"
                }`}
                style={{
                  backgroundColor: active
                    ? "rgba(176,38,255,0.95)"
                    : "rgba(255,255,255,0.22)",
                }}
              />
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

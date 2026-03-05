import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import WebView from "react-native-webview";
import Animated, { FadeIn } from "react-native-reanimated";
import MrecAdComponent from "../MrecAdComponent";
import ShimmerSkeleton from "../src/components/ui/ShimmerSkeleton";

function resolveByPath(obj, path) {
  if (!obj || !path) return "";
  const parts = String(path)
    .split(".")
    .map((item) => item.trim())
    .filter(Boolean);

  let ref = obj;
  for (const part of parts) {
    if (ref == null) return "";
    ref = ref[part];
  }
  return typeof ref === "string" ? ref : "";
}

function sanitizeUrl(value) {
  if (!value) return "";
  return String(value).trim();
}

function buildViewerFallback(url) {
  return `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(
    url
  )}`;
}

function extractDriveFileId(url) {
  const clean = sanitizeUrl(url);
  if (!clean) return "";

  const fromPath = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fromPath?.[1]) return fromPath[1];

  const fromIdParam = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (fromIdParam?.[1]) return fromIdParam[1];

  return "";
}

function buildCandidateUrls(inputUrl) {
  const clean = sanitizeUrl(inputUrl);
  if (!clean) return [];

  const candidates = [];
  const fileId = extractDriveFileId(clean);
  const isPdf = /\.pdf(\?|$)/i.test(clean);

  if (fileId) {
    const drivePreview = `https://drive.google.com/file/d/${fileId}/preview`;
    const driveView = `https://drive.google.com/uc?export=view&id=${fileId}`;
    // Prefer Drive preview first. Using export=download as the primary source can render
    // Drive warning HTML (virus-scan/permission page) instead of the PDF document.
    candidates.push(drivePreview, driveView, buildViewerFallback(clean), clean);
  } else if (isPdf) {
    candidates.push(buildViewerFallback(clean), clean);
  } else {
    candidates.push(clean);
  }

  return [...new Set(candidates.filter(Boolean))];
}

function shouldFallbackFromHtmlMessage(message) {
  if (!message) return false;
  const text = String(message).toLowerCase();
  return (
    text.includes("can't scan this file for viruses") ||
    text.includes("cannot scan this file for viruses") ||
    text.includes("owner hasn't given you permission") ||
    text.includes("owner has not given you permission") ||
    text.includes("google drive - virus scan warning") ||
    text.includes("google drive - quota exceeded")
  );
}

const PDF_THEME = {
  canvasGradient: ["#0B0C10", "#111622", "#1A2338"],
  cardBackground: "rgba(20, 26, 38, 0.92)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#F5F7FF",
  textSecondary: "#B8C0D4",
  loadingScrim: "rgba(8, 11, 18, 0.72)",
  errorBorder: "rgba(255, 120, 120, 0.30)",
  errorBackground: "rgba(12, 8, 12, 0.84)",
  errorText: "#FFD3D3",
};

export default function ModernContentWebView({
  uri,
  route,
  routeParamKey = "url",
  fetchUrl,
  resultIndex = 0,
  resultPath,
  screenName = "content_reader",
  showAd = true,
}) {
  const [loading, setLoading] = useState(true);
  const [resolvedUri, setResolvedUri] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [hadError, setHadError] = useState(false);
  const didLoadCurrentRef = useRef(false);

  const routeUri = useMemo(
    () => route?.params?.[routeParamKey] || "",
    [route?.params, routeParamKey]
  );

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      if (uri) {
        setResolvedUri(sanitizeUrl(uri));
        setLoading(false);
        return;
      }

      if (routeUri) {
        setResolvedUri(sanitizeUrl(routeUri));
        setLoading(false);
        return;
      }

      if (fetchUrl) {
        setLoading(true);
        try {
          const response = await fetch(fetchUrl);
          const payload = await response.json();
          const result = payload?.results?.[Number(resultIndex) || 0] || {};
          const nextUri = resolveByPath(result, resultPath);
          if (mounted) {
            setResolvedUri(sanitizeUrl(nextUri || ""));
            setLoading(false);
          }
        } catch (_error) {
          if (mounted) {
            setResolvedUri("");
            setLoading(false);
          }
        }
        return;
      }

      setLoading(false);
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [fetchUrl, resultIndex, resultPath, routeUri, uri]);

  const candidateUris = useMemo(
    () => buildCandidateUrls(resolvedUri),
    [resolvedUri]
  );

  useEffect(() => {
    setActiveIndex(0);
    setHadError(false);
    didLoadCurrentRef.current = false;
    setLoading(Boolean(candidateUris.length));
  }, [candidateUris]);

  const activeUri = candidateUris[activeIndex] || "";

  const moveToNextCandidate = () => {
    setActiveIndex((prev) => {
      if (prev < candidateUris.length - 1) {
        didLoadCurrentRef.current = false;
        setLoading(true);
        return prev + 1;
      }
      setHadError(true);
      setLoading(false);
      return prev;
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={PDF_THEME.canvasGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />

      <Animated.View
        entering={FadeIn.duration(220)}
        className="flex-1 px-2 pb-1 pt-2"
      >
        <View style={styles.viewerCard} className="flex-1 overflow-hidden rounded-[22px]">
          {activeUri ? (
            <WebView
              key={activeUri}
              source={{ uri: activeUri }}
              javaScriptEnabled
              domStorageEnabled
              originWhitelist={["*"]}
              setSupportMultipleWindows={false}
              sharedCookiesEnabled
              thirdPartyCookiesEnabled
              mixedContentMode="always"
              cacheEnabled={false}
              onLoadStart={() => {
                if (!didLoadCurrentRef.current) {
                  setLoading(true);
                }
              }}
              onLoadProgress={({ nativeEvent }) => {
                if (nativeEvent?.progress > 0.35) {
                  setLoading(false);
                }
              }}
              onLoadEnd={() => {
                didLoadCurrentRef.current = true;
                setLoading(false);
              }}
              injectedJavaScript={`
                (function() {
                  try {
                    var title = (document && document.title) ? document.title : '';
                    var bodyText = (document && document.body && document.body.innerText) ? document.body.innerText : '';
                    var payload = title + '\\n' + bodyText;
                    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(payload);
                  } catch (e) {}
                  true;
                })();
              `}
              onMessage={({ nativeEvent }) => {
                if (shouldFallbackFromHtmlMessage(nativeEvent?.data)) {
                  moveToNextCandidate();
                }
              }}
              onHttpError={moveToNextCandidate}
              onError={moveToNextCandidate}
            />
          ) : (
            <View className="flex-1 items-center justify-center px-5">
              <Text
                className="text-center text-[16px] font-bold"
                style={styles.primaryText}
              >
                Content unavailable
              </Text>
              <Text
                className="mt-2 text-center text-[13px]"
                style={styles.secondaryText}
              >
                Please try again in a moment.
              </Text>
            </View>
          )}

          {loading ? (
            <View style={styles.loadingOverlay} className="absolute inset-0 items-center justify-center gap-3">
              <View className="w-[210px]">
                <ShimmerSkeleton height={14} borderRadius={8} />
                <ShimmerSkeleton
                  height={14}
                  borderRadius={8}
                  className="mt-2"
                />
              </View>
              <Text className="text-[15px] font-semibold" style={styles.secondaryText}>
                Loading content...
              </Text>
            </View>
          ) : null}

          {hadError ? (
            <View style={styles.errorNotice} className="absolute bottom-3 left-3 right-3 rounded-2xl px-4 py-3">
              <Text
                className="text-center text-[12px] font-semibold"
                style={styles.errorText}
              >
                Couldn&apos;t render this source. Tried fallback viewer
                automatically.
              </Text>
            </View>
          ) : null}
        </View>
      </Animated.View>

      {showAd ? <MrecAdComponent screenName={screenName} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  viewerCard: {
    backgroundColor: PDF_THEME.cardBackground,
    borderWidth: 1,
    borderColor: PDF_THEME.cardBorder,
  },
  primaryText: {
    color: PDF_THEME.textPrimary,
  },
  secondaryText: {
    color: PDF_THEME.textSecondary,
  },
  loadingOverlay: {
    backgroundColor: PDF_THEME.loadingScrim,
  },
  errorNotice: {
    borderWidth: 1,
    borderColor: PDF_THEME.errorBorder,
    backgroundColor: PDF_THEME.errorBackground,
  },
  errorText: {
    color: PDF_THEME.errorText,
  },
});

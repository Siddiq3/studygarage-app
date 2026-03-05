import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getRewardsConfig,
  getRewardsVoucherCategory,
  refreshRewardsConfigInBackground,
  rewardsConfigFallback,
  type RewardsConfig,
  type RewardsVoucherCategory,
  type RewardsVoucherItem,
} from "../config/rewardsConfig";

type UseVoucherCatalogResult = {
  items: RewardsVoucherItem[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: string;
  category: RewardsVoucherCategory | null;
  refresh: () => Promise<void>;
};

export function useVoucherCatalog(categoryId: string): UseVoucherCatalogResult {
  const [catalog, setCatalog] = useState<RewardsConfig>(rewardsConfigFallback);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCatalog = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const nextCatalog = await getRewardsConfig({
        forceRefresh: isManualRefresh,
      });
      setCatalog(nextCatalog);
      setError(null);

      if (!isManualRefresh) {
        refreshRewardsConfigInBackground().catch(() => {});
      }
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Unable to load vouchers right now.";
      setError(message);
    } finally {
      if (isManualRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadCatalog(false).catch(() => {});
  }, [loadCatalog]);

  const category = useMemo(() => {
    return (
      getRewardsVoucherCategory(catalog, categoryId) ||
      getRewardsVoucherCategory(rewardsConfigFallback, categoryId)
    );
  }, [catalog, categoryId]);

  const items = useMemo(() => {
    return (category?.items || []).map((item) => ({
      ...item,
      enabled: item.enabled !== false,
    }));
  }, [category]);

  return {
    items,
    loading,
    refreshing,
    error,
    lastUpdated: catalog.updatedAt || rewardsConfigFallback.updatedAt,
    category,
    refresh: () => loadCatalog(true),
  };
}

export default useVoucherCatalog;

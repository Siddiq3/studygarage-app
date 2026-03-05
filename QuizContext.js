////////////////////////////////////////////////////////////////////////////////////////////////

import React, { createContext, useState, useEffect, useContext } from 'react';
import { migrateRewardSchemaV1 } from './src/services/rewards/firstInstallRewardService';
import {
  addCoins as addCoinsToWallet,
  getBalance as getWalletBalance,
  spendCoins as spendCoinsFromWallet,
  subscribeWalletBalance,
} from './src/wallet/walletStore';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [totalScore, setTotalScore] = useState(0);
  const [coinStateReady, setCoinStateReady] = useState(false);
  const [updatingTotalScore, setUpdatingTotalScore] = useState(false);

  useEffect(() => {
    let mounted = true;
    initializeCoinState(() => mounted);
    const unsubscribe = subscribeWalletBalance((balance) => {
      if (!mounted) return;
      if (!Number.isFinite(balance)) return;
      setTotalScore(balance);
      setCoinStateReady(true);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const initializeCoinState = async (isMounted = () => true) => {
    try {
      // Hydrate quickly from the wallet snapshot so UI does not flash a fake default.
      const cachedBalance = await getWalletBalance();
      if (isMounted() && Number.isFinite(cachedBalance)) {
        setTotalScore(cachedBalance);
        setCoinStateReady(true);
      }

      await migrateRewardSchemaV1();
      const storedBalance = await getWalletBalance();
      if (isMounted()) {
        setTotalScore(storedBalance);
        setCoinStateReady(true);
      }
    } catch (error) {
      console.error('Error initializing total score:', error);
      if (isMounted()) {
        setCoinStateReady(true);
      }
    }
  };

  const setCoinBalanceSafe = async (amount) => {
    const safeAmount = Math.max(0, Number.isFinite(Number(amount)) ? Number(amount) : 0);
    const currentBalance = await getWalletBalance();
    if (safeAmount === currentBalance) {
      setTotalScore(safeAmount);
      return { ok: true, applied: false, balance: safeAmount };
    }

    if (safeAmount > currentBalance) {
      const result = await addCoinsToWallet({
        eventId: `manual_adjustment:set:${safeAmount}:${Date.now()}`,
        amount: safeAmount - currentBalance,
        source: 'manual_adjustment',
        meta: { mode: 'setCoinBalanceSafe', target: safeAmount },
      });
      setTotalScore(result.balance);
      return result;
    }

    const result = await spendCoinsFromWallet({
      eventId: `manual_adjustment:set:${safeAmount}:${Date.now()}`,
      amount: currentBalance - safeAmount,
      reason: 'manual_adjustment',
      meta: { mode: 'setCoinBalanceSafe', target: safeAmount },
    });
    setTotalScore(result.balance);
    return result;
  };

  const updateTotalScore = async (score, options = {}) => {
    try {
      setUpdatingTotalScore(true);
      const delta = Number(score);
      if (!Number.isFinite(delta) || delta === 0) {
        return { ok: true, applied: false, balance: totalScore };
      }

      const baseSource = options?.source || options?.reason || 'legacy';
      const eventId =
        options?.eventId ||
        `legacy:${baseSource}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
      const meta = options?.meta;

      const result =
        delta > 0
          ? await addCoinsToWallet({
              eventId,
              amount: delta,
              source: baseSource,
              meta,
            })
          : await spendCoinsFromWallet({
              eventId,
              amount: Math.abs(delta),
              reason: baseSource,
              meta,
            });

      setTotalScore(result.balance);
      return result;
    } catch (error) {
      console.error('Error updating total score:', error);
      return { ok: false, applied: false, balance: totalScore };
    } finally {
      setUpdatingTotalScore(false);
    }
  };

  const addCoins = async ({ eventId, amount, source = 'legacy', meta } = {}) => {
    const result = await addCoinsToWallet({
      eventId:
        eventId || `legacy:${source}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
      amount: Number(amount) || 0,
      source,
      meta,
    });
    setTotalScore(result.balance);
    return result;
  };

  const spendCoins = async ({ eventId, amount, reason = 'legacy', source, meta } = {}) => {
    const result = await spendCoinsFromWallet({
      eventId:
        eventId || `legacy:${reason}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
      amount: Number(amount) || 0,
      reason,
      source,
      meta,
    });
    setTotalScore(result.balance);
    return result;
  };

  const awardCoinsWithMirror = async (amount, reason = 'generic', eventId, meta) => {
    return updateTotalScore(amount, {
      eventId,
      source: reason,
      meta,
    });
  };

  return (
    <QuizContext.Provider
      value={{
        totalScore,
        coinBalance: totalScore,
        updateTotalScore,
        setCoinBalanceSafe,
        awardCoinsWithMirror,
        addCoins,
        spendCoins,
        coinStateReady,
        updatingTotalScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  return useContext(QuizContext);
};

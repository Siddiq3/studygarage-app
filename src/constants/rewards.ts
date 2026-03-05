export const COINS_PER_RUPEE = 25;
export const COINS_FOR_TEN_RUPEES = 250;

export const VOUCHER_COIN_REQUIREMENTS: Record<number, number> = {
  10: 1020,
  20: 2350,
  30: 3400,
  50: 5600,
  100: 10200,
};

export const getRequiredCoins = (rupees: number): number => {
  const safeRupees = Number.isFinite(Number(rupees)) ? Number(rupees) : 0;
  return VOUCHER_COIN_REQUIREMENTS[safeRupees] || 0;
};

export const VOUCHER_PROVIDER_RUPEE_TIERS = {
  google: [10, 20, 30, 50, 100],
  flipkart: [30, 50],
  amazon: [20, 50, 100],
} as const;

const COIN_TO_RUPEE_REQUIREMENTS = Object.entries(
  VOUCHER_COIN_REQUIREMENTS
).reduce<Record<number, number>>((acc, [rupees, coins]) => {
  acc[Number(coins)] = Number(rupees);
  return acc;
}, {});

export const getRupeesForRequiredCoins = (coins: number): number => {
  const safeCoins = Number.isFinite(Number(coins)) ? Number(coins) : 0;
  return COIN_TO_RUPEE_REQUIREMENTS[safeCoins] || 0;
};

export const coinsToRupees = (coins: number): number => {
  return getRupeesForRequiredCoins(coins);
};

export const formatApproxRupees = (coins: number): string => {
  const rupees = getRupeesForRequiredCoins(coins);
  return `₹${rupees || 0}`;
};

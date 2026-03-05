# Voucher Redeem Upgrade (Wallet)

## Where It Is Integrated

- Main Wallet screen integration is in `TotalScorePage.js`.
- Voucher catalog is rendered inside the Wallet under the "Redeem Options" card.
- Existing route names are unchanged (`TotalScorePage`, `WithdrawalHistoryPage`, `WithdrawalFormPage`).

## New Components / Hooks

- `src/components/wallet/VoucherCard.tsx`: single voucher UI card.
- `src/components/wallet/VoucherGrid.tsx`: 2-column catalog grid + skeleton + empty state.
- `src/components/wallet/VoucherDetailModal.tsx`: confirm redeem modal with cost/conversion details.
- `src/components/wallet/RedeemHistory.tsx`: voucher history list with code and copy action.
- `src/components/ui/CoinFlyOverlay.tsx`: coin particle fly animation overlay.
- `src/hooks/useRedeem.ts`: redeem flow orchestration, wallet history persistence, toast queue.
- `src/constants/rewards.ts`: single conversion constants.

## Coin to INR Ratio (Single Source)

- Update `COINS_PER_RUPEE` in `src/constants/rewards.ts`.
- Current value: `COINS_PER_RUPEE = 25` (so `250 coins = ₹10`).

## Assets

- No new mandatory image assets were added.
- Voucher provider icons currently use `Ionicons` glyphs (Google Play / cart / bag / QR).
- If desired, replace icon rendering in `VoucherCard.tsx` with brand image assets.

## Backend Integration Note

- No backend API signatures were changed.
- Current voucher redemption uses a local mock in `useRedeem.ts`:
  - `mockRedeemRequest()` includes a `TODO(redeem-api)` marker.
- Backend engineers should replace only that function body with the real API call while keeping screen/component contracts intact.

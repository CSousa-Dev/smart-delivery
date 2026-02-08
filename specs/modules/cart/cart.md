## Cart Module Overview

### Scope and Principles
- Cart is a lightweight flow orchestrator, no pricing details stored.
- All pricing visibility is delegated to Payments via `quoteId`.
- Commands return only ids and status, not pricing breakdowns.

### Status Flow
- `OPEN` → `CHECKOUT` → `WAITING_PAYMENT` → `PAYMENT_CONFIRMED` → `ORDERED`
- `OPEN`/`CHECKOUT`/`WAITING_PAYMENT`/`PAYMENT_MISMATCH` → `ABANDONED` (inactive)
- `WAITING_PAYMENT` → `PAYMENT_MISMATCH` (payment failed/expired)
- `PAYMENT_MISMATCH` → `OPEN` (retry, new quote)
- `ABANDONED` → `OPEN` (reopen)

### Invariants
- Only one cart in progress per customer (`OPEN`, `CHECKOUT`, `WAITING_PAYMENT`, `PAYMENT_CONFIRMED`, `PAYMENT_MISMATCH`).
- `CHECKOUT` requires `paymentPreferenceId`, `deliveryPlan`, and at least one item.
- `WAITING_PAYMENT` requires `quoteId` and online payment method.
- `ORDERED` requires delivery plan, payment method, and valid item quantities.

### Core Use Cases (Application Services)
- Open cart: validates customer + vertical + uniqueness.
- Add/Update/Remove item: validates product + operations.
- Set address: validates address, creates fulfillment plan, sets delivery plan.
- Set payment preference: validates preference for customer, stores id + method.
- Checkout: creates quote, stores `quoteId`, offline creates order immediately.
- Process payment: uses `quoteId` to load cart, validates receipt, confirms payment, creates order.
- Fail payment: receives `quoteId` + `paymentId` + reason, moves cart to `PAYMENT_MISMATCH`.
- Retry payment: clears quote, returns cart to `OPEN` for new quote.
- Reopen: deletes quote, resets cart to `OPEN`.

### API Surface (HTTP)
- `POST /carts/open`
- `GET /carts/:cartId`
- `POST /carts/:cartId/items`
- `PATCH /carts/:cartId/items/:itemId`
- `PATCH /carts/:cartId/address`
- `PATCH /carts/:cartId/payment-preference`
- `POST /carts/:cartId/checkout`
- `POST /carts/:cartId/payments/start`
- `POST /carts/payments/confirm` (body: `quoteId`, `paymentId`)
- `POST /carts/:cartId/reopen`

### External Dependencies (Ports)
- CustomerService, OrganizationService
- ProductService, OperationsService
- AddressValidationService
- FulfillmentService
- PaymentService
- OrderService

### Persistence
- Stores `quoteId`, `paymentPreferenceId`, delivery plan ids, items, coupons.
- Does not store totals or pricing breakdowns.

## Test Coverage Review

### Existing Tests (Current)
- Unit: Open cart service validation paths.
- Unit: Cart controller error mapping for open cart.
- Integration: Open cart capability.
- E2E: Open cart route.

### Gaps (Not Yet Covered)
- Address setting + fulfillment plan creation.
- Payment preference validation and method handling.
- Checkout flow, quote creation, offline vs online branches.
- Waiting payment and payment confirmation to order.
- Reopen flow and quote deletion.
- Item add/update/remove flows with validation.
- Status transition rules and invalid transitions.

## Recommended Next Steps

### Tests to Add
- Unit tests for each new service: address, payment preference, checkout, process payment, reopen.
- Integration tests for checkout + payment confirmation (mocked ports).
- E2E tests for checkout, payment confirm, and reopen.

### Backend Enhancements
- Add coupon commands (add/remove) at application/presentation layers.
- Add idempotency keys for checkout and payment confirm.
- Add optimistic concurrency (status version) to prevent double checkout.
- Add event outbox or audit trail for external notifications.

### Future Features
- Cart item reservation/stock hold integration.
- Automatic abandonment scheduler and cleanup.
- Payment retry policies and recovery for `PAYMENT_MISMATCH`.
- Cart merge and restore capabilities.

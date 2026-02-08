-- Uniqueness constraint: at most one cart "in progress" per customer.
-- "In progress" = status in (OPEN, CHECKOUT, WAITING_PAYMENT, PAYMENT_CONFIRMED, PAYMENT_MISMATCH).
-- Final statuses (e.g. ABANDONED) are excluded; keep in sync with domain CART_STATUSES_IN_PROGRESS.
-- MySQL does not support partial unique indexes, so we use a STORED generated column that
-- holds customer_id when status is in progress and NULL otherwise; UNIQUE allows multiple NULLs.

ALTER TABLE `carts`
  ADD COLUMN `active_customer_key` VARCHAR(36) GENERATED ALWAYS AS (
    CASE
      WHEN `status` IN ('OPEN', 'CHECKOUT', 'WAITING_PAYMENT', 'PAYMENT_CONFIRMED', 'PAYMENT_MISMATCH')
      THEN `customer_id`
      ELSE NULL
    END
  ) STORED,
  ADD UNIQUE KEY `unique_active_cart_per_customer` (`active_customer_key`);

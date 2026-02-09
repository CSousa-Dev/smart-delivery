ALTER TABLE `carts`
  DROP COLUMN `status_history`,
  ADD COLUMN `payment_preference_id` VARCHAR(64) NULL,
  ADD COLUMN `quote_id` VARCHAR(64) NULL,
  ADD COLUMN `delivery_plan_id` VARCHAR(64) NULL,
  ADD COLUMN `delivery_address_id` VARCHAR(36) NULL,
  ADD COLUMN `delivery_price` DOUBLE NULL,
  ADD COLUMN `items` JSON NULL,
  ADD COLUMN `coupons` JSON NULL;

CREATE TABLE `cart_status_history` (
  `id` VARCHAR(36) NOT NULL,
  `cart_id` VARCHAR(36) NOT NULL,
  `status` VARCHAR(32) NOT NULL,
  `changed_at` TIMESTAMP(0) NOT NULL,
  `duration_ms` INT NULL,
  `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`),
  INDEX `cart_status_history_cart_id_changed_at_idx` (`cart_id`, `changed_at`),
  CONSTRAINT `cart_status_history_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

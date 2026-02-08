CREATE TABLE `carts` (
  `id` VARCHAR(36) NOT NULL,
  `customer_id` VARCHAR(36) NOT NULL,
  `vertical_id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `status` VARCHAR(32) NOT NULL,
  `opened_at` TIMESTAMP(0) NOT NULL,
  `last_movement_at` TIMESTAMP(0) NOT NULL,
  `closed_at` TIMESTAMP(0) NULL,
  `payment_method` VARCHAR(32) NULL,
  `payment_id` VARCHAR(36) NULL,
  `payment_observation` VARCHAR(512) NULL,
  `status_history` JSON NULL,
  `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updated_at` TIMESTAMP(0) NULL ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`),
  INDEX `carts_customer_id_idx` (`customer_id`),
  INDEX `carts_status_idx` (`status`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

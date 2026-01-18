CREATE TABLE `stock_lots` (
  `id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `item_id` VARCHAR(36) NOT NULL,
  `lot_number` VARCHAR(80) NOT NULL,
  `expires_at` DATE NULL,
  `quantity_available` DECIMAL(18,4) NOT NULL,
  `first_entry_at` TIMESTAMP NOT NULL,
  UNIQUE INDEX `stock_lots_bu_lot_key` (`business_unit_id`, `lot_number`),
  INDEX `stock_lots_bu_idx` (`business_unit_id`),
  INDEX `stock_lots_item_idx` (`item_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `stock_movements` (
  `id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `item_id` VARCHAR(36) NOT NULL,
  `lot_number` VARCHAR(80) NOT NULL,
  `type` VARCHAR(10) NOT NULL,
  `quantity` DECIMAL(18,4) NOT NULL,
  `movement_source` VARCHAR(30) NOT NULL,
  `external_id` VARCHAR(60) NULL,
  `occurred_at` TIMESTAMP NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `stock_movements_bu_idx` (`business_unit_id`),
  INDEX `stock_movements_item_idx` (`item_id`),
  INDEX `stock_movements_lot_idx` (`lot_number`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

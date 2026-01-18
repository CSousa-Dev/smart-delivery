CREATE TABLE `product_item_links` (
  `id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `product_id` VARCHAR(36) NOT NULL,
  `item_id` VARCHAR(36) NOT NULL,
  `status` VARCHAR(10) NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` VARCHAR(36) NULL,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `product_item_links_bu_product_key` (`business_unit_id`, `product_id`),
  UNIQUE INDEX `product_item_links_bu_item_key` (`business_unit_id`, `item_id`),
  INDEX `product_item_links_bu_idx` (`business_unit_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

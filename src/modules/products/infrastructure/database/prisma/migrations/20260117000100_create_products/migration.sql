CREATE TABLE `products` (
  `id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(40) NOT NULL,
  `code_normalized` VARCHAR(40) NOT NULL,
  `title` VARCHAR(120) NOT NULL,
  `title_normalized` VARCHAR(120) NOT NULL,
  `short_description` VARCHAR(160) NOT NULL,
  `description` VARCHAR(2000) NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `products_org_code_normalized_key` (`organization_id`, `code_normalized`),
  UNIQUE INDEX `products_bu_title_normalized_key` (`business_unit_id`, `title_normalized`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `product_images` (
  `product_id` VARCHAR(36) NOT NULL,
  `url` VARCHAR(2048) NOT NULL,
  `display_order` INT NOT NULL,
  `alt_text` VARCHAR(255) NULL,
  `is_primary` BOOLEAN NOT NULL,
  INDEX `product_images_product_id_idx` (`product_id`),
  PRIMARY KEY (`product_id`, `display_order`),
  CONSTRAINT `product_images_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `product_attribute_values` (
  `product_id` VARCHAR(36) NOT NULL,
  `attribute_id` VARCHAR(36) NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  INDEX `product_attribute_values_product_id_idx` (`product_id`),
  INDEX `product_attribute_values_attribute_id_idx` (`attribute_id`),
  PRIMARY KEY (`product_id`, `attribute_id`, `value`),
  CONSTRAINT `product_attribute_values_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

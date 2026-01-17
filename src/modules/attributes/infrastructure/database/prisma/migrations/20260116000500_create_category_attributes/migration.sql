CREATE TABLE `category_attributes` (
  `id` VARCHAR(36) NOT NULL,
  `category_id` VARCHAR(36) NOT NULL,
  `attribute_id` VARCHAR(36) NOT NULL,
  `is_required` BOOLEAN NULL,
  `is_multi_value` BOOLEAN NULL,
  `min_value` DECIMAL(18,4) NULL,
  `max_value` DECIMAL(18,4) NULL,
  `default_value_scope` VARCHAR(20) NULL,
  `default_value_id` VARCHAR(36) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `category_attributes_category_id_attribute_id_key` (`category_id`, `attribute_id`),
  INDEX `category_attributes_category_id_idx` (`category_id`),
  INDEX `category_attributes_attribute_id_idx` (`attribute_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `category_attributes_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `category_allowed_values` (
  `id` VARCHAR(36) NOT NULL,
  `category_attribute_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `value` VARCHAR(120) NOT NULL,
  `name_normalized` VARCHAR(120) NOT NULL,
  `value_normalized` VARCHAR(120) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `cav_attr_name_key` (`category_attribute_id`, `name_normalized`),
  UNIQUE INDEX `cav_attr_value_key` (`category_attribute_id`, `value_normalized`),
  INDEX `cav_attr_idx` (`category_attribute_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `category_allowed_values_category_attribute_id_fkey` FOREIGN KEY (`category_attribute_id`) REFERENCES `category_attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `category_allowed_value_links` (
  `category_attribute_id` VARCHAR(36) NOT NULL,
  `source_scope` VARCHAR(20) NOT NULL,
  `source_value_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_attribute_id`, `source_scope`, `source_value_id`),
  INDEX `category_allowed_value_links_source_value_id_idx` (`source_value_id`),
  CONSTRAINT `category_allowed_value_links_category_attribute_id_fkey` FOREIGN KEY (`category_attribute_id`) REFERENCES `category_attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

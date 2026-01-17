CREATE TABLE `vertical_attributes` (
  `id` VARCHAR(36) NOT NULL,
  `vertical_id` VARCHAR(36) NOT NULL,
  `attribute_id` VARCHAR(36) NOT NULL,
  `is_required` BOOLEAN NULL,
  `is_multi_value` BOOLEAN NULL,
  `min_value` DECIMAL(18,4) NULL,
  `max_value` DECIMAL(18,4) NULL,
  `default_value_scope` VARCHAR(20) NULL,
  `default_value_id` VARCHAR(36) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `vertical_attributes_vertical_id_attribute_id_key` (`vertical_id`, `attribute_id`),
  INDEX `vertical_attributes_vertical_id_idx` (`vertical_id`),
  INDEX `vertical_attributes_attribute_id_idx` (`attribute_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `vertical_attributes_vertical_id_fkey` FOREIGN KEY (`vertical_id`) REFERENCES `verticals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `vertical_attributes_attribute_id_fkey` FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `vertical_allowed_values` (
  `id` VARCHAR(36) NOT NULL,
  `vertical_attribute_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `value` VARCHAR(120) NOT NULL,
  `name_normalized` VARCHAR(120) NOT NULL,
  `value_normalized` VARCHAR(120) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `vav_attr_name_key` (`vertical_attribute_id`, `name_normalized`),
  UNIQUE INDEX `vav_attr_value_key` (`vertical_attribute_id`, `value_normalized`),
  INDEX `vav_attr_idx` (`vertical_attribute_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `vertical_allowed_values_vertical_attribute_id_fkey` FOREIGN KEY (`vertical_attribute_id`) REFERENCES `vertical_attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `vertical_allowed_value_links` (
  `vertical_attribute_id` VARCHAR(36) NOT NULL,
  `attribute_allowed_value_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vertical_attribute_id`, `attribute_allowed_value_id`),
  INDEX `vertical_allowed_value_links_attribute_allowed_value_id_idx` (`attribute_allowed_value_id`),
  CONSTRAINT `vertical_allowed_value_links_vertical_attribute_id_fkey` FOREIGN KEY (`vertical_attribute_id`) REFERENCES `vertical_attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `vertical_allowed_value_links_attribute_allowed_value_id_fkey` FOREIGN KEY (`attribute_allowed_value_id`) REFERENCES `attribute_allowed_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

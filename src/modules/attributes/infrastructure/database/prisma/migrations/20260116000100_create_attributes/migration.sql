CREATE TABLE `attributes` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `code` VARCHAR(60) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `is_multi_value` BOOLEAN NOT NULL,
  `is_required` BOOLEAN NOT NULL,
  `min_value` DECIMAL(18,4) NOT NULL,
  `max_value` DECIMAL(18,4) NOT NULL,
  `default_value_id` VARCHAR(36) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `attributes_name_key` (`name`),
  UNIQUE INDEX `attributes_code_key` (`code`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `attribute_allowed_values` (
  `id` VARCHAR(36) NOT NULL,
  `attribute_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `value` VARCHAR(120) NOT NULL,
  `name_normalized` VARCHAR(120) NOT NULL,
  `value_normalized` VARCHAR(120) NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `attribute_allowed_values_attribute_id_name_normalized_key` (`attribute_id`, `name_normalized`),
  UNIQUE INDEX `attribute_allowed_values_attribute_id_value_normalized_key` (`attribute_id`, `value_normalized`),
  INDEX `attribute_allowed_values_attribute_id_idx` (`attribute_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `attribute_allowed_values_attribute_id_fkey` FOREIGN KEY (`attribute_id`) REFERENCES `attributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


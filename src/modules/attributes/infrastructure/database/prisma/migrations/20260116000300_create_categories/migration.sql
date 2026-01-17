CREATE TABLE `categories` (
  `id` VARCHAR(36) NOT NULL,
  `vertical_id` VARCHAR(36) NOT NULL,
  `parent_category_id` VARCHAR(36) NULL,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(60) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `depth` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `categories_vertical_id_name_key` (`vertical_id`, `name`),
  UNIQUE INDEX `categories_vertical_id_code_key` (`vertical_id`, `code`),
  INDEX `categories_vertical_id_idx` (`vertical_id`),
  INDEX `categories_parent_category_id_idx` (`parent_category_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `categories_vertical_id_fkey` FOREIGN KEY (`vertical_id`) REFERENCES `verticals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `categories_parent_category_id_fkey` FOREIGN KEY (`parent_category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

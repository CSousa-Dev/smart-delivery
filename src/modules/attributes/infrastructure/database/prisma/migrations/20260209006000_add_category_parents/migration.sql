-- CreateTable
CREATE TABLE `category_parents` (
  `parent_id` VARCHAR(36) NOT NULL,
  `child_id` VARCHAR(36) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`parent_id`, `child_id`),
  INDEX `category_parents_child_id_idx` (`child_id`),
  INDEX `category_parents_parent_id_idx` (`parent_id`),
  CONSTRAINT `category_parents_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_parents_child_id_fkey` FOREIGN KEY (`child_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Backfill relations
INSERT INTO `category_parents` (`parent_id`, `child_id`, `created_at`)
SELECT `parent_category_id`, `id`, `created_at`
FROM `categories`
WHERE `parent_category_id` IS NOT NULL;

-- Drop foreign key and column
ALTER TABLE `categories` DROP FOREIGN KEY `categories_parent_category_id_fkey`;
ALTER TABLE `categories` DROP INDEX `categories_parent_category_id_idx`;
ALTER TABLE `categories` DROP COLUMN `parent_category_id`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `parent_category_id` VARCHAR(36) NULL;

-- Backfill parent_category_id from category_parents (choose smallest parent)
UPDATE `categories` c
JOIN (
  SELECT `child_id`, MIN(`parent_id`) AS `parent_id`
  FROM `category_parents`
  GROUP BY `child_id`
) cp ON cp.`child_id` = c.`id`
SET c.`parent_category_id` = cp.`parent_id`;

-- Drop table category_parents
DROP TABLE `category_parents`;

-- Drop old unique indexes
DROP INDEX `categories_vertical_id_name_key` ON `categories`;
DROP INDEX `categories_vertical_id_code_key` ON `categories`;

-- Add new indexes
CREATE UNIQUE INDEX `categories_vertical_parent_name_key` ON `categories`(`vertical_id`, `parent_category_id`, `name`);
CREATE UNIQUE INDEX `categories_vertical_parent_code_key` ON `categories`(`vertical_id`, `parent_category_id`, `code`);
CREATE INDEX `categories_parent_category_id_idx` ON `categories`(`parent_category_id`);

-- Add foreign key
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_category_id_fkey`
  FOREIGN KEY (`parent_category_id`) REFERENCES `categories`(`id`)
  ON DELETE SET NULL ON UPDATE CASCADE;

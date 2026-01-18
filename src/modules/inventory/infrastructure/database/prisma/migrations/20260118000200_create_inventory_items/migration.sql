CREATE TABLE `inventory_items` (
  `id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `business_unit_id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `name_normalized` VARCHAR(120) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `unit_of_measure_id` VARCHAR(36) NOT NULL,
  `requires_expiration` BOOLEAN NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `inventory_items_bu_name_key` (`business_unit_id`, `name_normalized`),
  INDEX `inventory_items_org_idx` (`organization_id`),
  INDEX `inventory_items_bu_idx` (`business_unit_id`),
  INDEX `inventory_items_uom_idx` (`unit_of_measure_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `inventory_items_unit_of_measure_id_fkey` FOREIGN KEY (`unit_of_measure_id`) REFERENCES `unit_of_measures`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

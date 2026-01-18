ALTER TABLE `organization_verticals`
  ADD COLUMN `status_id` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  ADD COLUMN `updated_at` TIMESTAMP NULL;

CREATE TABLE `business_unit_verticals` (
  `business_unit_id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `vertical_id` VARCHAR(36) NOT NULL,
  `status_id` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  INDEX `business_unit_verticals_organization_id_idx` (`organization_id`),
  INDEX `business_unit_verticals_vertical_id_idx` (`vertical_id`),
  PRIMARY KEY (`business_unit_id`, `vertical_id`),
  CONSTRAINT `business_unit_verticals_business_unit_id_fkey` FOREIGN KEY (`business_unit_id`) REFERENCES `business_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `business_unit_verticals_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `business_unit_verticals_vertical_id_fkey` FOREIGN KEY (`vertical_id`) REFERENCES `verticals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `business_units` (
  `id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `public_name` VARCHAR(120) NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `phone_has_whatsapp` BOOLEAN NOT NULL,
  `email` VARCHAR(120) NULL,
  `instagram` VARCHAR(120) NULL,
  `website` VARCHAR(255) NULL,
  `status_id` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  INDEX `business_units_organization_id_idx` (`organization_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `business_units_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `business_unit_addresses` (
  `business_unit_id` VARCHAR(36) NOT NULL,
  `street` VARCHAR(120) NOT NULL,
  `number` VARCHAR(20) NOT NULL,
  `complement` VARCHAR(120) NULL,
  `neighborhood` VARCHAR(120) NOT NULL,
  `city` VARCHAR(120) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `postal_code` VARCHAR(8) NOT NULL,
  `country` VARCHAR(2) NOT NULL,
  `reference_point` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`business_unit_id`),
  CONSTRAINT `business_unit_addresses_business_unit_id_fkey` FOREIGN KEY (`business_unit_id`) REFERENCES `business_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

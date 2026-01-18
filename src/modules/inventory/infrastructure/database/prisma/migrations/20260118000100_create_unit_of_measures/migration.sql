CREATE TABLE `unit_of_measures` (
  `id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  `code_normalized` VARCHAR(10) NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `name_normalized` VARCHAR(60) NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `allows_fraction` BOOLEAN NOT NULL,
  `status` VARCHAR(10) NOT NULL,
  `created_by` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `unit_of_measures_org_code_key` (`organization_id`, `code_normalized`),
  UNIQUE INDEX `unit_of_measures_org_name_key` (`organization_id`, `name_normalized`),
  INDEX `unit_of_measures_org_idx` (`organization_id`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

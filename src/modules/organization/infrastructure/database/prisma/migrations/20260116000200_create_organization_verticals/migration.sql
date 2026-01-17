ALTER TABLE `organizations`
  ADD COLUMN `trade_name` VARCHAR(80) NOT NULL,
  ADD COLUMN `legal_name` VARCHAR(120) NULL,
  ADD COLUMN `document_type` VARCHAR(4) NOT NULL,
  ADD COLUMN `status_id` VARCHAR(30) NOT NULL,
  ADD COLUMN `owner_user_id` VARCHAR(36) NOT NULL,
  ADD COLUMN `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN `updated_at` TIMESTAMP NULL;

CREATE TABLE `verticals` (
  `id` VARCHAR(36) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(60) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `verticals_name_key` (`name`),
  UNIQUE INDEX `verticals_code_key` (`code`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `organization_verticals` (
  `organization_id` VARCHAR(36) NOT NULL,
  `vertical_id` VARCHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `organization_verticals_vertical_id_idx` (`vertical_id`),
  PRIMARY KEY (`organization_id`, `vertical_id`),
  CONSTRAINT `organization_verticals_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `organization_verticals_vertical_id_fkey` FOREIGN KEY (`vertical_id`) REFERENCES `verticals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

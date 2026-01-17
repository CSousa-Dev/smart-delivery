CREATE TABLE `organizations` (
  `id` VARCHAR(36) NOT NULL,
  `document_number` VARCHAR(14) NOT NULL,
  UNIQUE INDEX `organizations_document_number_key` (`document_number`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(60) NOT NULL,
  `last_name` VARCHAR(60) NOT NULL,
  `document_type` VARCHAR(4) NOT NULL,
  `document_number` VARCHAR(14) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `phone_number` VARCHAR(15) NOT NULL,
  `email_opt_in` BOOLEAN NOT NULL,
  `phone_opt_in` BOOLEAN NOT NULL,
  `status_id` VARCHAR(20) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL,
  UNIQUE INDEX `users_document_number_key` (`document_number`),
  UNIQUE INDEX `users_email_key` (`email`),
  UNIQUE INDEX `users_phone_number_key` (`phone_number`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `user_organization_links` (
  `user_id` VARCHAR(36) NOT NULL,
  `organization_id` VARCHAR(36) NOT NULL,
  `is_owner` BOOLEAN NOT NULL DEFAULT false,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `user_organization_links_organization_id_idx` (`organization_id`),
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_organization_links_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `user_organization_links_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

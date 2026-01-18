ALTER TABLE `unit_of_measures`
  ADD COLUMN `updated_by` VARCHAR(36) NULL AFTER `created_by`;

-- Replace verticalId with verticalCode in organization_verticals and business_unit_verticals, then drop verticals table.
-- Step 1: Add vertical_code to organization_verticals and backfill from verticals
ALTER TABLE `organization_verticals` ADD COLUMN `vertical_code` VARCHAR(60) NULL;
UPDATE `organization_verticals` ov INNER JOIN `verticals` v ON ov.vertical_id = v.id SET ov.vertical_code = v.code;
ALTER TABLE `organization_verticals` MODIFY COLUMN `vertical_code` VARCHAR(60) NOT NULL;

-- Step 2: Drop FKs and composite PK, then drop vertical_id and add new PK on vertical_code.
-- MySQL requires dropping the FK that uses a PK column before dropping the PK.
ALTER TABLE `organization_verticals` DROP FOREIGN KEY `organization_verticals_vertical_id_fkey`;
ALTER TABLE `organization_verticals` DROP FOREIGN KEY `organization_verticals_organization_id_fkey`;
ALTER TABLE `organization_verticals` DROP PRIMARY KEY;
ALTER TABLE `organization_verticals` ADD PRIMARY KEY (`organization_id`, `vertical_code`);
ALTER TABLE `organization_verticals` DROP COLUMN `vertical_id`;
ALTER TABLE `organization_verticals` ADD CONSTRAINT `organization_verticals_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 3: Add vertical_code to business_unit_verticals and backfill
ALTER TABLE `business_unit_verticals` ADD COLUMN `vertical_code` VARCHAR(60) NULL;
UPDATE `business_unit_verticals` bv INNER JOIN `verticals` v ON bv.vertical_id = v.id SET bv.vertical_code = v.code;
ALTER TABLE `business_unit_verticals` MODIFY COLUMN `vertical_code` VARCHAR(60) NOT NULL;

-- Step 4: Drop FKs and composite PK on business_unit_verticals (drop FKs that use PK columns first).
ALTER TABLE `business_unit_verticals` DROP FOREIGN KEY `business_unit_verticals_vertical_id_fkey`;
ALTER TABLE `business_unit_verticals` DROP FOREIGN KEY `business_unit_verticals_business_unit_id_fkey`;
ALTER TABLE `business_unit_verticals` DROP FOREIGN KEY `business_unit_verticals_organization_id_fkey`;
ALTER TABLE `business_unit_verticals` DROP PRIMARY KEY;
ALTER TABLE `business_unit_verticals` ADD PRIMARY KEY (`business_unit_id`, `vertical_code`);
ALTER TABLE `business_unit_verticals` DROP COLUMN `vertical_id`;
ALTER TABLE `business_unit_verticals` ADD CONSTRAINT `business_unit_verticals_business_unit_id_fkey` FOREIGN KEY (`business_unit_id`) REFERENCES `business_units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `business_unit_verticals` ADD CONSTRAINT `business_unit_verticals_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organizations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Step 5: Drop index on vertical_id if exists (organization_verticals had @@index([verticalId]))
-- Step 6: Drop verticals table
DROP TABLE `verticals`;

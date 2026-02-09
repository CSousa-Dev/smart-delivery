/*
  Warnings:

  - You are about to drop the `product_item_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `inventory_items` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `stock_lots` MODIFY `expires_at` DATETIME(3) NULL,
    MODIFY `first_entry_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `stock_movements` MODIFY `occurred_at` DATETIME(3) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `unit_of_measures` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `product_item_links`;

-- RenameIndex
ALTER TABLE `inventory_items` RENAME INDEX `inventory_items_bu_idx` TO `inventory_items_business_unit_id_idx`;

-- RenameIndex
ALTER TABLE `inventory_items` RENAME INDEX `inventory_items_bu_name_key` TO `inventory_items_business_unit_id_name_normalized_key`;

-- RenameIndex
ALTER TABLE `inventory_items` RENAME INDEX `inventory_items_org_idx` TO `inventory_items_organization_id_idx`;

-- RenameIndex
ALTER TABLE `inventory_items` RENAME INDEX `inventory_items_uom_idx` TO `inventory_items_unit_of_measure_id_idx`;

-- RenameIndex
ALTER TABLE `stock_lots` RENAME INDEX `stock_lots_bu_idx` TO `stock_lots_business_unit_id_idx`;

-- RenameIndex
ALTER TABLE `stock_lots` RENAME INDEX `stock_lots_bu_lot_key` TO `stock_lots_business_unit_id_lot_number_key`;

-- RenameIndex
ALTER TABLE `stock_lots` RENAME INDEX `stock_lots_item_idx` TO `stock_lots_item_id_idx`;

-- RenameIndex
ALTER TABLE `stock_movements` RENAME INDEX `stock_movements_bu_idx` TO `stock_movements_business_unit_id_idx`;

-- RenameIndex
ALTER TABLE `stock_movements` RENAME INDEX `stock_movements_item_idx` TO `stock_movements_item_id_idx`;

-- RenameIndex
ALTER TABLE `stock_movements` RENAME INDEX `stock_movements_lot_idx` TO `stock_movements_lot_number_idx`;

-- RenameIndex
ALTER TABLE `unit_of_measures` RENAME INDEX `unit_of_measures_org_code_key` TO `unit_of_measures_organization_id_code_normalized_key`;

-- RenameIndex
ALTER TABLE `unit_of_measures` RENAME INDEX `unit_of_measures_org_idx` TO `unit_of_measures_organization_id_idx`;

-- RenameIndex
ALTER TABLE `unit_of_measures` RENAME INDEX `unit_of_measures_org_name_key` TO `unit_of_measures_organization_id_name_normalized_key`;

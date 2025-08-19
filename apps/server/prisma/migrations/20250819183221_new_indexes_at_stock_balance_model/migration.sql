/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `stock_balances` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `stock_balances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stock_balances_storeId_key" ON "public"."stock_balances"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_balances_productId_key" ON "public"."stock_balances"("productId");

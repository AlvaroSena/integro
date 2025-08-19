/*
  Warnings:

  - A unique constraint covering the columns `[storeId,productId]` on the table `stock_balances` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stock_balances_storeId_productId_key" ON "public"."stock_balances"("storeId", "productId");

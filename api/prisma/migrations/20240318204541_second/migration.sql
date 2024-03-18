-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "model_year" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_products" ("availability", "brand", "color", "id", "model_year", "name", "price", "quantity") SELECT "availability", "brand", "color", "id", "model_year", "name", "price", "quantity" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

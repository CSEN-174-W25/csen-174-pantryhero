-- CreateTable
CREATE TABLE "ingredients" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT DEFAULT '',
    "barcode" DECIMAL,
    "quantity" DECIMAL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" SMALLINT,
    "name" TEXT,
    "url" TEXT,
    "ingredients" TEXT,
    "instructions" TEXT,
    "description" TEXT,
    "image" TEXT,
    "cookTime" TEXT,
    "totalTime" TEXT,
    "yield" TEXT,
    "diet" TEXT,
    "cuisine" TEXT,
    "category" TEXT,
    "occasion" TEXT,
    "utensils" TEXT,
    "keywords" TEXT,
    "nutritionCalories" TEXT,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

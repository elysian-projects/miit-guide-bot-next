-- CreateTable
CREATE TABLE "Tab" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "tabId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "links" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tab_label_key" ON "Tab"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Tab_value_key" ON "Tab"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Article_label_key" ON "Article"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Article_value_key" ON "Article"("value");

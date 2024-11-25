/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `comment_author` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investment` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market_link` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "imageUrl",
DROP COLUMN "summary",
ADD COLUMN     "comment_author" VARCHAR(255) NOT NULL,
ADD COLUMN     "investment" VARCHAR(255) NOT NULL,
ADD COLUMN     "launchInfoId" TEXT,
ADD COLUMN     "linkId" TEXT,
ADD COLUMN     "market_link" VARCHAR(255) NOT NULL,
ADD COLUMN     "network" VARCHAR(255) NOT NULL,
ADD COLUMN     "projectFeaturesId" TEXT,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "token" VARCHAR(255) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "ProjectFeatures" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "isFeature" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "ProjectFeatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaunchInfo" (
    "id" TEXT NOT NULL,
    "launchDate" VARCHAR(255) NOT NULL,
    "marketCap" DOUBLE PRECISION NOT NULL,
    "currentSupply" VARCHAR(255) NOT NULL,
    "totalSupply" INTEGER NOT NULL,
    "privateSale" DOUBLE PRECISION NOT NULL,
    "privateSaleQty" INTEGER NOT NULL,
    "publicSale" DOUBLE PRECISION NOT NULL,
    "publicSaleQty" INTEGER NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LaunchInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partnership" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "link_url" VARCHAR(255) NOT NULL,
    "postId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partnership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFeatures" ADD CONSTRAINT "ProjectFeatures_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaunchInfo" ADD CONSTRAINT "LaunchInfo_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

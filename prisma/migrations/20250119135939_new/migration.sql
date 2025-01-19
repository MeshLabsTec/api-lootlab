/*
  Warnings:

  - You are about to drop the column `comment_author` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `launchInfoId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `linkId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `market_link` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `projectFeaturesId` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `authorId` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaunchInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partnership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectFeatures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostGenres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_postId_fkey";

-- DropForeignKey
ALTER TABLE "LaunchInfo" DROP CONSTRAINT "LaunchInfo_postId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_postId_fkey";

-- DropForeignKey
ALTER TABLE "Partnership" DROP CONSTRAINT "Partnership_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectFeatures" DROP CONSTRAINT "ProjectFeatures_postId_fkey";

-- DropForeignKey
ALTER TABLE "_PostGenres" DROP CONSTRAINT "_PostGenres_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostGenres" DROP CONSTRAINT "_PostGenres_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "comment_author",
DROP COLUMN "launchInfoId",
DROP COLUMN "linkId",
DROP COLUMN "market_link",
DROP COLUMN "projectFeaturesId",
ADD COLUMN     "commentAuthor" TEXT,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "launchInfo" JSONB,
ADD COLUMN     "links" JSONB,
ADD COLUMN     "marketLink" VARCHAR(255),
ADD COLUMN     "partnerships" JSONB,
ADD COLUMN     "projectFeatures" JSONB,
ALTER COLUMN "authorId" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "LaunchInfo";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "Partnership";

-- DropTable
DROP TABLE "ProjectFeatures";

-- DropTable
DROP TABLE "_PostGenres";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

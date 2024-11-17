/*
  Warnings:

  - You are about to drop the column `status` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `gameId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_gameId_fkey";

-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PostCategory" DROP CONSTRAINT "PostCategory_postId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "status",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "gameId",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "PostCategory";

-- DropEnum
DROP TYPE "CommentStatus";

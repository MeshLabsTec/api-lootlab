-- CreateEnum
CREATE TYPE "PostStatusNew" AS ENUM ('DRAFT', 'DEVELOPMENT', 'LIVE', 'ALPHA', 'BETA', 'PRESALE', 'CANCELL');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostStatusNew" NOT NULL DEFAULT 'DRAFT';

-- DropEnum
DROP TYPE "PostStatus";

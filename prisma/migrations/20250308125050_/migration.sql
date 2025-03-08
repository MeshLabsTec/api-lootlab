-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "network_secondary" VARCHAR(255)[] DEFAULT ARRAY[]::VARCHAR(255)[],
ADD COLUMN     "platform" VARCHAR(255)[] DEFAULT ARRAY[]::VARCHAR(255)[];

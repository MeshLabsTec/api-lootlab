-- DropForeignKey
ALTER TABLE "Partnership" DROP CONSTRAINT "Partnership_postId_fkey";

-- AddForeignKey
ALTER TABLE "Partnership" ADD CONSTRAINT "Partnership_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `favorited_posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorited_posts" DROP CONSTRAINT "favorited_posts_post_id_fkey";

-- DropForeignKey
ALTER TABLE "favorited_posts" DROP CONSTRAINT "favorited_posts_user_id_fkey";

-- DropTable
DROP TABLE "favorited_posts";

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "author_id" TEXT,
    "post_id" TEXT,
    "comment_parent_id" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_parent_id_fkey" FOREIGN KEY ("comment_parent_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

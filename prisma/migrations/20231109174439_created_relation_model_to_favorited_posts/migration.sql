/*
  Warnings:

  - You are about to drop the `_UserFavoritedPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFavoritedPost" DROP CONSTRAINT "_UserFavoritedPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoritedPost" DROP CONSTRAINT "_UserFavoritedPost_B_fkey";

-- DropTable
DROP TABLE "_UserFavoritedPost";

-- CreateTable
CREATE TABLE "favorited_posts" (
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "favorited_posts_pkey" PRIMARY KEY ("user_id","post_id")
);

-- AddForeignKey
ALTER TABLE "favorited_posts" ADD CONSTRAINT "favorited_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorited_posts" ADD CONSTRAINT "favorited_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

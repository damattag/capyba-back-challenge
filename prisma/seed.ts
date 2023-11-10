import { hash } from "bcryptjs";
import prisma from "../src/database/client";

async function seed() {
  const users = await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "johndoe@email.com",
        password: await hash("aaaa1111", 6),
        acceptedTerms: true,
        image: "google.com/image.png",
      },
      {
        name: "John Doe",
        email: "johndoe1234@email.com",
        password: await hash("aaaa1111", 6),
        acceptedTerms: true,
        image: "google.com/image.png",
        emailVerified: true,
      },
      {
        name: "Guilherme",
        email: "guilherme@email.com",
        password: await hash("aaaa1111", 6),
        acceptedTerms: true,
        image: "google.com/image.png",
        emailVerified: true,
        role: "ADMIN",
      },
    ],
  });

  const unverifiedUser = await prisma.user.findUnique({
    where: {
      email: "johndoe@email.com",
    },
  });

  const verifiedUser = await prisma.user.findUnique({
    where: {
      email: "johndoe1234@email.com",
    },
  });

  const adminUser = await prisma.user.findUnique({
    where: {
      email: "guilherme@email.com",
    },
  });

  const posts = await prisma.post.createMany({
    data: [
      {
        title: "First Post",
        content: "This is my first post",
        authorId: adminUser?.id,
      },
      {
        title: "Second Post",
        content: "This is my second post",
        authorId: adminUser?.id,
      },
      {
        title: "Third Post",
        content: "This is my third post",
        authorId: adminUser?.id,
      },
    ],
  });

  const firstPost = await prisma.post.findFirst({
    where: {
      title: "First Post",
    },
  });

  const secondPost = await prisma.post.findFirst({
    where: {
      title: "Second Post",
    },
  });

  const thirdPost = await prisma.post.findFirst({
    where: {
      title: "Third Post",
    },
  });

  const comments = await prisma.comment.createMany({
    data: [
      {
        content: "First comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
      },
      {
        content: "Second comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
      },
      {
        content: "Third comment",
        authorId: verifiedUser?.id,
        postId: secondPost?.id,
      },
      {
        content: "Fourth comment",
        authorId: verifiedUser?.id,
        postId: secondPost?.id,
      },
      {
        content: "Fifth comment",
        authorId: verifiedUser?.id,
        postId: thirdPost?.id,
      },
      {
        content: "Sixth comment",
        authorId: adminUser?.id,
        postId: thirdPost?.id,
      },
    ],
  });

  const firstComment = await prisma.comment.findFirst({
    where: {
      content: "First comment",
    },
  });

  const thirdComment = await prisma.comment.findFirst({
    where: {
      content: "Third comment",
    },
  });

  const fifthComment = await prisma.comment.findFirst({
    where: {
      content: "Fifth comment",
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: "First child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: firstComment?.id,
      },
      {
        content: "Second child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: firstComment?.id,
      },
      {
        content: "Third child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: firstComment?.id,
      },
      {
        content: "Fourth child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: thirdComment?.id,
      },
      {
        content: "Fifth child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: thirdComment?.id,
      },
      {
        content: "Sixth child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: thirdComment?.id,
      },
      {
        content: "Seventh child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: fifthComment?.id,
      },
      {
        content: "Eighth child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: fifthComment?.id,
      },
      {
        content: "Ninth child comment",
        authorId: verifiedUser?.id,
        postId: firstPost?.id,
        commentParentId: fifthComment?.id,
      },
    ],
  });
}

seed();

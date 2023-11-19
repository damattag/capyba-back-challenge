import UserRepository from "./prisma/userRepository";
import PostRepository from "./prisma/postRepository";
import CommentRepository from "./prisma/commentRepository";

import InMemoryCommentRepository from "./inMemory/inMemoryCommentRepository";
import InMemoryPostRepository from "./inMemory/inMemoryPostRepository";
import InMemoryUserRepository from "./inMemory/inMemoryUserRepository";

export {
  UserRepository,
  PostRepository,
  CommentRepository,
  InMemoryCommentRepository,
  InMemoryPostRepository,
  InMemoryUserRepository,
};

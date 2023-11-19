import { InMemoryPostRepository } from "../../src/repositories";

let postRepository: InMemoryPostRepository;

describe("Posts unit tests", () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
  });

  it.todo("should be able to create a new post");

  it.todo("should be able to find a post by id");

  it.todo("should be able to find posts by author id");

  it.todo("should be able to find posts by search");

  it.todo("should be able to filter posts by publish status");

  it.todo("should be able to update a post");

  it.todo("should be able to delete a post");
});

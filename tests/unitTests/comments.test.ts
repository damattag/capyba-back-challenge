import { InMemoryCommentRepository } from "../../src/repositories";

let commentRepository: InMemoryCommentRepository;

describe("Posts unit tests", () => {
  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
  });

  it.todo("should be able to create a new comment");

  it.todo("should be able to find a comment by id");

  it.todo("should be able to find comments by author id");

  it.todo("should be able to find comments by post id");

  it.todo("should be able to find comments by parent id");

  it.todo("should be able to find a comment by search");

  it.todo("should be able to filter comments by edit status");

  it.todo("should be able to update a comment");

  it.todo("should be able to delete a comment");
});

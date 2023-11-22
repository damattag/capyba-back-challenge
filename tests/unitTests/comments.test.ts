import {
  InMemoryCommentRepository,
  InMemoryPostRepository,
  InMemoryUserRepository,
} from "../../src/repositories";

let commentRepository: InMemoryCommentRepository;
let userRepository: InMemoryUserRepository;
let postRepository: InMemoryPostRepository;

describe("Posts unit tests", () => {
  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    userRepository = new InMemoryUserRepository();
    postRepository = new InMemoryPostRepository();

    await userRepository.create({
      id: "user-id",
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    await postRepository.create({
      id: "post-id",
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });
  });

  it("should be able to create a new comment", async () => {
    const response = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    expect(response).toHaveProperty("id");
    expect(response.id).toEqual(expect.any(String));
  });

  it("should be able to find a comment by id", async () => {
    const comment = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.findById(comment.id);

    expect(response).toHaveProperty("id");
    expect(response?.content).toEqual(comment.content);
  });

  it("should be able to find comments by author id", async () => {
    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.findByUser("user-id", 1, 10);

    expect(response.comments).toHaveLength(2);
    expect(response.comments[0].authorId).toEqual("user-id");
  });

  it("should be able to find comments by post id", async () => {
    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.findByPost("post-id", 1, 10);

    expect(response.comments).toHaveLength(2);
    expect(response.comments[0].postId).toEqual("post-id");
  });

  it("should be able to find comments by parent id", async () => {
    const comment = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const { id } = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
      commentParentId: comment.id,
    });

    const response = await commentRepository.findById(id);

    expect(response).toHaveProperty("id");
    expect(response?.commentParentId).toEqual(comment.id);
  });

  it("should be able to find a comment by search", async () => {
    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    await commentRepository.create({
      content: "Conteúdo do comentário",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.findByText("Comment", 1, 10);

    expect(response.comments).toHaveLength(1);
    expect(response.comments[0].content).toEqual("Comment content");
  });

  it("should be able to filter comments by edit status", async () => {
    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.findAll(1, 10, true);

    expect(response.comments).toHaveLength(0);
  });

  it("should be able to update a comment", async () => {
    const comment = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.update(comment.id, {
      content: "Updated comment content",
      edited: true,
    });

    expect(response).toHaveProperty("id");
    expect(response?.content).toEqual("Updated comment content");
    expect(response?.edited).toEqual(true);
  });

  it("should be able to delete a comment", async () => {
    const comment = await commentRepository.create({
      content: "Comment content",
      authorId: "user-id",
      postId: "post-id",
    });

    const response = await commentRepository.delete(comment.id);

    expect(response).toHaveProperty("id");
    expect(response?.id).toEqual(comment.id);
  });
});

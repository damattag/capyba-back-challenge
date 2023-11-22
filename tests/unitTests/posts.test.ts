import console from "console";
import {
  InMemoryPostRepository,
  InMemoryUserRepository,
} from "../../src/repositories";

let postRepository: InMemoryPostRepository;
let userRepository: InMemoryUserRepository;

describe("Posts unit tests", () => {
  beforeEach(async () => {
    postRepository = new InMemoryPostRepository();
    userRepository = new InMemoryUserRepository();

    await userRepository.create({
      id: "user-id",
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });
  });

  it("should be able to create a new post", async () => {
    const response = await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    expect(response).toHaveProperty("id");
    expect(response.id).toEqual(expect.any(String));
  });

  it("should be able to find a post by id", async () => {
    const post = await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    const response = await postRepository.findById(post.id);

    expect(response).toHaveProperty("id");
    expect(response?.title).toEqual(post.title);
  });

  it("should be able to find posts by author id", async () => {
    await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    const response = await postRepository.findByUser("user-id", 1, 5);

    expect(response.posts).toHaveLength(2);
  });

  it("should be able to find posts by search", async () => {
    await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    await postRepository.create({
      title: "Titulo da postagem",
      content: "Conteudo da postagem",
      authorId: "user-id",
      published: true,
    });

    const response = await postRepository.findByText("post", 1, 5);

    expect(response.posts).toHaveLength(1);
    expect(response.posts[0].title).toEqual("Post title");
  });

  it("should be able to filter posts by publish status", async () => {
    await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: false,
    });

    const response = await postRepository.findByUser("user-id", 1, 5, true);

    expect(response.posts).toHaveLength(1);
    expect(response.posts[0].published).toEqual(true);
  });

  it("should be able to update a post", async () => {
    const post = await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    const response = await postRepository.update(post.id, {
      title: "New post title",
      content: "New post content",
    });

    expect(response).toHaveProperty("id");
    expect(response.title).toEqual("New post title");
    expect(response.content).toEqual("New post content");
  });

  it("should be able to delete a post", async () => {
    const post = await postRepository.create({
      title: "Post title",
      content: "Post content",
      authorId: "user-id",
      published: true,
    });

    const response = await postRepository.delete(post.id);

    expect(response).toHaveProperty("id");
    expect(response.id).toEqual(post.id);
  });
});

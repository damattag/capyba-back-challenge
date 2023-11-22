import { InMemoryUserRepository } from "../../src/repositories";

let userRepository: InMemoryUserRepository;

describe("Users unit tests", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });

  it("should be able to create a new user", async () => {
    const userResponse = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    expect(userResponse).toHaveProperty("id");
    expect(userResponse.id).toEqual(expect.any(String));
  });

  it("should be able to find a user by id", async () => {
    const userResponse = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    const response = await userRepository.findById(userResponse.id);

    expect(response).toHaveProperty("id");
    expect(response?.id).toEqual(userResponse.id);
  });

  it("should be able to find a user by email", async () => {
    const userResponse = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    const response = await userRepository.findByEmail(userResponse.email);

    expect(response).toHaveProperty("id");
    expect(response?.id).toEqual(userResponse.id);
  });

  it("should be able to update a user", async () => {
    const userResponse = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    const response = await userRepository.update(userResponse.id, {
      name: "John Doe 2",
    });

    expect(response).toHaveProperty("id");
    expect(response?.name).toEqual("John Doe 2");
  });

  it("should be able to delete a user", async () => {
    const userResponse = await userRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password: "a1b2c3d4",
      image: "image.jpg",
      acceptedTerms: true,
    });

    const response = await userRepository.delete(userResponse.id);

    expect(response).toHaveProperty("id");
    expect(response?.id).toEqual(userResponse.id);
  });
});

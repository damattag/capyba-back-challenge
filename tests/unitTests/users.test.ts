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

  it.todo("should be able to find a user by id");

  it.todo("should be able to find a user by email");

  it.todo("should be able to update a user");

  it.todo("should be able to delete a user");
});

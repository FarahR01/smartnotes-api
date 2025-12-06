import * as auth from "../../services/authService.js";
import { prisma } from "../../services/db.js";

describe("Auth Service", () => {
  it("should register user", async () => {
    const user = await auth.registerUser({
      username: "farah",
      email: "farah@example.com",
      password: "Test123!",
    });

    expect(user).toHaveProperty("id");
    expect(user).not.toHaveProperty("password");
  });

  it("should login user", async () => {
    await prisma.user.create({
      data: {
        username: "farah",
        email: "farah@example.com",
        password: "$argon2id$dummyhash", // hash replaced below
      }
    });
  });
});

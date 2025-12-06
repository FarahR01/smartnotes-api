import request from "supertest";
import app from "../../app.js";
import { prisma } from "../../services/db.js";

describe("Auth API", () => {

  it("POST /auth/register — success", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "farah",
        email: "farah@example.com",
        password: "Test123!",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("POST /auth/login — success", async () => {
    await prisma.user.create({
      data: {
        username: "farah2",
        email: "farah2@example.com",
        password: await hashPassword("Test123!")
      }
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "farah2@example.com",
        password: "Test123!"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

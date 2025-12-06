import { hashPassword, verifyPassword } from "../../utils/hash.js";

describe("Password hashing", () => {
  it("should hash and verify password correctly", async () => {
    const password = "Secret123!";
    const hash = await hashPassword(password);

    expect(hash).toBeDefined();
    expect(await verifyPassword(hash, password)).toBe(true);
  });

  it("should fail verification for wrong password", async () => {
    const password = "Secret123!";
    const hash = await hashPassword(password);

    expect(await verifyPassword(hash, "wrong")).toBe(false);
  });
});

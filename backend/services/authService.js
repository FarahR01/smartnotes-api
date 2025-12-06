//C:\Users\Lenovo\Desktop\projects\Personnal Projects\smartnotes-api\backend\services\authService.js
import { prisma } from "../db/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";

export const registerUser = async ({ username, email, password }) => {
  // Check existing user
  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing)
    throw { status: 400, message: "Username or email already exists" };

  // Hash with Argon2id
  const hashed = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: { username, email, password: hashed },
  });

  const { password: _, ...safeUser } = user;
  return safeUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 400, message: "Invalid credentials" };

  // Verify Argon2 hash
  const valid = await verifyPassword(user.password, password);
  if (!valid) throw { status: 400, message: "Invalid credentials" };

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};

import { prisma } from "../services/db.js";

beforeEach(async () => {
  // Clean database between tests
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

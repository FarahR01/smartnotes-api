// C:\Users\Lenovo\Desktop\projects\Personnal Projects\smartnotes-api\backend\db\index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Connect to database
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ PostgreSQL Connected Successfully via Prisma');
  } catch (error) {
    console.error('❌ Database Connection Error:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Prisma Client disconnected');
  process.exit(0);
});

export { prisma };
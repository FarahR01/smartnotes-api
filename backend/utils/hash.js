import argon2 from 'argon2';

const argonOptions = {
  type: argon2.argon2id,        // argon2id variant (best practice)
  memoryCost: 64 * 1024,        // 64MB (can increase to 128MB if server allows)
  timeCost: 4,                  // iterations
  parallelism: 4                // number of threads
};

export const hashPassword = async (plain) => {
  return await argon2.hash(plain, argonOptions);
};

export const verifyPassword = async (hash, plain) => {
  return await argon2.verify(hash, plain);
};

export const getUserProfile = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, email: true, createdAt: true }
  });
};

export const updateUserProfile = async (userId, data) => {
  if (data.password) data.password = await hashPassword(data.password);

  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, username: true, email: true, updatedAt: true }
  });
};

export const deleteUser = async (userId) => {
  await prisma.user.delete({ where: { id: userId } });
  return { message: "Account deleted successfully" };
};
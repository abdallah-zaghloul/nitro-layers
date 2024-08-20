export class UserRepository {
  async getAll() {
    return prisma.user.findMany();
  }
}

export class UserRepository {
  private count = 10;
  async getAll() {
    return prisma.user.findMany();
  }

  public setCount(){
    return this.count = this.count + 10
  }
}

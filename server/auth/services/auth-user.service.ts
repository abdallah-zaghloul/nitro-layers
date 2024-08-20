import { UserRepository } from "../repositories/user.repository";

export class AuthUserService {
  public count: number = 1;
  constructor(private userRepository: UserRepository) {
    ++this.count;
  }

  async getAll() {
    return this.userRepository.getAll();
  }

  public setCount() {
    this.count = this.count + 2;
  }
}

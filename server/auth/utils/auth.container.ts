import { UserRepository } from "../repositories/user.repository";
import { AuthUserService } from "../services/auth-user.service";

export const useAuthContainer = useSingletonContainer({
  dependencies: {
    userRepository: UserRepository,
    authUserService: AuthUserService,
  },
});

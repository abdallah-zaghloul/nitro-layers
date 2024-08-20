import { UserRepository } from "../repositories/user.repository";
import { AuthUserService } from "../services/auth-user.service";

// Define the container with class constructors
const container = {
  $userRepository: UserRepository,
  $authUserService: AuthUserService,
};

const userRepository = useResolver(container, "$userRepository");
const authUserService = useResolver(
  container,
  "$authUserService",
  userRepository
);

export function useAuthContainer() {
  return container;
}

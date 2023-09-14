import { Login } from "../../application/features/login/login.usecase";
import { JWTAdapter } from "../../cryptography/jwt/jwt.adapter";
import { UserRepositoryMemory } from "../../persistence/repositories/memory/user.repository.memory";

export class LoginUseCaseFactory {
  static create() {
    const userRepository = UserRepositoryMemory.create();
    const tokenGenerator = new JWTAdapter();
    const login = new Login(userRepository, tokenGenerator);
    return login;
  }
}

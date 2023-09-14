import { Signup } from "../../application/features/signup/signup.usecase";
import { JWTAdapter } from "../../cryptography/jwt/jwt.adapter";
import { UserRepositoryMemory } from "../../persistence/repositories/memory/user.repository.memory";

export class SignupUseCaseFactory {
  static create() {
    const userRepository = UserRepositoryMemory.create();
    const tokenGenerator = new JWTAdapter();
    const signup = new Signup(userRepository, tokenGenerator);
    return signup;
  }
}

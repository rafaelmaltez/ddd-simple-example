import { BcryptPassword } from "../../../domain/user/password.vo";
import { User } from "../../../domain/user/user.entity";
import { TokenGenerator } from "../../interfaces/criptography/token-generator.interface";
import { GetUserRepository } from "../../interfaces/persistence/get-user.repository.interface";
import { SaveUserRepository } from "../../interfaces/persistence/save-user.repository.interface";

export class Signup {
  constructor(
    private readonly repo: SaveUserRepository & GetUserRepository,
    private readonly tokenGenerator: TokenGenerator
  ) {}
  async execute(input: SignupInput): Promise<SignupOutput> {
    const existingUser = await this.repo.getOneUser(input.username)
    if(existingUser) throw new Error("Username already in use.");
    const newUser = new User(
      input.username,
      await BcryptPassword.create(input.password)
    );
    await this.repo.save(newUser);
    const token = await this.tokenGenerator.generate({
      id: newUser.id,
      username: newUser.username,
    });
    return token;
  }
}

type SignupInput = {
  username: string;
  password: string;
};

type SignupOutput = {
  token: string;
};
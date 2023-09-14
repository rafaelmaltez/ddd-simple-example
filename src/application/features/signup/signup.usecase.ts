import { BcryptPassword } from "../../../domain/user/password.vo";
import { User } from "../../../domain/user/user.entity";
import { TokenGenerator } from "../../interfaces/criptography/token-generator.interface";
import { SaveUserRepository } from "../../interfaces/persistence/save-user.repository.interface";

export class Signup {
  constructor(
    private readonly repo: SaveUserRepository,
    private readonly tokenGenerator: TokenGenerator
  ) {}
  async execute(input: SignupInput): Promise<SignupOutput> {
    const user = new User(input.username, await BcryptPassword.create(input.password));
    await this.repo.save(user);
    const token = await this.tokenGenerator.generate({id: user.id, username: user.username});
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
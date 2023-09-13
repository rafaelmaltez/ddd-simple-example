import { GetUserRepository } from "../../interfaces/persistence/get-user.repository.interface";
import { TokenGenerator } from "../../interfaces/criptography/token-generator.interface";

export class Login {
    constructor (
        private readonly repo: GetUserRepository,
        private readonly tokenGenerator: TokenGenerator
    ){}
    async execute(input: LoginInput){
        const user = await this.repo.getOneUser(input.username)
        if (!user) return;
        user.checkPassword(input.password);
        const token = await this.tokenGenerator.generate({ id: user.id, username: user.username})
        return token;
    }
}

type LoginInput = {
    username: string
    password: string
}

type LoginOutput = {
    token: string
}
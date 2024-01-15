import { LoginUseCaseFactory } from "../factories/login.usecase.factory";
import { SignupUseCaseFactory } from "../factories/signup.usecase.factory";

import { HttpServer } from "../interfaces/http-server.interface";

export default class UserController {
    login = LoginUseCaseFactory.create()
    signup = SignupUseCaseFactory.create()

    constructor(httpServer: HttpServer){
        httpServer.on("post", "/login", async(params: any, body: any) => {
            const token  = await  this.login.execute({
                username: body.username,
                password: body.password
            })
            return token
        })

        httpServer.on("post", "/signup", async (params: any, body: any) => {
          const token  = await this.signup.execute({
            username: body.username,
            password: body.password,
          });
          return token;
        });
    }
}
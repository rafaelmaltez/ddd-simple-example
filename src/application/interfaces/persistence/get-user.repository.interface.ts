import { User } from "../../../domain/user/user.entity";

export interface GetUserRepository {
    getOneUser(username: string): Promise<User>
}
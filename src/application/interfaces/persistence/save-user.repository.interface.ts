import { User } from "../../../domain/user/user.entity";

export interface SaveUserRepository {
    save(user: User): Promise<void>
}
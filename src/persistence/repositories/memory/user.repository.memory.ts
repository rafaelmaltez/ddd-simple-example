import { UUID } from "crypto";
import { GetUserRepository } from "../../../application/interfaces/persistence/get-user.repository.interface";
import { SaveUserRepository } from "../../../application/interfaces/persistence/save-user.repository.interface";
import { BcryptPassword } from "../../../domain/user/password.vo";
import { User } from "../../../domain/user/user.entity";

type UserData = {
    id: UUID,
    username: string
    password_hash: string
}

export class UserRepositoryMemory implements GetUserRepository, SaveUserRepository{
    private static _instance: UserRepositoryMemory
    users: UserData[] = []
    
    async getOneUser(username: string): Promise<User | undefined> {
        const userData = this.users.find((user) => user.username = username)
        if (userData) {
            return new User(userData.username, BcryptPassword.restore(userData.password_hash), userData.id )
        }
        return
    }
    async save(user: User): Promise<void> {
        this.users.push({id: user.id!, username: user.username, password_hash: user.password });
    }

    static create() {
        if(!UserRepositoryMemory._instance) {
            UserRepositoryMemory._instance = new UserRepositoryMemory();
            return UserRepositoryMemory._instance;
        }
        return UserRepositoryMemory._instance;
    }
}
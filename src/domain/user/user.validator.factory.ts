import { Validator } from "../_shared/validator/validator.interface";
import { User } from "./user.entity";
import { UserZodValidator } from "./user.zod.validator";

export class UserValidatorFactory {
    static create(): Validator<User> {
        return new UserZodValidator()
    }
}
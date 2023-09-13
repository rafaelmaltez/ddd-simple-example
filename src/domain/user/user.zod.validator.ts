import { Validator } from "../_shared/validator/validator.interface";
import { User } from "./user.entity";
import { z } from "zod";


export class UserZodValidator implements Validator<User> {
    schema = z.object({
      username: z.string().nonempty().min(4),
      password: z.string().nonempty().min(7),
    });
  
  validate(entity: User) {
    const result = this.schema.safeParse(entity)
    if (!result.success) {
        result.error.issues
          .map(issue => entity.notification.addError({ 
            context: "user", 
            message: `${issue.path[0]} => ${issue.message}`
          }))
    }    
  }
}
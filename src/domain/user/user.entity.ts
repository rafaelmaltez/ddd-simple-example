import { UUID, randomUUID } from "crypto";
import { Entity } from "../_shared/entity/entity.abstract";
import { UserValidatorFactory } from "./user.validator.factory";
import { BcryptPassword, Password } from "./password.vo";


export class User extends Entity {
  private _username: string;
  private _password: Password;

  constructor(username: string, password: Password, id?: UUID) {
    super();
    this._id = id || randomUUID();
    this._username = username;
    this._password = password

    this.validate();
  }

  validate() {
    UserValidatorFactory.create().validate(this);
    if (this.notification.hasErrors()) {
        throw new Error(this.notification.getErrorMessages())
    }
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password.hash;
  }

  async checkPassword(password: string) {
    const isValid = this._password.compare(password);
    if (!isValid) throw new Error("Invalid credentials");
  }
}
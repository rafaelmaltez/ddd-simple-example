import * as bcrypt from 'bcrypt'

export interface Password {
    hash: string
    compare(hash: string): boolean
}

export class BcryptPassword implements Password{
    hash: string

    private constructor(value: string){
        this.hash = value
    }
    compare(value: string): boolean {
        return bcrypt.compareSync(value, this.hash)
    }
    static create(value: string): Password {
        return new BcryptPassword(bcrypt.hashSync(value, 12))
    }
    static restore(hash: string) {
        return new BcryptPassword(hash)
    }
}
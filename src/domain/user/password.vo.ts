import * as bcrypt from 'bcrypt'

export interface Password {
    hash: string
    compare(hash: string): Promise<boolean>
}

export class BcryptPassword implements Password{
    hash: string

    private constructor(value: string){
        this.hash = value
    }
    async compare(value: string) {
        return bcrypt.compare(value, this.hash)
    }
    static async create(value: string): Promise<Password> {
        if(value.length < 6 ) {
            throw new Error("Invalid password")
        }
        const hash = await bcrypt.hash(value, 12)
        return new BcryptPassword(hash);
    }
    static restore(hash: string) {
        return new BcryptPassword(hash)
    }
}
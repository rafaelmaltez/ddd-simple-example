import { TokenGenerator } from "../../application/interfaces/criptography/token-generator.interface";
import * as jwt from 'jsonwebtoken';

export class JWTAdapter implements TokenGenerator{
    async generate(data: any): Promise<{ token: string; }> {
        const token = await jwt.sign(data, process.env.JWT_SECRET || 'secret');
        return {
            token
        }
    }
    
}
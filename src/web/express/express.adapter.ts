import express, { Express, Request, Response} from 'express';
import { HttpServer } from "../interfaces/http-server.interface";

export class ExpressAdapter implements HttpServer {
    app: any

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }
    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async (req: Request, res: Response) => {
            try {
                const token = await callback(null, req.body)
                return res.status(200).json(token)
            } catch (error: any) {
                res.status(422).json({ message: error.message })
            }
        })
    }
    
    listen(port: number): void {
        this.app.listen(port, () => console.log(`Express: Running on port ${port}!!`))
    }

}
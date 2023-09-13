import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors";

import userControler from './user.controller'

const app = express();
app.use(express.json());
app.use(userControler);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(400).json({
        message: err.message
    })
    return
})

export default app;
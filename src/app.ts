// eslint-disable @typescript-eslint/no-explicit-any
import * as dotenv from 'dotenv';
dotenv.config({path: ".env"});
import express, { Request, Response } from "express";
import { mainRouter } from './init'
import cors from 'cors';

export async function createApp(): Promise<express.Application> {

    const app = express();

    app.use(cors());
    
    app.set('port', process.env.PORT);

    app.use(express.json({ limit: '10mb', type: 'application/json' }));

    app.use(express.urlencoded({ extended: false }));

    app.get('/', (req: Request, res: Response) => {
        return res.status(200).json({ message: '!You have successfully started the application!' });
    });

    app.use("/",  mainRouter);

    return app;
}
import express, {Express} from "express";
import cors from "cors"
import authRoutes from "../routes/auth"
import { dbConnection } from "../database/config";

export class Server {

    app: Express
    port: string | number | undefined
    authPath: string
  
    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 8080;
        this.authPath = '/auth';
      

        this.conectarDB()
        this.middlewares()
        this.routes()
    }


    async conectarDB(): Promise<void> {
        await dbConnection();
    }
// aca instalo npm i cors
// cors: es para que nadie se conecte a mi api y que no mande metodo http que yo noquiero que me manden

    middlewares(): void {
        this.app.use(express.json())
        this.app.use(cors())
    }


    routes(): void {
        this.app.use(this.authPath, authRoutes)
       
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`);
            
        })
    }
}
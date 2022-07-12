import express,{Express} from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import {Server} from "typescript-rest"
import { covidDiagnosisController } from "./controllers/covid-diagnosis-controller";
const app = express();

export const setupController = (expressApp: Express):void => {
    Server.buildServices(expressApp,covidDiagnosisController)
}

app.use(bodyParser.json());


app.use(cors({
    origin: '*'
}));


app.listen(3000, () => {
    console.log(`Server started at http://localhost:${3000}`);
});


export default app;
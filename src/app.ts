import express, { json, urlencoded } from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/router";
import errorHandlerMiddleware from "./middlewares/errorMiddleware";

const app = express();
app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use(router);
app.use(errorHandlerMiddleware);

export default app;

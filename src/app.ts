import express, { json } from "express";
import "express-async-errors";
import router from "./routes/router";
import errorHandlerMiddleware from "./middlewares/errorMiddleware";

const app = express();
app.use(json());

app.use(router);
app.use(errorHandlerMiddleware);

export default app;

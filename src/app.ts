import express, { json } from "express";
import "express-async-errors";
import router from "./routes/router";

const app = express();
app.use(json());
app.use(router);

export default app;

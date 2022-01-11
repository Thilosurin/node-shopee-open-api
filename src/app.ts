import express from "express";
import api from "./routers/api";

const app = express();
app.use(express.json());

app.use("/v1/api", api);

export default app;

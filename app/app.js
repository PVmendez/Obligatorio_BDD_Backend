"use strict";

import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swagger as swaggerDocument } from "./config/swagger.js";
import { router as rest } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors({
  origin              : '*',
  optionsSuccessStatus: 200,
  methods             : ['GET'],
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/", rest);

export { app };
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'
// const dotenv = require("dotenv");
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// passportConfig();

app.get("/", (req, res) => res.send("express!"));
// app.use(passport.initialize());

// app.use("/api/user", userRouter);
// app.use("/api/study", studyRouter);

const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

export { app };
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs'

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

export { app };
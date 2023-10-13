import express from "express";
import pkg from 'body-parser';
const { json } = pkg;

import cors from 'cors'

import { errorHandler } from "./common/src/middlewares/error-handler.js"
import { NotFoundError } from "./common/src/errors/not-found-error.js";

import { currentUser } from "./common/src/middlewares/current-user.js";
import { currentGroup } from "./common/src/middlewares/current-group.js";

import { loadRoutes } from "./routes.js";

const app = express();

app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(currentUser);
//app.use(currentGroup);

await loadRoutes(app);

app.all("*",  (req, res) => {
   throw  new NotFoundError();
});

app.use(errorHandler);

export { app };

import * as express from "express";
const bodyParser = require("body-parser");

const routes = require("./routes");

const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use('/api', routes);

export default app;

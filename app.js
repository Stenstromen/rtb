const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const app = express();
const rtbRouter = require("./routers/rtb.router");

app.use(bodyParser.json());
app.use(compression());
app.use(rtbRouter);

app.listen(8080, () => {
  console.log("Server listening on localhost:8080");
});

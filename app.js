const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const ejs = require('ejs');
const app = express();
const rtbRouter = require("./routers/rtb.router");

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(rtbRouter);

app.listen(8080, () => {
  console.log("Server listening on localhost:8080");
});

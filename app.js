const cors = require("cors");
const express = require("express");
const routes = require("./routes/authRoute.js");
const app = express();
const bodyParser = require("body-parser");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/auth", routes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

const server = app.listen(8081, function () {
  const port = server.address().port;

  console.log("Example app listening at http://localhost:%s", port);
});

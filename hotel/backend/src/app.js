const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const middleware = require("./utils/middleware");

const logger = require("./utils/logger");

const mongoose = require("mongoose");
const config = require("./utils/config");

const hotelRouter = require("./controllers/hotel");

logger.info("connecting to ", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then((res) => {
    logger.info("connected to mongodb");
  })
  .catch((err) => {
    logger.error("error connecting to mongodb", err.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("body", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.use(middleware.requestLogger);

app.use("/api/hotel", hotelRouter);

// if (process.env.NODE_ENV === "test") {
//   const testingRouter = require("./controllers/testing");
//   app.use("/api/testing", testingRouter);
// }

app.use(middleware.unknownEndpoints);
app.use(middleware.errorHandler);
module.exports = app;

const express = require("express");
require("dotenv/config");
const morgan = require("morgan");
require("express-async-errors");
const cors = require("cors");
const globalError = require("./exception/globalError");
const AppError = require("./exception/AppError");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/api", require("./routes/api"));

app.use(globalError);

app.get("/", (req, res) => {
  res.json({
    message: "Server is on 🔥",
  });
});

app.all("*", (req, res, next) => {
  next(
    new AppError(`Can't find route ${req.originalUrl} on this Node server`, 404)
  );
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

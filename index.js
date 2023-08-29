const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config({ path: "../config/.env" });

const dbConnection = require("./config/db");
const app = express();

app.use(helmet());
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
express.static(path.join(__dirname, "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Authorization", "Bearer");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use(authRoutes);
app.use("/app", userRoutes);
app.use(bookRoutes);

const port = process.env.PORT || 5000;

async function start() {
  await dbConnection();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
  });
}

start();

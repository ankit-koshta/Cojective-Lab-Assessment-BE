const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const { setUpDBConnection } = require("./src/config/db");

dotenv.config();

const app = express();
const corsOption = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOption));

app.use(express.json());

setUpDBConnection();

app.use("/", routes);

app.listen(process.env.PORT, (err) => {
  console.log(`server running on ${process.env.PORT}`);
});

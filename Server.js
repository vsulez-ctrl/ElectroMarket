const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const checkoutRoutes = require("./src/routes/checkout");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", checkoutRoutes);

app.listen(4000, () => {
  console.log("Servidor en http://localhost:4000");
});

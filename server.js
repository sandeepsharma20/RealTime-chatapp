import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" }); // load env first
console.log("Mongo URI from .env:", process.env.CONN_STRING); // 👈 check if loaded

import app from "./app.js";
import db from "./config/dbconfig.js";
db.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});
const port = process.env.PORT_NUMBER || 3000;

app.listen(port, () => {
  console.log("server is ready on :" + port);
});

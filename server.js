const express = require("express");
const db = require("./config/mongoose");

const app = express();

// Connect Database
db();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API Running"));

app.listen(port, (err) => {
   if (err) {
      console.log("Error in running the server:", port);
   }
   console.log("Server is running on port:", port);
});

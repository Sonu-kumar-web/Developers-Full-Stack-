const express = require("express");
const db = require("./config/mongoose");

const app = express();

// Connect Database
db();

const port = process.env.PORT || 5000;

// Use express routes
app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
   if (err) {
      console.log("Error in running the server:", port);
   }
   console.log("Server is running on port:", port);
});

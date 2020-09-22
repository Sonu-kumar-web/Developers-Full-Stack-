const express = require("express");
const db = require("./config/mongoose");
const path = require("path");
const passportJWT = require("./config/passport-jwt-strategy");
const cors = require("cors");
const app = express();

// Connect Database
db();

app.use(cors());

// Initialized Middleware
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

// Use express routes
app.use("/", require("./routes/index.js"));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
   // Set static folder
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.listen(port, (err) => {
   if (err) {
      console.log("Error in running the server:", port);
   }
   console.log("Server is running on port:", port);
});

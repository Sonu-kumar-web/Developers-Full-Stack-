const mongoose = require("mongoose");
const config = require("config"); // It is config package not config folder

const db = config.get("mongoURI");

const connectDB = async () => {
   try {
      await mongoose.connect(db, {
         useNewUrlParser: true, //To remove warning given by server
         useUnifiedTopology: true, //To remove warning given by server
      });

      console.log("MongoDB connected");
   } catch (err) {
      console.error(err.message);

      //  Exit process with failure
      process.exit(1);
   }
};

module.exports = connectDB;

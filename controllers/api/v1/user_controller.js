const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");

const User = require("../../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../../validation/register");

module.exports.registerUser = async function (req, res) {
   try {
      const { errors, isValid } = validateRegisterInput(req.body);

      // Check Validation
      if (!isValid) {
         return res.status(400).json(errors);
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
         errors.email = "Email already exists";
         return res.status(400).json(errors);
      }

      const gravatar_url = await gravatar.url(req.body.email, {
         s: "200", // size
         r: "pg",
         d: "mm",
      });

      let newUser = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         avatar: gravatar_url,
      });

      return res.status(200).json(newUser);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error!" });
   }
};

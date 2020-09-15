const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/profile", require("./profile"));
router.use("/users", require("./users"));

module.exports = router;

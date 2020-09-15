const express = require("express");
const router = express.Router();
const passport = require("passport");
const profileController = require("../../../controllers/api/v1/profile-controller");

router.get(
   "/",
   passport.authenticate("jwt", { session: false }),
   profileController.fetchProfile
);

router.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   profileController.createProfile
);

router.get("/all", profileController.returnAllProfile);

router.get("/handle/:handle", profileController.getProfileByHandle);

router.get("/user/:user_id", profileController.getProfileByUserId);

router.post(
   "/experience",
   passport.authenticate("jwt", { session: false }),
   profileController.addExprience
);

router.post(
   "/education",
   passport.authenticate("jwt", { session: false }),
   profileController.addEducation
);

router.delete(
   "/experience/:exp_id",
   passport.authenticate("jwt", { session: false }),
   profileController.deleteExprience
);

router.delete(
   "/education/:edu_id",
   passport.authenticate("jwt", { session: false }),
   profileController.deleteEducation
);

router.delete(
   "/",
   passport.authenticate("jwt", { session: false }),
   profileController.deleteUserAndProfile
);

module.exports = router;

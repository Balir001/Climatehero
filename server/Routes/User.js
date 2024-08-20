const express = require("express")
const router = express();
const { signUpUser,signInUser,sendPasswordResetAuthenticationOtp } = require("../controller/userController.js");
const { verifyToken } = require("../middleware/auth.js");

router.post("/signup",signUpUser)
router.post("/signin",signInUser)
router.post("/requestpasswordreset",sendPasswordResetAuthenticationOtp)




module.exports = router;
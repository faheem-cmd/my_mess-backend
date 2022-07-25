const express = require("express");
var router = express();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const auth = require("../middleware/user.middleware");

const user = require("../controller/user.controller");

router.post("/signup", user.signup);
router.post("/login/", user.login);
router.post("/logout", auth.accessToken, user.logout);
router.get("/profile", auth.accessToken, user.getByUserId);

module.exports = router;

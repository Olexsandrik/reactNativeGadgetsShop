var express = require("express");
const UserController = require("../Controllers/user-contoller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", UserController.register);

router.post("/login", UserController.login);
module.exports = router;

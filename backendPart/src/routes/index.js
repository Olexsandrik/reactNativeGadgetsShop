var express = require("express");

const prisma = require("../../prisma/prisma");
const UserController = require("../Controllers/user-contoller");
var router = express.Router();
const authMiddleware = require("../middleware/middleware");
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/me", authMiddleware, async (req, res) => {
  console.log("REQ.USER", req.user);
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});
module.exports = router;

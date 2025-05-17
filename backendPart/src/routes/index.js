var express = require("express");

const prisma = require("../../prisma/prisma");
const UserController = require("../Controllers/user-contoller");
const ProductController = require("../Controllers/product-controller");
const CategoryController = require("../Controllers/category-controller");
const OrderController = require("../Controllers/order-controller");
var router = express.Router();
const authMiddleware = require("../middleware/middleware");

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/profile", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// auth

router.post("/register", UserController.register);

router.post("/login", UserController.login);
//

//Product
router.get("/products", authMiddleware, ProductController.getAllProducts);
router.delete(
  "/products/:id",
  authMiddleware,
  ProductController.removeProducts
);
//

//Categories
router.get(
  "/getAllCategories/:id",
  authMiddleware,
  CategoryController.getAllCategory
);

//Categories

//Orders

router.post("/orders", authMiddleware, OrderController.orderCreate);
router.delete(
  "/product/:id/order/:ordId",
  authMiddleware,
  OrderController.removeOrderItem
);

router.get("/orders/:id", authMiddleware, OrderController.getAllOrderItem);

//Orders

router.get("/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      orders: {
        select: {
          id: true,
        },
      },
    },
  });

  console.dir(user, { depth: null, colors: true });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});
module.exports = router;

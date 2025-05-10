const prisma = require("../../prisma/prisma");

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const { name, description, price, imageUrl, categoryId, createdAt } =
        req.query;

      const getAllGood = await prisma.product.findMany({
        where: {
          name,
          description,
          price,
          imageUrl,
          categoryId,
          createdAt,
        },
      });

      res.json(getAllGood);
    } catch (error) {
      console.error("GetAllProducts error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  removeProducts: async (req, res) => {
    try {
      const { id } = req.params;
      const productId = parseInt(id);

      const removeOrder = await prisma.orderItem.deleteMany({
        where: { productId },
      });

      const removeProduct = await prisma.product.delete({
        where: { id: productId },
      });

      res.json({ removeProduct, removeOrder });
    } catch (error) {
      console.error("GetAllProducts error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ProductController;

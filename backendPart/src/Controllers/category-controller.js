const prisma = require("../../prisma/prisma");

const CategoryController = {
  getAllCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const findAllProductsAndCategories = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          products: true,
        },
      });

      console.log(findAllProductsAndCategories);
      res.status(201).json(findAllProductsAndCategories);
    } catch (error) {
      console.error("GetAllProducts error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = CategoryController;

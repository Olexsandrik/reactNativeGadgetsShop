const prisma = require("../../prisma/prisma");

const ProductController = {
  getAllProducts: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { name, description, price, imageUrl, categoryId, createdAt } =
      req.query;

    const where = {
      ...(name && {
        name: {
          contains: name,
          mode: "insensitive",
        },
      }),
      ...(description && {
        description: {
          contains: description,
          mode: "insensitive",
        },
      }),
      ...(price && {
        price: Number(price),
      }),
      ...(imageUrl && {
        imageUrl: {
          contains: imageUrl,
          mode: "insensitive",
        },
      }),
      ...(categoryId && {
        categoryId: Number(categoryId),
      }),
      ...(createdAt && {
        createdAt: new Date(createdAt),
      }),
    };

    try {
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        prisma.product.count({ where }),
      ]);

      const response = {
        data: products,
        meta: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };

      res.json(response);
    } catch (error) {
      console.error("GetAllProducts error:", error);
      res.status(500).json({ message: "Internal server error" });
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

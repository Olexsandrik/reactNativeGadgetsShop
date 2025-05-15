const prisma = require("../../prisma/prisma");

const OrderController = {
  orderCreate: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.userId;

      const prodtId = parseInt(productId);
      const quantityPars = parseInt(quantity);

      const existingProducts = await prisma.product.findUnique({
        where: {
          id: prodtId,
        },
      });

      if (!existingProducts) {
        return res.status(404).json({ message: "Product Id never userd" });
      }

      const existingOrder = await prisma.order.findFirst({
        where: { userId },
      });

      if (!existingOrder) {
        return res.status(409).json({ message: "Order already exists" });
      }

      const newOrder = await prisma.order.create({
        data: {
          userId,
          status: "pending",
          totalPrice: 0,
        },
      });

      const orderId = newOrder.id;

      const newOrderItem = await prisma.orderItem.create({
        data: {
          orderId,
          productId: prodtId,
          quantity: quantityPars,
        },
      });

      res.status(201).json({ newOrder, newOrderItem });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Server error while creating order" });
    }
  },
};

module.exports = OrderController;

const prisma = require("../../prisma/prisma");

const OrderController = {
  orderCreate: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.userId;

      const prodtId = parseInt(productId);
      const quantityPars = parseInt(quantity);

      const product = await prisma.product.findUnique({
        where: { id: prodtId },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const productTotal = product.price * quantityPars;
      const existingOrder = await prisma.order.findFirst({
        where: {
          userId: userId,
          status: "pending",
        },
      });

      let orderId;
      if (!existingOrder) {
        const newOrder = await prisma.order.create({
          data: {
            userId,
            status: "pending",
            totalPrice: productTotal,
          },
        });

        orderId = newOrder.id;
      } else {
        await prisma.order.update({
          where: { id: existingOrder.id },
          data: {
            totalPrice: existingOrder.totalPrice + productTotal,
          },
        });
        orderId = existingOrder.id;
      }

      const orderItem = await prisma.orderItem.create({
        data: {
          orderId,
          productId: prodtId,
          quantity: quantityPars,
        },
      });

      res.status(201).json({ orderItem, orderId });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Server error while creating order" });
    }
  },

  getAllOrderItem: async (req, res) => {
    try {
      const { id } = req.params;

      const orderId = parseInt(id);

      const findAllOrderItem = await prisma.orderItem.findMany({
        where: { orderId },
        select: {
          id: true,
          quantity: true,
          productId: true,
          product: true,
        },
      });

      res.status(200).json(findAllOrderItem);
    } catch (error) {
      console.error("GetAllOrder  error:", error);
      res
        .status(500)
        .json({ message: "Server error while get all order item" });
    }
  },
  removeOrderItem: async (req, res) => {
    try {
      const { id, ordId } = req.params;

      const productId = parseInt(id);
      const orderId = parseInt(ordId);
      const orderItem = await prisma.orderItem.findFirst({
        where: { productId: productId, orderId: orderId },
      });
      const product = await prisma.product.findFirst({
        where: { id: orderItem.productId },
      });

      const order = await prisma.order.findFirst({
        where: { id: orderItem.orderId },
      });

      const removeTotal = product.price * orderItem.quantity;

      await prisma.order.update({
        where: { id: orderItem.orderId },

        data: {
          totalPrice: order.totalPrice - removeTotal,
        },
      });

      await prisma.orderItem.delete({
        where: { id: orderItem.id },
      });
      res.status(200).json({ message: "Order item removed successfully" });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Server error while creating order" });
    }
  },
};

module.exports = OrderController;

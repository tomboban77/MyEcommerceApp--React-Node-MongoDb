const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//Create New Order
//Post

exports.addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No Ordered Items" });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//get Order by id
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
});

//Update Order
//Private api/orders/:id/pay

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isPaid = true), (order.paidAt = Date.now());
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404).json({
      message: "Order not Updated",
    });
  }
});

//Get logged in Order
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404).json({ message: "Error in getting all orders" });
  }
});

//Get all Orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  if (orders) {
    res.json(orders);
  } else {
    res.status(404).json({ message: "Error in getting all orders" });
  }
});

//Update Order to Delivered
//Private api/orders/:id/deliver

exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    (order.isDelivered = true), (order.deliveredAt = Date.now());

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404).json({
      message: "Order not Updated",
    });
  }
});

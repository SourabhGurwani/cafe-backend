import orderModel from "../models/orderModel.js";

const newOrder = async (req, res) => {
  try {
    const body = req.body;
    const result = await orderModel.create(body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const showOrders = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderModel.find({ email: id });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { newOrder,showOrders };
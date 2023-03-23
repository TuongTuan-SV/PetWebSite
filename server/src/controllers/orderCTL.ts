import { Request, Response } from 'express';
import Order from '../models/OrderModel';
import User from '../models/UserModel';
import Product from '../models/ProductModel';

const OrderController = {
  getOrder: async (req: Request, res: Response) => {
    try {
      const payments = await Order.find();
      console.log(payments);
      res.json(payments);
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  createOrder: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user._id).select('lastName email');
      if (!user) return res.status(400).json({ msg: 'User not exists' });

      const {
        PostalCode,
        PaymentMethod,
        City,
        Country,
        Cart,
        Address,
        Fristname,
        LastName,
        Total,
      } = req.body.order;
      const { _id, email } = user;

      const NewOrder = new Order({
        user_id: _id,
        email,
        PostalCode,
        PaymentMethod,
        City,
        Country,
        Cart,
        Address,
        Fristname,
        LastName,
        Total,
      });
      // console.log(Cart);
      Cart.forEach((item: any) => {
        return sold(item._id, item.quantity, item.Sold);
      });
      // Cart.filter((item: any) => {
      //   return sold(item._id, item.quantity, item.Sold);
      // });

      // await NewOrder.save();
      res.json({ msg: 'Order Created' });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
};

const sold = async (id: any, quantity: any, oldsold: any) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      Sold: quantity + oldsold,
    }
  );
  console.log('updated');
};
module.exports = OrderController;

import { Request, Response } from 'express';
import Order from '../models/OrderModel';
import User from '../models/UserModel';
import Product from '../models/ProductModel';

const OrderController = {
  getOrder: async (req: Request, res: Response) => {
    try {
      const payments = await Order.find();
      // console.log(payments);
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
        PaymentMethod,
        Provice,
        District,
        Ward,
        Cart,
        Address,
        FirstName,
        LastName,
        OrderNote,
        Total,
      } = req.body.order;
      const { _id, email } = user;

      const NewOrder = new Order({
        user_id: _id,
        email,
        PaymentMethod,
        Provice,
        District,
        Ward,
        Cart,
        Address,
        FirstName,
        LastName,
        OrderNote,
        Total,
      });
      // console.log(Cart);
      Cart.forEach((item: any) => {
        return sold(item._id, item.quantity, item.Sold, item.Stocks);
      });
      // Cart.filter((item: any) => {
      //   return sold(item._id, item.quantity, item.Sold);
      // });

      await NewOrder.save();
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
  updateStatus: async (req: any, res: Response) => {
    try {
      await Order.findByIdAndUpdate(req.params.id, { Status: req.body.status });
      const _order = await Order.findById(req.params.id);
      const Cart = _order?.Cart;
      if (req.body.status === 'Cancel')
        Cart?.forEach((item: any) => {
          return cancleOrder(item._id, item.quantity, item.Sold, item.Stocks);
        });

      res.json('Updated');
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

const sold = async (id: any, quantity: any, oldsold: any, Stocks: any) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      Sold: quantity + oldsold,
      Stocks: Stocks - quantity,
    }
  );
};

const cancleOrder = async (
  id: any,
  quantity: any,
  oldsold: any,
  Stocks: any
) => {
  await Product.findOneAndUpdate(
    { _id: id },
    {
      Sold: oldsold - quantity,
      Stocks: Stocks + quantity,
    }
  );
};
module.exports = OrderController;

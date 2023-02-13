import { Request, Response } from 'express';
import Product from '../models/ProductModel';

const ProductController = {
  //Lấy danh sách sản phẩm
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },

  //Tạo sản phẩm
  addProduct: async (req: Request, res: Response) => {
    try {
      const newProduct = new Product({
        Name: req.body.Name,
        Description: req.body.Description,
        Price: req.body.Price,
        Sock: req.body.Sock,
        image: req.body.image,
        images: req.body.images,
        Brand: req.body.Brand,
        Category: req.body.Category,
      });

      await newProduct.save();

      res.json({ newProduct });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },

  //Xóa sản phẩm

  deleteProduct: async (req: Request, res: Response) => {
    try {
      await Product.findByIdAndRemove(req.params.id);

      res.json('Product Deleted.');
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
module.exports = ProductController;

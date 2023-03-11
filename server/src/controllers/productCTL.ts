import { Request, Response } from 'express';
import Product from '../models/ProductModel';

const ProductController = {
  //Lấy danh sách sản phẩm
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      return res.status(200).json(products);
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
      console.log(req.body);
      const newProduct = new Product({
        Name: req.body.Name,
        Description: req.body.Description,
        Short_Description: req.body.Short_Description,
        Price: req.body.Price,
        Stocks: req.body.Stocks,
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

  //Cập nhật sản phẩm
  updateProduct: async (req: Request, res: Response) => {
    try {
      //Lấy sản trên db
      const product = await Product.findById(req.params.id);

      //Kiểm tra sản phẩm có tồn tại không
      if (!product)
        return res.status(400).json({ msg: 'Products not exists.' });

      // ***Kiểm tra hình ảnh có tồn tại không
      product.Name = req.body.Name;
      product.Description = req.body.Description;
      product.Category = req.body.Category;
      product.Brand = req.body.Brand;
      product.images = req.body.images;
      product.Price = req.body.Price;
      product.Stocks = req.body.Socks;

      await product.save();
      res.status(200).json('Product Updated');
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

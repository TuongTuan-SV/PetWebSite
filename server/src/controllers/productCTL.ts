import { Request, Response } from 'express';
import Product from '../models/ProductModel';

class APIfeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    console.log(this.queryString);
    const queryObj = { ...this.queryString }; // queryString = req.query
    // console.log(queryObj)

    const exculedFields = ['page', 'sort', 'limit'];

    exculedFields.forEach((el) => delete queryObj[el]);

    // console.log({after : queryObj})

    let querySTR = JSON.stringify(queryObj);

    // gte = greater than or equal
    // gt = greater than
    // lte = less than or equal
    // lt = less than
    querySTR = querySTR.replace(
      /\b(gte|gt|lt|lte|regex|all)\b/g,
      (match) => '$' + match
    );
    // querySTR = querySTR.replace(/['"]+/g, '');
    // console.log(querySTR);
    this.query.find(JSON.parse(querySTR));

    return this;
  }
  sortting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      console.log(sortBy);

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }
  // paginating() {
  //   const page = this.queryString.page * 1 || 1;

  //   // limit how many result show
  //   const limit = this.queryString.limit * 1 || 9;
  //   const skip = (page - 1) * limit;

  //   this.query = this.query.skip(skip).limit(limit);

  //   return this;
  // }
}
const ProductController = {
  //Lấy danh sách sản phẩm
  getProducts: async (req: any, res: Response) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sortting();
      const products = await features.query;
      // const find = Product.find({Category:});
      // console.log(req.query);
      res.json({
        status: 'success',
        result: products.length,
        products: products,
      });
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
        Name_Lower: req.body.Name.tolowecase(),
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
      product.Name_Lower = req.body.Name;
      product.Description = req.body.Description;
      product.Category = req.body.Category;
      product.Brand = req.body.Brand;
      product.images = req.body.images;
      product.Price = req.body.Price;
      product.Stocks = req.body.Socks;
      product.reviews = req.body.reviews;
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

  //Cập nhật review
  addReview: async (req: any, res: any) => {
    try {
      const { reivew } = req.body;
      const product = await Product.findById(req.params.id);
      const user = product?.reviews?.find((item: any) => {
        if (item.userid === reivew.userid) return item;
      });
      if (user) {
        return res.json('User have commented');
      } else {
        product?.reviews?.push(reivew);
        await product?.save();
        return res.json({ msg: 'Review Added' });
      }
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

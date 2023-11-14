import { Request, Response } from 'express';
import Brand from '../models/BrandModel';

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

class APIfeatures {
  query: any;
  queryString: any;
  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    // console.log(this.queryString);
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

      // console.log(sortBy);

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

const BrandController = {
  //Lấy tất cả brands từ db
  getBrands: async (req: Request, res: Response) => {
    try {
      const features = new APIfeatures(Brand.find(), req.query)
        .filtering()
        .sortting();
      const brands = await features.query;
      // const find = Product.find({Blog:});
      // console.log(req.query);
      return res.json({
        status: 'success',
        result: brands.length,
        brands: brands,
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
  //Tạo brand mới
  createBrand: async (req: Request, res: Response) => {
    try {
      const NewBrand = new Brand({
        Name: req.body.Name.toLowerCase(),
        image: req.body.image,
      });
      await cloudinary.v2.api.create_folder(`brands/${req.body.Name}`);
      // .then((result: any) => {
      //   return console.log(result);
      // });
      await NewBrand.save();

      return res.status(200).json('Brand Create Success.');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  deleteBrand: async (req: any, res: any) => {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.json('Brand deleted');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  updateBrand: async (req: any, res: any) => {
    try {
      const { Name, image } = req.body;
      const name = Name.toLowerCase();
      await Brand.findByIdAndUpdate(
        { _id: req.params.id },
        { Name: name, image }
      );

      res.json({ msg: 'Brand Updated' });
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

module.exports = BrandController;

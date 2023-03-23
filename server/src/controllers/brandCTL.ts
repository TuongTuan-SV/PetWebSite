import { Request, Response } from 'express';
import Brand from '../models/BrandModel';

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

const BrandController = {
  //Lấy tất cả brands từ db
  getBrands: async (req: Request, res: Response) => {
    try {
      const brands = await Brand.find();
      return res.status(200).json({ brands });
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
        Name: req.body.Name,
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
      const { Name } = req.body;

      await Brand.findByIdAndUpdate({ _id: req.params.id }, { Name });

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

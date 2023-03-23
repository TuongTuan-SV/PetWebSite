import { Request, Response } from 'express';
import Category from '../models/CategoryModel';

const CategoryController = {
  //Lấy tất cả brands từ db
  getCategory: async (req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      return res.status(200).json({ categories });
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
  createCategory: async (req: Request, res: Response) => {
    try {
      const NewCategory = new Category({
        Name: req.body.Name,
      });

      await NewCategory.save();

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
  deleteCategory: async (req: any, res: any) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json('Category deleted');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  updateCategory: async (req: any, res: any) => {
    try {
      const { Name } = req.body;
      console.log(req.body);
      await Category.findByIdAndUpdate({ _id: req.params.id }, { Name });

      res.json({ msg: 'Category Updated' });
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

module.exports = CategoryController;

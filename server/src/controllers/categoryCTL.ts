import { Request, Response } from 'express';
import Category from '../models/CategoryModel';

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
const CategoryController = {
  //Lấy tất cả brands từ db
  getCategory: async (req: Request, res: Response) => {
    try {
      const features = new APIfeatures(Category.find(), req.query)
        .filtering()
        .sortting();
      const categories = await features.query;
      // const find = Product.find({Category:});
      // console.log(req.query);
      return res.json({
        status: 'success',
        result: categories.length,
        category: categories,
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
  createCategory: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const NewCategory = new Category({
        Name: req.body.Name,
        Name_lower: req.body.Name.toLowerCase(),
        image: req.body.image,
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
      console.log(req.body);
      const { Name, image } = req.body;
      const Name_lower = Name.toLowerCase();
      await Category.findByIdAndUpdate(
        { _id: req.params.id },
        { Name, image, Name_lower }
      );

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

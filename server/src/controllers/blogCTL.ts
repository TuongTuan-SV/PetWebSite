import { Request, Response } from 'express';
import Blog from '../models/BlogModel';

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
export const BlogController = {
  //Lấy tất cả brands từ db
  getBlog: async (req: Request, res: Response) => {
    try {
      const features = new APIfeatures(Blog.find(), req.query)
        .filtering()
        .sortting();
      const Blogs = await features.query;
      // const find = Product.find({Blog:});
      // console.log(req.query);
      return res.json({
        status: 'success',
        result: Blogs.length,
        Blog: Blogs,
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
  createBlog: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const NewBlog = new Blog({
        Title: req.body.Title,
        Title_Lower: req.body.Title.toLowerCase(),
        image: req.body.img,
        Description: req.body.Description,
        Poster: req.body.Poster.toLowerCase(),
      });

      await NewBlog.save();

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
  deleteBlog: async (req: any, res: any) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.json('Blog deleted');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  updateBlog: async (req: any, res: any) => {
    try {
      await Blog.findByIdAndUpdate(
        { _id: req.params.id },
        {
          Title: req.body.Title,
          Title_Lower: req.body.Title.toLowerCase(),
          image: req.body.img,
          Description: req.body.Description,
          Poster: req.body.Poster.toLowerCase(),
        }
      );

      res.json({ msg: 'Blog Updated' });
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
      const blog = await Blog.findById(req.params.id);
      const user = blog?.reviews?.find((item: any) => {
        if (item.userid === reivew.userid) return item;
      });
      if (user) {
        return res.json('User have commented');
      } else {
        blog?.reviews?.push(reivew);
        await blog?.save();
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

module.exports = BlogController;

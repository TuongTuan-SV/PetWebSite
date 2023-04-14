import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  Name: string;
  Name_lower: string;
  image: object;
}

const CategorySchema = new Schema<ICategory>(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Name_lower: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: [],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

import mongoose, { Schema } from 'mongoose';

export interface ICategory {
  Name: String;
}

const CategorySchema = new Schema<ICategory>(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

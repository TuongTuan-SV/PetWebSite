import mongoose, { Schema } from 'mongoose';

export interface IBrand {
  Name: String;
}

const BrandSchema = new Schema<IBrand>(
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

const Brand = mongoose.model<IBrand>('Brand', BrandSchema);

export default Brand;

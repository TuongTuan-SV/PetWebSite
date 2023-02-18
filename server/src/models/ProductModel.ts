import mongoose, { Schema } from 'mongoose';

interface Ireview {
  Username: string;
  comment: string;
  rating: number;
}

const reviewSchema = new Schema<Ireview>(
  {
    Username: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

interface Iproduct {
  Name: string;
  Description: string;
  Price: number;
  Socks: number;
  Brand: string;
  Category: string;
  image: string;
  images?: Array<[object]>;
  reviews?: Array<[Ireview]>;
}

const ProductSchema = new Schema<Iproduct>(
  {
    Name: {
      type: String,
      require: true,
      max: 100,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
    Category: {
      type: String,
      require: true,
    },
    Brand: {
      type: String,
      require: true,
    },
    Price: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
    },
    Socks: {
      type: Number,
      require: true,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<Iproduct>('Product', ProductSchema);

export default Product;

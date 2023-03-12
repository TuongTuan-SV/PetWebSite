import mongoose, { Schema } from 'mongoose';

interface Ireview {
  Username: string;
  userid: string;
  comment: string;
  rating: number;
}

const reviewSchema = new Schema<Ireview>(
  {
    Username: { type: String, required: true },
    userid: { type: String, required: true },
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
  Short_Description: string;
  Price: number;
  Stocks: number;
  Brand: string;
  Category: string;
  images?: Array<[object]>;
  reviews?: Array<[Ireview]>;
  Sold: number;
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
    Short_Description: {
      type: String,
      required: true,
      trim: true,
      max: 200,
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
    // image: {
    //   type: Object,
    //   required: true,
    // },
    images: {
      type: Array,
    },
    Stocks: {
      type: Number,
      require: true,
    },
    reviews: [reviewSchema],
    Sold: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model<Iproduct>('Product', ProductSchema);

export default Product;

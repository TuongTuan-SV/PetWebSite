import mongoose, { Schema } from 'mongoose';

interface Ireview {
  Username: string;
  userid: string;
  comment: string;
}

const reviewSchema = new Schema<Ireview>(
  {
    Username: { type: String, required: true },
    userid: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

interface IBlog {
  Title: string;
  Title_Lower: string;
  Poster: string;
  Description?: Array<[object]>;
  image: {
    public_id?: string;
    url?: string;
  };
  reviews?: Array<[Ireview]>;
  //   Short_Description: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    Title: {
      type: String,
      require: true,
      max: 100,
    },
    Title_Lower: {
      type: String,
      require: true,
      max: 100,
      loadClass: true,
    },
    Poster: {
      type: String,
      require: true,
      max: 100,
      trim: true,
    },
    Description: {
      type: Array,
      required: true,
      default: [],
    },
    // Short_Description: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   max: 200,
    // },
    image: {
      type: {},
    },

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;

import mongoose, { Schema } from 'mongoose';

export interface ICarousel {
  image: object;
  title: string;
  content: string;
  special: string;
}

const CarouselModel = new Schema<ICarousel>(
  {
    image: {
      type: [],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    special: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Carousel = mongoose.model<ICarousel>('Carousel', CarouselModel);

export default Carousel;

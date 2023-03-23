import mongoose, { Schema } from 'mongoose';

export interface ICarousel {
  image: object;
}

const CarouselModel = new Schema<ICarousel>(
  {
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

const Carousel = mongoose.model<ICarousel>('Carousel', CarouselModel);

export default Carousel;

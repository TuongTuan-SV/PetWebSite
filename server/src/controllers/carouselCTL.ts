import Carousel from '../models/CarouselModel';
const CarouselController = {
  getCarousel: async (req: any, res: any) => {
    try {
      const carousel = await Carousel.find();
      // console.log(carousel);
      return res.status(200).json({ carousel });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  addCarousel: async (req: any, res: any) => {
    try {
      const newCarousel = new Carousel({
        image: req.body.image,
      });
      console.log(newCarousel);
      await newCarousel.save();
      return res.json(newCarousel);
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

module.exports = CarouselController;

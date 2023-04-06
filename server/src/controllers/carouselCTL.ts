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
        title: req.body.title,
        content: req.body.content,
        special: req.body.special,
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
  deleteCarousel: async (req: any, res: any) => {
    try {
      await Carousel.findByIdAndRemove(req.params.id);

      res.json('Product Deleted.');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  //Cập nhật sản phẩm
  updateProduct: async (req: any, res: any) => {
    try {
      //Lấy sản trên db
      const carousel = await Carousel.findById(req.params.id);

      //Kiểm tra sản phẩm có tồn tại không
      if (!carousel)
        return res.status(400).json({ msg: 'Products not exists.' });

      // ***Kiểm tra hình ảnh có tồn tại không
      carousel.title = req.body.title;
      carousel.content = req.body.content;
      carousel.special = req.body.special;
      carousel.image = req.body.images;

      await carousel.save();
      res.status(200).json('Product Updated');
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

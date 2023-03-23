import { Request, Response } from 'express';

import User from '../models/UserModel';
import Order from '../models/OrderModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserController = {
  //Đăng nhập
  login: async (req: any, res: Response) => {
    try {
      const { email, password } = req.body;

      // Kiểm tra có tài khoản nào có tên tài khoản đó ko
      const user = await User.findOne({ email });

      //Không có thì trả về status 400 và thông báo tài khoản không tồn tại
      if (!user) return res.status(400).json({ msg: 'User not exists. ' });

      // Nếu tài khoản tồn tại thì kiểm tra mật khẩu không đúng thì trả về status 400 và thông báo mật khẩu không đúng
      const Match = await bcrypt.compare(password, user.password);

      // console.log(Match, user.password, password);
      if (!Match)
        return res.status(400).json({ msg: 'Password not correct. ' });
      //tạo json web token
      const accesstoken = createAccessToken({ _id: user.id });
      const refreshtoken = createRefreshToken({ _id: user.id });
      // console.log({ accesstoken, refreshtoken });

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 900000000),
      });
      // console.log(accesstoken);
      //Xóa mật khẩu khi trả về front end ****(cần sửa lại sao cho xóa psw thay thì vì thay đổi giá trị)
      user.password = ' ';
      res.json({ user, accesstoken });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: ' err.message' });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  //Đăng Xuất
  logout: async (req: any, res: any) => {
    try {
      res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Logged out' });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  // Tạo tài khoản
  register: async (req: Request, res: Response) => {
    try {
      //Lấy thông tin từ form đăng ký
      const { email, FirstName, LastName, avatar, password } = req.body;
      //kiểm tra email đã tồn tại chưa
      const user = await User.findOne({ email });

      //Nếu tồn tại thông tại email đã có tài khoản dùng email đó
      if (user) return res.status(400).json({ msg: 'Email alredy exists.' });

      //Kiểm tra mât khẩu có 1 chữ thường, 1 chữ hoa, 1 số với 1 ký tự đặc biệt không
      var decimal =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
      if (!password.match(decimal))
        return res.status(400).json({
          msg: 'password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. ',
        });

      //Mã hóa mật khẩu
      const pswHash = await bcrypt.hash(password, 10);

      //Tạo object User mới
      const newuser = new User({
        FirstName,
        LastName,
        email,
        avatar,
        password: pswHash,
        role: 0,
      });

      // Lưu user lên db
      await newuser.save();

      res.json('Create Success.');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  // Xóa tài khoản
  delete: async (req: Request, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.json({ msg: 'User Deleted.' });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  //Cập thông tin tài khoản
  update: async (req: Request, res: Response) => {
    try {
      const { email, FirstName, LastName, password } = req.body;

      const newuser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        { email, FirstName, LastName, password }
      );

      res.json({ msg: 'User Updated.' });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  refreshToken: (req: any, res: any) => {
    try {
      const rf_token = req.cookies['refreshtoken'];

      if (!rf_token)
        return res
          .status(400)
          .json({ msg: 'Please Login or Regist a new Account' });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET!,
        (err: any, user: any) => {
          if (err)
            return res
              .status(400)
              .json({ msg: 'Please Login or Regist a new Account' });

          const accesstoken = createAccessToken({ _id: user._id });

          res.json({ accesstoken });
        }
      );
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: 'helloword' });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  //Xem thông tin cá nhân
  info: async (req: any, res: any) => {
    try {
      const user = await User.findById(req.user._id).select('-password');

      //Không có thì trả về status 400 và thông báo tài khoản không tồn tại
      if (!user) return res.status(400).json({ msg: 'User not exists. ' });

      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  adminGetAllUser: async (req: any, res: any) => {
    try {
      const user = await User.find();

      return res.json(user);
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  //ADD PRODUCT TO CART
  addCart: async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) return res.status(400).json({ msg: 'User not exists' });

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          cart: req.body.cart,
        }
      );
      // console.log(req.body);
      return res.json({ msg: 'Add to cart' });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  gethistory: async (req: any, res: any) => {
    try {
      const history = await Order.find({ user_id: req.user.id });

      res.json(history);
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  checkUser: async (req: any, res: any) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email }).select('email');
      if (!user) return res.json({ msg: 'Email not exist!' });

      return res.json({ user: user });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        return res.status(500).json({ msg: err.message });
      } else {
        console.log('Unexpected error', err);
      }
    }
  },
  changePassword: async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      //Mã hóa mật khẩu
      const pswHash = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { email },
        {
          password: pswHash,
        }
      );

      return res.json({ msg: 'Password have been change' });
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

const createAccessToken = (user: any) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '2d' });
};

const createRefreshToken = (user: any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
module.exports = UserController;

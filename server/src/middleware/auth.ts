import jwt from 'jsonwebtoken';

const auth = async (req: any, res: any, next: any) => {
  try {
    // Lấy jwt từ header
    const token = req.header('Authorization');
    //Kiểm tra token có tồn tại không
    if (!token) return res.status(400).json({ msg: 'Access Denied.' });

    //Xác thực token
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: any, user: any) => {
        //Không hợp lệ
        if (err) return res.status(400).json({ msg: 'Invalid Authorization' });

        //Hợp lệ
        req.user = user;
        next();
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      return res.status(500).json({ msg: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
};

module.exports = auth;

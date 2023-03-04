import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');
//Upload image to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

export interface MulterFile {
  key: string; // Available using `S3`.
  path: string; // Available using `DiskStorage`.
  mimetype: string;
  originalname: string;
  size: number;
}
// Only Admin can Upload, Delete, Update
//Upload Image

router.post('/upload', (req: Request, res: Response) => {
  try {
    console.log(req.files?.brand);
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'No files were uploaded.' });

    const file = req.files?.file as UploadedFile;
    console.log(req.body);
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Size too large' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'File format is incorrect.' });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: `brands/${req.body.brands}` },
      async (err: any, result: { public_id: any; secure_url: any }) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
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
});

//Delete Image

router.post('/destroy', (req: Request, res: Response) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: 'No image Selected' });

    cloudinary.v2.uploader.destroy(public_id, async (err: any, result: any) => {
      if (err) throw err;

      res.json({ msg: 'Delete Success!' });
    });
  } catch (err) {
    if (err instanceof Error) {
      // ✅ TypeScript knows err is Error
      return res.status(500).json({ msg: err.message });
    } else {
      console.log('Unexpected error', err);
    }
  }
});

// xóa file tạm trong bộ nhớ
const removeTmp = (path: string) => {
  fs.unlink(path, (err: any) => {
    if (err) throw err;
  });
};

module.exports = router;

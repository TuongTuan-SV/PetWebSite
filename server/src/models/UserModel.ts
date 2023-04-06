import mongoose, { Schema } from 'mongoose';

export interface IUser {
  FirstName: string;
  LastName?: string;
  email: string;
  avatar?: string;
  password: string;
  role: string;
  cart?: Array<[object]>;
}

const UserSchema = new Schema<IUser>(
  {
    FirstName: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 50,
    },
    LastName: {
      type: String,
      trim: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    role: {
      type: String,
      default: '0',
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

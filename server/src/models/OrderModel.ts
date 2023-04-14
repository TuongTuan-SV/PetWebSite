import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  FirstName: string;
  LastName: string;
  Address: string;
  Provice: string;
  District: string;
  Ward: string;
  Cart?: Array<[object]>;
  PaymentMethod: number;
  OrderNote: string;
  Status: string;
  Total: number;
}

const OrderSchema = new Schema<IOrder>(
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
    Address: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    Provice: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    District: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    Ward: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    Cart: {
      type: Array,
      default: [],
    },
    OrderNote: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 500,
    },
    PaymentMethod: {
      type: Number,
    },
    Status: {
      type: String,
      default: 'Pending',
    },
    Total: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;

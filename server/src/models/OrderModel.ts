import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  FirstName: string;
  LastName: string;
  Address: string;
  Country: string;
  City: string;
  PostalCode: number;
  Cart?: Array<[object]>;
  PaymentMethod: number;
  Status: boolean;
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
    Country: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    City: {
      type: String,
      require: true,
      trim: true,
      min: 2,
      max: 100,
    },
    PostalCode: {
      type: Number,
      require: true,
      trim: true,
    },
    Cart: {
      type: Array,
      default: [],
    },
    PaymentMethod: {
      type: Number,
    },
    Status: {
      type: Boolean,
      default: false,
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

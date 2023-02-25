import { createSlice } from '@reduxjs/toolkit';

export interface IProduct {
  products: Array<object>;
}

const initialState: IProduct = {
  products: [],
};
export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;

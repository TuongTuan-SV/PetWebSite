import { createSlice } from '@reduxjs/toolkit';

export interface IProduct {
  product: Array<object>;
}

const initialState: IProduct = {
  product: [],
};
export const productSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    getProduct: (state, action) => {
      state.product = action.payload.products;
    },
  },
});

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;

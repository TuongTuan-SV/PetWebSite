import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import brandSlice from './slices/brandSlice';
import categorySilce from './slices/categorySilce';
import uploadSilce from './slices/uploadSilce';
import orderSlice from './slices/orderSlice';
import carouselSlice from './slices/carouselSlice';
export const store = configureStore({
  reducer: {
    User: userSlice,
    Brands: brandSlice,
    Products: productSlice,
    Categories: categorySilce,
    Upload: uploadSilce,
    Order: orderSlice,
    Carousel: carouselSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

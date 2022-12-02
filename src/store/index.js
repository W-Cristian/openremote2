import { configureStore } from '@reduxjs/toolkit';
import assetSlice from './asset-slice';
import uiSlice from './logIn-slice';


const store = configureStore({
  reducer: { logIn: uiSlice.reducer,
  asset: assetSlice.reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(  {
    serializableCheck: false
  }),
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";

import { userApi } from "./slices/userSlice";

import { credentialApi } from "./slices/credentialSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [credentialApi.reducerPath]: credentialApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, credentialApi.middleware),

  devTools: true,
});

export default store;

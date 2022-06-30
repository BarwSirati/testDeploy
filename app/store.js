import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../hooks/api/auth/authSlice";
import { usersApi } from "../hooks/api/users/usersSlice";
import { userApi } from "../hooks/api/user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

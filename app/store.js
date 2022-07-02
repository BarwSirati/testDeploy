import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../hooks/api/auth/authSlice";
import { questionApi } from "../hooks/api/question/questionSlice";
import { userApi } from "../hooks/api/user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, questionApi.middleware),
});

setupListeners(store.dispatch);

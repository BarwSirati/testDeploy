import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../hooks/api/auth/authSlice";
import { questionApi } from "../hooks/api/question/questionSlice";
import { userApi } from "../hooks/api/user/userSlice";
import { compileApi } from "../hooks/api/submit/compileSlice";
import { submitApi } from "../hooks/api/submit/submitSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [compileApi.reducerPath]: compileApi.reducer,
    [submitApi.reducerPath]: submitApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      questionApi.middleware,
      compileApi.middleware,
      submitApi.middleware
    ),
});

setupListeners(store.dispatch);

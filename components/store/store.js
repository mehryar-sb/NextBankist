import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: { users: usersSlice.reducer },
});
export const usersActions = usersSlice.actions;
export default store;

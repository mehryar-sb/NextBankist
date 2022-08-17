import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  currentUser: null,
  deletedAccount: null,
  existCurrent: false,
  loading: false,
  sort: false,
};

const usersSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    transferMoney(state, action) {
      state.users = action.payload.users;
      state.users.forEach((user) => {
        if (user.username === state.currentUser.username) {
          state.currentUser.movements.push(-action.payload.entry.amount);
          state.currentUser.dates.push(action.payload.entry.date);
        }
      });
    },
    requestLoan(state, action) {
      state.users = action.payload.users;
      state.users.forEach((user) => {
        if (user.username === state.currentUser.username) {
          state.currentUser.movements.push(action.payload.entry.amount);
          state.currentUser.dates.push(action.payload.entry.date);
        }
      });
    },
    logoutHandler(state) {
      state.currentUser = null;
    },
    closeAccount(state, action) {
      state.users = action.payload.users;
      state.users.forEach((user, i) => {
        if (
          user.username === action.payload.closedUser &&
          user.pin === action.payload.pin
        ) {
          state.currentUser = null;
        }
      });
    },

    loader(state, action) {
      state.loading = action.payload;
    },
    sortMovements(state) {
      state.sort = !state.sort;
      const sorted = state.currentUser.movements.sort((a, b) => {
        if (state.sort) return a - b;
        else return b - a;
      });
      state.currentUser.movements = sorted;
    },
    endCount(state) {
      state.currentUser = null;
    },
  },
});
export default usersSlice;

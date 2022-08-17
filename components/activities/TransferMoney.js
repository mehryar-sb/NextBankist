import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createCurrentTime } from "./../mangeDate/CurrentTime";
import { usersActions } from "./../store/store";

const postToCurrent = async (entry) => {
  return axios.patch(`http://localhost:7500/users/${entry[1].id}`, {
    movements: [...entry[1].movements, -entry[0].amount],
    dates: [...entry[1].dates, entry[0].date],
  });
};

const postToTransfer = async (entry) => {
  return axios.patch(`http://localhost:7500/users/${entry[1].id}`, {
    movements: [...entry[1].movements, entry[0].amount],
    dates: [...entry[1].dates, entry[0].date],
  });
};

const TransferMoney = () => {
  const { data: users } = useQuery(["users"]);
  const { mutate: mutateCurrent } = useMutation(postToCurrent);
  const { mutate: mutateTransfer } = useMutation(postToTransfer);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      amount: "",
    },
    onSubmit: (values) => {
      if (values.username === currentUser.username || +values.amount <= 0) {
        formik.resetForm();
        return;
      }
      const entry = {
        username: values.username,
        amount: +values.amount,
        date: createCurrentTime("condin"),
      };
      dispatch(usersActions.transferMoney({ entry, users }));

      mutateCurrent([entry, currentUser]);
      mutateTransfer([
        entry,
        users.find((user) => user.username === values.username),
      ]);

      formik.resetForm();
    },
  });

  return (
    <div className="w-full bg-gradient-to-tl px-10 py-5 from-[#ffb003] to-[#ffcb03] rounded-xl h-[150px]">
      <h4>Transfer money</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-between gap-3 mt-3">
        <div className="flex flex-col items-center gap-1">
          <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className=" activity-form"
            autoComplete="off"
            type="text"
          />
          <label className="text-sm font-semibold" htmlFor="">
            Transfer To
          </label>
        </div>
        <div className="flex flex-col items-center gap-1">
          <input
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
            className="activity-form"
            autoComplete="off"
            type="text"
          />
          <label className="text-sm font-semibold" htmlFor="">
            Amount
          </label>
        </div>
        <button
          type="submit"
          className="flex justify-center px-4 py-1 text-xl bg-white rounded-lg place-self-start">
          <BsArrowRight></BsArrowRight>
        </button>
      </form>
    </div>
  );
};

export default TransferMoney;

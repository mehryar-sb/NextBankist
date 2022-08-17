import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createCurrentTime } from "../mangeDate/CurrentTime";
import { usersActions } from "./../store/store";

const patchUser = async function (entry) {
  return axios.patch(`http://localhost:7500/users/${entry[1].id}`, {
    movements: [...entry[1].movements, entry[0].amount],
    dates: [...entry[1].dates, entry[0].date],
  });
};

const RequestLoan = () => {
  const { mutate, isLoading } = useMutation(patchUser);
  const { data: users } = useQuery(["users"]);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      loan: "",
    },
    onSubmit: (values) => {
      if (values.loan === "") return;
      const entry = {
        amount: +values.loan,
        date: createCurrentTime("condin"),
      };

      dispatch(usersActions.loader(!isLoading));
      const timer = setTimeout(() => {
        dispatch(usersActions.requestLoan({ entry, users }));
        mutate([entry, currentUser]);

        dispatch(usersActions.loader(isLoading));
        formik.resetForm();
      }, 5000);

      return () => clearTimeout(timer);
    },
  });

  return (
    <div className="w-full  bg-gradient-to-tl px-10 py-5 from-[#39b385] to-[#9be15d] rounded-xl h-[150px]">
      <h4>Request loan</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="flex items-center justify-start gap-3 mt-3">
        <div className="flex flex-col items-center w-4/12 gap-1">
          <input
            id="loan"
            name="loan"
            onChange={formik.handleChange}
            value={formik.values.loan}
            className=" activity-form"
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

export default RequestLoan;

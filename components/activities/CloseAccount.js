import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "./../store/store";

const closeAccount = async (entry) => {
  return axios.delete(`http://localhost:7500/users/${entry.id}`);
};

const CloseAccount = () => {
  const { mutate } = useMutation(closeAccount);
  const { data: users } = useQuery(["users"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [deletedMessage, setDeletedMessage] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      pin: "",
    },
    onSubmit: (values) => {
      const entry = {
        closedUser: values.username,
        pin: +values.pin,
        users,
      };
      setDeletedMessage(true);
      dispatch(usersActions.loader(true));

      const timer = setTimeout(() => {
        dispatch(usersActions.loader(false));
        dispatch(usersActions.closeAccount(entry));
        mutate(users.find((user) => user.username === entry.closedUser));
        router.push("/");
      }, 5000);
      formik.resetForm();
      return () => clearTimeout(timer);
    },
  });

  return (
    <div className="w-full  bg-gradient-to-tl px-10 py-5 from-[#e52a5a] to-[#ff585f] rounded-xl h-[150px]">
      <h4>Close account</h4>
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
            Username
          </label>
        </div>
        <div className="flex flex-col items-center gap-1">
          <input
            id="pin"
            name="pin"
            onChange={formik.handleChange}
            value={formik.values.pin}
            className="activity-form"
            autoComplete="off"
            type="text"
          />
          <label className="text-sm font-semibold" htmlFor="">
            Confirm PIN
          </label>
        </div>
        <button
          type="submit"
          className="flex justify-center px-4 py-1 text-xl bg-white rounded-lg place-self-start">
          <BsArrowRight></BsArrowRight>
        </button>
      </form>
      {deletedMessage && (
        <motion.p className="text-base font-medium text-green-700 ">
          your account is deleted now!
        </motion.p>
      )}
    </div>
  );
};

export default CloseAccount;

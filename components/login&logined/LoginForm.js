import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "./../store/store";

const getUsers = async () => {
  const res = await axios.get(`http://localhost:7500/users`);
  return res.data;
};
const LoginForm = () => {
  const { data: users } = useQuery(["users"], getUsers);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      user: "",
      pin: "",
    },
    onSubmit: (values) => {
      users.forEach((user) => {
        if (user.username === values.user && user.pin === +values.pin) {
          setError(false);
          dispatch(usersActions.setCurrentUser(user));
          router.push(`/homepage`);
        } else setError(true);
      });
      formik.resetForm();
    },
  });

  return (
    <div className="flex justify-end ">
      {!currentUser && (
        <div className="flex flex-col w-8/12">
          <form
            key="form"
            onSubmit={formik.handleSubmit}
            action=""
            className="flex items-center justify-end w-full gap-4 ">
            <motion.input
              id="user"
              name="user"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.user}
              placeholder="User"
              autoComplete="off"
              className="login-form"
            />
            <motion.input
              id="pin"
              name="pin"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.pin}
              placeholder="PIN"
              autoComplete="off"
              className="login-form"
            />
            <button type="submit">
              <FaArrowRight className="icon"></FaArrowRight>
            </button>
          </form>

          {error && (
            <p className="text-base font-medium text-red-700 ">
              your account is not exist!
            </p>
          )}
        </div>
      )}

      {currentUser && (
        <button
          onClick={() => {
            dispatch(usersActions.logoutHandler());
            router.push(`/`);
          }}>
          <FiLogOut className="text-3xl icon"></FiLogOut>
        </button>
      )}
    </div>
  );
};

export default LoginForm;

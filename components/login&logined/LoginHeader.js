import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

const LoginHeader = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.3 }}
      className="w-full h-[80px]   flex items-center px-10   justify-between ">
      <h3>
        {currentUser ? `Welcome ${currentUser.owner}` : "Login to get Started"}
      </h3>
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-[40px] left-1/2">
        <Image src="/images/logo.png" alt="logo" width={50} height={50}></Image>
      </div>
      <LoginForm></LoginForm>
    </motion.header>
  );
};

export default LoginHeader;

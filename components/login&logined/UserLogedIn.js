import { motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import AllActivities from "../activities/AllActivities";
import Details from "../details/Details";
import CurrentTime from "../mangeDate/CurrentTime";
import MovmentsList from "../movements/MovmentsList";
import Loading from "./../details/Loading";
import { useRouter } from "next/router";
const UserLogedIn = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const loader = useSelector((state) => state.users.loading);
  const router = useRouter();

  if (!currentUser) {
    router.push("/");
    return;
  }
  const sum = currentUser.movements.reduce((cur, mov) => cur + mov);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
        type: "tween",
      }}
      className="w-8/12 mx-auto mt-10  h-[100vh] flex flex-col gap-2">
      <div className="grid w-full grid-cols-2">
        <h2>Current Balance</h2>
        <h1 className="place-self-end">${sum}</h1>
        <CurrentTime></CurrentTime>
      </div>
      <div className="flex w-full gap-5 ">
        <MovmentsList></MovmentsList>
        <AllActivities></AllActivities>
      </div>
      <Details></Details>
      {loader && <Loading></Loading>}
    </motion.section>
  );
};

export default UserLogedIn;

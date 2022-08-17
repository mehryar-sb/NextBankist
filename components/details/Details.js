import React from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "./../store/store";
import CountDown from "./CountDown";
const Details = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const sumDep = currentUser.movements
    .filter((mov) => mov > 0)
    .reduce((cur, mov) => cur + mov);

  const sumWith = Math.abs(
    currentUser.movements
      .filter((mov) => mov < 0)
      .reduce((cur, mov) => cur + mov),
  );

  return (
    <div className=" w-full gap-10 text-[#444] flex justify-between">
      <div className="flex items-center justify-between w-7/12 ">
        <div className="flex gap-5">
          <h5>
            In <span className="text-2xl text-green-600">${sumDep}</span>
          </h5>
          <h5>
            out <span className="text-2xl text-red-600">${sumWith}</span>
          </h5>
        </div>
        <button
          onClick={() => dispatch(usersActions.sortMovements())}
          className="flex items-center text-xl font-semibold">
          <BiSortAlt2></BiSortAlt2>sort
        </button>
      </div>
      <CountDown></CountDown>
    </div>
  );
};

export default Details;

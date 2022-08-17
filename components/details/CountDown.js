import React from "react";
import Countdown, { zeroPad, CountdownApi } from "react-countdown";
import { useDispatch, useSelector } from "react-redux";
import { usersActions } from "./../store/store";

const renderer = ({ minutes, seconds, completed }) => {
  if (completed) {
    return <p>The End</p>;
  } else {
    return (
      <span className="text-lg ">
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  }
};

const CountDown = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  if (currentUser) CountdownApi && CountdownApi.start();
  return (
    <div className="font-semibold">
      <span className="mr-2">You will be logged out in</span>
      <Countdown
        date={Date.now() + 100000}
        renderer={renderer}
        onComplete={() => dispatch(usersActions.endCount())}></Countdown>
    </div>
  );
};

export default CountDown;

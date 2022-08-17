import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import MovementItem from "./MovementItem";
const MovmentsList = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  if (!currentUser) return <p>please login</p>;
  return (
    <Scrollbars
      style={{
        width: "58.333333%",
        height: "450px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}>
      {currentUser.movements.map((mov, i, arr) => {
        return (
          <MovementItem
            key={i}
            order={arr.length - i}
            date={currentUser.dates[currentUser.dates.length - i - 1]}
            movement={arr[arr.length - i - 1]}></MovementItem>
        );
      })}
    </Scrollbars>
  );
};

export default MovmentsList;

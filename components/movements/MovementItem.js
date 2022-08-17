import React from "react";

const MovementItem = (props) => {
  const { order, movement, date } = props;
  const absMovements = Math.abs(movement);
  const customDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const depOrWith = movement > 0 ? "deposite" : "withdrawal";
  return (
    <li className="w-full h-[65px] border-b border-[#eee] px-5 flex items-center justify-between">
      <div className="flex items-center h-full gap-5 ">
        <div
          className={`text-xs px-2 py-1 font-semibold ${depOrWith} text-white rounded-xl`}>
          {`${order} ${depOrWith.toUpperCase()}`}
        </div>
        <div className="text-[#666] text-lg">{customDate}</div>
      </div>

      <div className="text-[#444] text-2xl">{`$${absMovements}`}</div>
    </li>
  );
};

export default MovementItem;

import React from "react";
import CloseAccount from "./CloseAccount";
import RequestLoan from "./RequestLoan";
import TransferMoney from "./TransferMoney";

const AllActivities = () => {
  return (
    <div className="w-5/12 h-[450px]  flex flex-col items-center gap-3">
      <TransferMoney></TransferMoney>
      <RequestLoan></RequestLoan>
      <CloseAccount></CloseAccount>
    </div>
  );
};

export default AllActivities;

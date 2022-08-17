import React, { useEffect, useState } from "react";

export const createCurrentTime = function (condin = "") {
  if (condin) {
    return new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "numeric",
      year: "numeric",
    });
  } else
    return new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      second: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
    });
};

const CurrentTime = () => {
  const [curTime, setCurTime] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(createCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [curTime]);

  return <h5 className="text-[#888]">{curTime}</h5>;
};

export default CurrentTime;

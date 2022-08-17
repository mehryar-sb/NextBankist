import React, { Fragment, useContext } from "react";
import LoginHeader from "../../components/login&logined/LoginHeader";
import UserLogedIn from "../../components/login&logined/UserLogedIn";
import { useSelector } from "react-redux";
const Home = () => {
  return (
    <Fragment>
      <LoginHeader></LoginHeader>
      <UserLogedIn></UserLogedIn>;
    </Fragment>
  );
};

export default Home;

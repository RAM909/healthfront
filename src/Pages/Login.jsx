import React, { useState, useEffect } from "react";
import "./Login.css";
// import img from "../Assests/biomedical.svg";
// import img from "../Assests/background.jpg";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigate()

  const changeHanlder = (input, value) => {
    setData((prevData) => {
      return {
        ...prevData,
        [input]: value,
      };
    });
  };

  const formchangehandler = (e) => {
    e.preventDefault();
    if (data.email === "admin@gmail.com" && data.password === "admin@456123") {
      console.log(data, "data");
      // setIsLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      toast.success("Login Successful");
      navigation("/home")
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="Login_page_container">
      <div className="Login_card">
        <h1 className="Login_title">Login</h1>
        <form action="" className="formBox" onSubmit={formchangehandler}>
          <div className={`inputBox animation1`}>
            <input
              type="text"
              value={data.email}
              id="name"
              onChange={(e) => changeHanlder("email", e.target.value)}
              required
            />
            <label htmlFor="">Email</label>
            <i className="bx bxs-user"></i>
          </div>
          <div className={`inputBox animation1`}>
            <input
              type="password"
              value={data.password}
              id="name"
              onChange={(e) => changeHanlder("password", e.target.value)}
              required
            />
            <label htmlFor="">Password</label>
            <i className="bx bxs-user"></i>
          </div>
          <button className="Login_btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

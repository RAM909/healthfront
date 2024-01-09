import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const host = "https://healthbackenddd.onrender.com"


const Header = ({ isLoggedIn, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const closeForm = useRef(null);
  const Navigation = useNavigate();

  useEffect(() => {
    axios
      .get(`${host}/api/patient`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setShowEditForm(false);
    setEmail("");
    setPassword("");
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const logouthandle = () => {
    localStorage.setItem("loggedIn", false);
    Navigation("/")
    // window.location.reload();
  };
  const Exporthandle = () =>{
    const csvData = encodeURIComponent(data.map(row => Object.values(row).join(',')).join('\n'));
    const link = document.createElement('a');
    link.href = `data:text/csv;charset=utf-8,${csvData}`;
    link.download = 'patient_data.csv';
    link.click();}
  

  // useEffect(() => {
  //   const closeFormHandler = (event) => {
  //     if (closeForm.current && !closeForm.current.contains(event.target)) {
  //       setShowEditForm(false);
  //       console.log("outside");
  //     }
  //   };
  //   document.addEventListener("mousedown", closeFormHandler);
  //   return () => {
  //     document.removeEventListener("mousedown", closeFormHandler);
  //   };
  // }, []);
  return (
    <div className="app__login">
      {/* {isLoggedIn ? ( */}
      <h1>HEALTH CARE DEVICE</h1>
      <div className="app__login_div">

        <h2 onClick={logouthandle}>Logout</h2>
      </div>
      <div className="app__extract_div">

        <h2 onClick={Exporthandle}>Extract Data</h2>
      </div>


      {/* {showEditForm && (
        <div className="edit-form overlay">
          <div className="edit-form-div">
            <form
              className=""
              onSubmit={handleLoginFormSubmit}
              ref={closeForm}
            >
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="form-btn" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Header;

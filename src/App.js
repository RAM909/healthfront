import React, {useState} from 'react';
import Login from './Pages/Login';
import Home from './Pages/Home';
import toast, { Toaster } from "react-hot-toast";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(
    //   localStorage.getItem("loggedIn") === "true"
    // );

    // const handleLogin = (email, password) => {
      // if (email === "admin@gmail.com" && password === "admin@456123") {
      //   setIsLoggedIn(true);
      //   localStorage.setItem("loggedIn", "true");
      //   toast.success("Login Successful");
      // }
      // else{
      //   toast.error("Invalid Credentials");
      // }
    // };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;

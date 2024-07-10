import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ResetPassword from "./pages/resetPassword";
import ForgotPassword from "./pages/forgotPassword";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/resetPassword" element={<ResetPassword />}></Route>
        <Route path="forgotPassword" element={<ForgotPassword />}></Route>
      </Routes>
    </div>
  );
};

export default App;

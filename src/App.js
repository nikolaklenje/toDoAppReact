import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/login";
// import SignUp from "./pages/signUp";
// import ResetPassword from "./pages/resetPassword";
// import ForgotPassword from "./pages/forgotPassword";

const App = () => {
  useEffect(() => {
    console.log("########## init");
    //
    // way1: modern browsers
    // window.navigation.addEventListener('navigate', function (event) {
    //     console.log('########## navigate', event)
    //
    // });

    // react/angular implementation
    // function watchHistoryEvents() {
    //     const { pushState, replaceState } = window.history;
    //
    //     window.history.pushState = function (...args) {
    //         pushState.apply(window.history, args);
    //         window.dispatchEvent(new Event('pushState'));
    //     };
    //
    //     window.history.replaceState = function (...args) {
    //         replaceState.apply(window.history, args);
    //         window.dispatchEvent(new Event('replaceState'));
    //     };
    //
    //     window.addEventListener('popstate', () => console.log('popstate event'));
    //     window.addEventListener('replaceState', () => console.log('replaceState event'));
    //     window.addEventListener('pushState', () => console.log('pushState event'));
    // }
    // watchHistoryEvents();

    // // store url on load
    // let currentPage = window.location.href;
    //
    // // way3: universal
    // // listen for changes
    // const timer = setInterval(function() {
    //     if (currentPage != window.location.href) {
    //         // page has changed, set new page as 'current'
    //         currentPage = window.location.href;
    //
    //         console.log('############ current page')
    //     }
    // }, 500);
    //
    // return () => clearInterval(timer)
  }, []);
  return (
    <div className="container">
      {/* <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/resetPassword" element={<ResetPassword />}></Route>
        <Route path="forgotPassword" element={<ForgotPassword />}></Route>
      </Routes> */}
      <Home />
    </div>
  );
};

export default App;

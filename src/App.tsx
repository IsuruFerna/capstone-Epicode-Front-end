import React from "react";
import "./App.css";
import ".";
import "bootstrap/dist/css/bootstrap.min.css";
import MessagePage from "./pages/MessagePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestMsgPage from "./pages/TestMsgPage";
import TestMsgPage2 from "./pages/TestMsgPage2";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<MessagePage />} path="/message" />
            <Route element={<TestMsgPage />} path="/test" />
            <Route element={<TestMsgPage2 />} path="/test2" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<UserProfilePage />} path="/user/:elementId" />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

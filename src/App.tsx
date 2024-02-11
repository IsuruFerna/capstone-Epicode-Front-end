import React from "react";
import "./App.css";
import ".";
import "bootstrap/dist/css/bootstrap.min.css";
import MessagePage from "./pages/MessagePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestMsgPage from "./pages/TestMsgPage";
import TestMsgPage2 from "./pages/TestMsgPage2";
import HomePage from "./pages/HomePage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            {/* <div className="vh-100">
               <MessagePage />
            </div> */}
            <Route element={<HomePage />} path="/" />
            <Route element={<MessagePage />} path="/message" />
            <Route element={<TestMsgPage />} path="/test" />
            <Route element={<TestMsgPage2 />} path="/test2" />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

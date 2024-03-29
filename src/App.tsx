import "./App.css";
import ".";
import "bootstrap/dist/css/bootstrap.min.css";
import MessagePage from "./pages/MessagePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import SearchPage from "./pages/SearchPage";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<MessagePage />} path="/message" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<UserProfilePage />} path="/user/:elementId" />
            <Route element={<SearchPage />} path="/search" />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

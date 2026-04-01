import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/profile" element= { <Profile/> }></Route>
      <Route path="/login" element= { <Login/> }></Route>
      <Route path="/register" element= { <Register/> }></Route>
    </Routes>
  </BrowserRouter>
}

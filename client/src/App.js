import './App.css';
import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from './components/elements/Navbar';
import Stats from "./components/Stats";
import Play from './components/Play';
import Home from './components/Home';

import Signup from "./components/Signup"
import Footer from "./components/elements/Footer"
import Login from "./components/Login"
import Profile from "./components/Profile"
function App() {
const user = localStorage.getItem("token")

return (
    <>
    
    <Navbar/>
<Routes>
{user && <Route path="/" exact element={<Home/>} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
{user && <Route path='/Play' exact element={<Play/>}/>}
{user && <Route path='/Stats'exact element={<Stats/>}/>}
{user && <Route path='/Profile'exact element={<Profile/>}/>}
<Route path="/" element={<Navigate replace to="/login" />} />
<Route path="/Play" element={<Navigate replace to="/login" />} />
<Route path="/Stats" element={<Navigate replace to="/login" />} />
<Route path="/Profile" element={<Navigate replace to="/login" />} />
</Routes>
<Footer />
</>
)
}
export default App
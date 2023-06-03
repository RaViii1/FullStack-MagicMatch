import './App.css';

import { Route, Routes, Navigate } from "react-router-dom"
import Navbar from './components/Navbar';
import Stats from "./components/Stats";
import Play from './components/Play';
import Home from './components/Home';
// // import Login from './components/Login';
// // import Register from './components/Register';

// export default function App() {

//   return (
//     <>
//     <Navbar/>
//     <Routes> 
//     <Route path='/' element={<Home/>}/>
//       <Route path='/Play' element={<Play/>}/>
//       <Route path='/Stats' element={<Stats/>}/>
//       {/* <Route path='/Login' element={<Login/>}/>
//       <Route path='/Register' element={<Register/>}/> */}
//     </Routes>
//     </>
//   );
// }

import Signup from "./components/Signup"
import Footer from "./components/Footer"
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
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import '../../App.css';
import '../css/inputs.css';


const Signup = () => {
const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
})
const [error, setError] = useState("")
const navigate = useNavigate()
const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
}
const handleSubmit = async (e) => {
e.preventDefault()
try {
    const url = "http://localhost:5000/api/users"
    const { data: res } = await axios.post(url, data)
    navigate("/login")
    console.log(res.message)
} catch (error) {
if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500
) {
setError(error.response.data.message)
}
}
}
return (
<div>
<div className=""></div>
<form className=""
    onSubmit={handleSubmit}>
    <h2>Create Account</h2>
    <div className="inputsBorder">
    <div className="inputs">

    <h2>Sign up</h2>
        
        <input
            type="text"
            placeholder="Username"
            name="name"
            onChange={handleChange}
            value={data.name}
            required
            className=""
        />
        <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className=""
        />
        <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className=""
        />
    {error && <div
    className="error_msg">{error}</div>}
<button type="submit"
        className="button1 mt-2">
        Sing Up
    </button>
        </div>
    </div>

    <h4>You already have account? Sign in</h4>   
    <Link to="/login">
        <button type="button"
        className="button1">
            Login
        </button>
    </Link>
</form>
</div>

);
};
export default Signup
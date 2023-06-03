
import axios from "axios"
import { Link } from "react-router-dom"
import '../css/inputs.css';
import '../../App.css';
import { useState, useEffect } from 'react';
const Login = () => {

    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })

};

    const handleSubmit = async (e) => {
    e.preventDefault()

try {
    const url = "http://localhost:5000/api/auth"
    const { data: res } = await axios.post(url, data)
    localStorage.setItem("token", res.data)
    window.location = "/"
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

    <div>
<form className=""
    onSubmit={handleSubmit}>
        <h2>Login to your account</h2>
        <div className="inputsBorder">
            <h1>Login </h1>
    <div className="inputs">

    
    <input
        type="email"
        placeholder="Email"
        name="email"onChange={handleChange}
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
        Sing In
    </button>
    </div>
    </div>
</form>

<div className="">
    <h4>New Here? Create account</h4>
    <Link to="/signup">
    <button type="button"
        className="button1">
        Sing Up
    </button>
    </Link>
    
</div>
</div>
</div>
)
}
export default Login;
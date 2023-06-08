import React, { useState, useEffect } from "react";
import './css/inputs.css';
import '../App.css';
import axios from "axios";
import checkToken from "./elements/Token";
import jwt_decode from "jwt-decode";

export default function Profile(){
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [resMsg, setResMsg] = useState("");
  const token = checkToken();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (token) {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken._id;
        setUserId(userId);
        fetchUserData(userId);
      }
  
  }, [token]);
  
  const fetchUserData = async (userId) => {
      try {
        const url = `http://localhost:5000/api/users/${userId}`;
        const { data } = await axios.get(url);
        setUserData(data);
        setName(data.name);
    } catch (error) {
        console.log(error); 
    }
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const url = `http://localhost:5000/api/users/${userId}`;
       const registrationData = { name };

       await axios.put(url, registrationData);
       setResMsg("User updated successfully");
     } catch (error) {
         if (error.response && error.response.status >= 400 && error.response.status <= 500) {
             setError(error.response.data.message);
           }
       }
    };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
    const url = `http://localhost:5000/api/users/${userId}`;
      const { data: res } = await axios.delete(url);
      setResMsg(res.message);
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location = "/"
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };


  return(
    <>
    
    <div className="profileBg">
    
      <div className="Title"><h2>Profile</h2></div>
      <div className="content">
      <div className="inputs ">
      <div className="DangerZone ">
      <div className="DangerZone"><h2>Update Profile</h2></div>
          {userData && (
            <form onSubmit={handleSubmit}>
                <div className="imputsBorder">
                <input
                  required
                  className=""
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            {error ? <div className="error_msg">{error}</div> : resMsg !== "" && <div className="error_msg">{resMsg}</div>}
            <div className="">
            <button className="button1" type="submit">Update</button>
            </div>
            </form>
          )}
          </div>
        </div>
      
            <div className="DangerZone"><h2>Danger Zone</h2></div>
            <button className="button1" onClick={deleteUser}>Delete Account</button>
      </div>
    </div>
     
    </>
  )
}

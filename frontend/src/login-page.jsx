import React , { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export const Login = (property) => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem("token") != null)
        {
            navigate("/homepage");
        }
    });
    const [user,setUser] = useState({
        username:'',
        password:''
    })
    const changeHandler = evt =>{
        const { name, value } = evt.target
        setUser({
            ...user,
            [name]:value 
        })
    }
    const backLogin = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",user)
        .then(response => {
            if(response.data.message === 1)
            {
                window.localStorage.setItem("token",response.data.token)
                alert("LOGGED IN!")
                console.log(localStorage.getItem("token"));
                navigate('/homepage')
            }
            else if(response.data.message === 2)
            {
                alert("Invalid username or password")
            }
            else
            {
                alert("something abnormal happened..")
            }
        })
        .catch(error =>{
            console.log(error)
        })
    };

    return(
        <>
            <div className="heading">
                <h1>GREDDIT</h1><br/><br/><br/><br/><br/>
            </div>
            <div className="form">
                <h2>LOGIN</h2><br/>
                <form onSubmit={backLogin} className="input">
                    {console.log("user",user)}
                    <div className="inputbox">
                    <label htmlFor="text">Enter Username</label>
                    <input name="username" value={user.username} onChange={changeHandler} type="text" placeholder="Username" required/><br/>
                    </div>
                    <div className="inputbox">
                    <label htmlFor="password">Enter Password</label>
                    <input name="password" value={user.password} onChange={changeHandler} type="password" placeholder="Password" required/><br/>
                    </div>
                    <button type="submit" className="login" disabled={!(user.username && user.password)}>Log In</button>            
                </form>
                <button onClick={()=>property.onFormSwitch('register')} className="linkbtn">Don't have an account? Register Here.</button>
            </div>
        </>
    )
}
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/navbar";
export const UpdateProfile = (property) => {
    const [user,setUser]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[]})
    const token = window.localStorage.getItem('token')
    // console.log(token)
    const condition = 0
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,condition:condition})
        .then((resp)=>{
            // console.log(resp)
            const presentInfo = resp.data.message;
            // console.log(presentInfo);
            setUser(presentInfo);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    const navigate=useNavigate();
    // const crossChecker = (e)=>{
    //     console.log("email");
    // }
    const changeHandler = evt =>{
        const { name, value } = evt.target
        setUser({
            ...user,
            [name]:value 
        })

    }
    console.log(user)
    const profileUpdater = (e)=>{
        e.preventDefault();
        if(user.password && user.first &&user.last &&user.username)
        {
            axios.post("http://localhost:5000/updateProfile",{token:token,user:user})
            .then((response)=>{
                if(response.data.message === 1)
                {
                    alert('PROFILE UPDATED SUCCESSFULLY')
                    navigate('/Profile')
                }
                else if(response.data.message === 0)
                {
                    console.log("USER ALREADY EXISTS!")
                    alert('USERNAME ALREADY EXISTS!')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
         }
        else{
            alert("An error Occured while Registering.Please try after some time!");
        }
    }
    return(
        <>
        <br/><br/><br/><br/>
        <div className="form">
            <form onSubmit={profileUpdater} className="input">
                {/* <div>
                    <Navbar/>
                </div> */}
                <h2>EDIT PROFILE</h2><br/>
                <div className="inputbox">
                <label htmlFor="first">First-Name</label> 
                <input name="first" value={user.first} onChange={changeHandler} type="text" placeholder="First-Name" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="last">Last-Name</label> 
                <input name="last" value={user.last} onChange={changeHandler} type="text" placeholder="Last-Name" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="username">UserName</label> 
                <input name="username" value={user.username} onChange={changeHandler} type="text" placeholder="Username"required/>
                </div>
                <div className="inputbox">
                <label htmlFor="number">Contact-Number</label> 
                <input name="number" value={user.number} onChange={changeHandler} type="text" placeholder="Contact-Number"required/>
                </div>
                <div className="inputbox">
                <label htmlFor="age">Age</label> 
                <input name="age" value={user.age} onChange={changeHandler} type="number" placeholder="Age" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="email">E-Mail</label> 
                <input name="email" value={user.email} onChange={changeHandler} type="email" placeholder="E-mail" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="about">{"About"}</label> 
                <input name="about" value={user.about} onChange={changeHandler} type="text" placeholder="About"/>
                </div>
                <button type="submit" className="login"  onClick={profileUpdater}>Save Changes</button>
                {/* disabled={!(user.first&&user.last&&user.username&&user.number&&user.age&&user.email&&user.password&&user.passcheck)} */}
            </form>
        </div>
        <br/><br/><br/><br/>
        </>
    )
}
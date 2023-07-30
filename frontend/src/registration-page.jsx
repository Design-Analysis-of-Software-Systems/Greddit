import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = (property) => {
    const [user,setUser] = useState({
        first:'',
        last:'',
        username:'',
        number:'',
        age:'',
        email:'',
        password:'',
        passcheck:'',
        about:''
    })
    const navigate=useNavigate();
    // const crossChecker = (e)=>{
    //     console.log("email");
    // }
    const changeHandler = evt =>{
        const { name, value } = evt.target
        setUser({...user,[name]:value })
    }
    const backRegister = (e)=>{
        e.preventDefault();
        console.log("user ka password: "+ user.password)
        console.log("user ka repassword: "+ user.passcheck)
        if(user.password === user.passcheck && user.first &&user.last &&user.username)
        {
            axios.post("http://localhost:5000/register",{user : user})
            .then((response)=>{
                if(response.data.message === 1)
                {
                    alert('REGISTERED SUCCESSFULLY')
                    navigate('/')
                }
                else if(response.data.message === 0)
                {
                    console.log("USER ALREADY EXISTS!")
                    alert('USER ALREADY EXISTS!')
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
            <form onSubmit={backRegister} className="input">
                {console.log("user",user)}
                <h2>REGISTER</h2><br/>
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
                <label htmlFor="password">Password</label> 
                <input name="password" value={user.password} onChange={changeHandler} type="password" placeholder="Password" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="passcheck">Re-Enter Password</label> 
                <input name="passcheck" value={user.passcheck} onChange={changeHandler} type="password" placeholder="Re-Enter Password" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="about">{"About (Not Required)"}</label> 
                <input name="about" value={user.about} onChange={changeHandler} type="text" placeholder="About"/>
                </div>
                <button type="submit" className="login" disabled={!(user.first&&user.last&&user.username&&user.number&&user.age&&user.email&&user.password&&user.passcheck)}>Submit</button>
            </form>

            <button onClick={()=>property.onFormSwitch('login')} className="linkbtn">Already have an account? Log-In Here.</button>
        </div>
        <br/><br/><br/><br/>
        </>
    )
}
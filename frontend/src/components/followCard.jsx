import React from 'react';
import FollowCSS from './followStyle.module.css';
import axios from 'axios';
export const FollowCard = (user)=>{
    const username = user.username
    const condition = user.condition
    console.log(condition)
    const token = window.localStorage.getItem("token")
    const removeFollow = ()=>{
        console.log("function call ho gya")
        axios.post("http://localhost:5000/removeFollow",{token:token,username:username})
        .then((response)=>{
            if(response.data.message == true)
            {
                alert("Removed Follower Successfully")
                console.log("Removed Follower Successfully")
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return(
    <li>
        <a className={FollowCSS.card} style={{textAlign:"center",zIndex:"0"}} >
            <button style={{backgroundImage:`url("https://i.imgur.com/oYiTqum.jpg")`,cursor:'pointer',backgroundSize:'cover',height:'350px'}} className={FollowCSS.card__image} alt="" onClick={()=>{window.location.href = "/otherUserProfile/"+user.username}}></button>
            <div className={FollowCSS.card__overlay} style={{textAlign:"center"}}>
                <div className={FollowCSS.card__Follow} style={{textAlign:"center"}}>
                    <img className={FollowCSS.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt=""  />
                    <div className={FollowCSS.card__Follow} style={{textAlign:"center"}}>
                        <h3 className={FollowCSS.card__title}>{user.username}</h3> 
                        {condition == 0 ? <button className={FollowCSS.card__status} style={{fontSize:"10px",borderRadius:"5px",cursor:"pointer",zIndex:"5"}} onClick={removeFollow}>Remove</button>: <span></span>}           
                    </div>
                </div>
                <p>{user.about}</p>
            </div>
        </a>       
    </li> 
    );
}
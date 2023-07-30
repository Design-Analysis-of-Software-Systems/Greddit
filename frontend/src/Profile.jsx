import React, { useState } from "react";
import { Navbar } from "./components/navbar";
import HeaderCSS from "./components/profileStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export const Profile = ()=>{
    console.log("PROFILE MEIN AAYA!")
    // console.log(window.localStorage.getItem("token"))
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const [presentUser,setPresentUser]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[]})
    const token = window.localStorage.getItem('token')
    // console.log(token)
    const condition = 0
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,condition:condition})
        .then((resp)=>{
            console.log(resp)
            const presentInfo = resp.data.message;
            // console.log(presentInfo);
            setPresentUser(presentInfo);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    return(
        <>
        <div>
        <Navbar/>
        </div>
        <div className={HeaderCSS.cards} style={{textAlign:"center",marginLeft:"29.5%"}}>
                <a href="" className={HeaderCSS.card} style={{textAlign:"center"}}>
                <img src="https://i.imgur.com/oYiTqum.jpg" className={HeaderCSS.card__image} alt="" />
                <div className={HeaderCSS.card__overlay} style={{textAlign:"center"}}>
                    <div className={HeaderCSS.card__header} style={{textAlign:"center"}}>
                        <img className={HeaderCSS.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
                        <span className={HeaderCSS.card__thumb}>{presentUser.first+" "+presentUser.last}</span>
                        <div className={HeaderCSS.card__header} style={{textAlign:"center"}}>
                        <h5 className={HeaderCSS.card__title} style={{marginLeft:"-11px"}}>{presentUser.username}</h5>            
                        <button className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginBottom:"10px",paddingTop:"7px",paddingBottom:"7px",cursor:"pointer"}} onClick={()=>{navigate('/updateProfile')}}>{"Edit Profile"}</button>
                        </div>
                    </div>
                    <div className={HeaderCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={HeaderCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <h3 className={HeaderCSS.card__title}>{"Name : "+presentUser.first+" "+presentUser.last}</h3>
                        </div>
                    </div>
                    <br/>
                    <div className={HeaderCSS.buttons} style={{display:"inline-flex",textAlign:"ceEditnter"}}>
                        <div className={HeaderCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <h3 className={HeaderCSS.card__title}>{"About : "+presentUser.about}</h3>  
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className={HeaderCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={HeaderCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <button className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"60px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/followers')}}>{"Followers:"+ presentUser.followers.length}</button>
                            <button className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"30px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/following')}}>{"Following:"+ presentUser.following.length}</button>
                        </div>
                    </div>
                </div>
                </a>      
        </div>
        </>
    )
}
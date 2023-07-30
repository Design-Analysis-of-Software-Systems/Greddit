import React, { useState,useEffect } from "react";
import { Navbar } from "./components/navbar";
import HeaderCSS from "./components/profileStyle.module.css";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
export const OthersInfo = ()=>{
    console.log("OTHER PROFILE MEIN AAYA!")
    // console.log(window.localStorage.getItem("token"))
    const navigate = useNavigate();
    const {username} = useParams();
    console.log(username)
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const [otherUsers,setotherUsers]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[],mysubgreddit:[],savedposts:[]})
    const token = window.localStorage.getItem('token')
    console.log(token)
    const condition = 1
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,username:username,condition:condition})
        .then((resp)=>{
            console.log(resp)
            const presentInfo = resp.data.message;
            console.log(presentInfo);
            setotherUsers(presentInfo);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    const [buttonChange,setButtonChange]=useState()
    useEffect(()=>{
        axios.post('http://localhost:5000/checkFollow',{token:token,username:username})
        .then((result)=>{
            if(result.data.message === true)
            {
                setButtonChange(true)
            }
            else
            {
                setButtonChange(false)
            }
        })
    },[])
    const followReq = ()=>{
        axios.post('http://localhost:5000/newFollow',{token:token,username:username})
        .then((result)=>{
            if(result.data.message === true)
            {
                alert("YOU ARE NOW FOLLOWING: "+username)
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const unfollowReq =()=>{
        axios.post('http://localhost:5000/unFollow',{token:token,username:username})
        .then((result)=>{
            if(result.data.message === true)
            {
                alert("UNFOLLOWED: "+username)
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    } 
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
                        <span className={HeaderCSS.card__thumb}>{otherUsers.first+" "+otherUsers.last}</span>
                        <div className={HeaderCSS.card__header} style={{textAlign:"center"}}>
                        <h3 className={HeaderCSS.card__title}>{otherUsers.username}</h3> 
                        {buttonChange === true ? <button className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginBottom:"10px",paddingTop:"7px",paddingBottom:"7px",cursor:"pointer"}} onClick={unfollowReq}>{"Unfollow"}</button> : <button className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginBottom:"10px",paddingTop:"7px",paddingBottom:"7px",cursor:"pointer"}} onClick={followReq}>{"Follow"}</button>}
                        </div>
                    </div>
                    <div className={HeaderCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={HeaderCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <h3 className={HeaderCSS.card__title}>{"About : "+otherUsers.about}</h3>  
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className={HeaderCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={HeaderCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <span className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"60px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/followers')}}>{"Followers:"+ otherUsers.followers.length}</span>
                            <span className={HeaderCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"30px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/following')}}>{"Following:"+ otherUsers.following.length}</span>
                        </div>
                    </div>
                </div>
                </a>      
        </div>
        </>
    )
}
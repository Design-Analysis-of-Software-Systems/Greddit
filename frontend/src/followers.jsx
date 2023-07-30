import React,{useEffect,useState} from "react";
import { Navbar } from "./components/navbar";
import { FollowCard } from "./components/followCard";
import FollowCSS from "./components/followStyle.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Followers = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const [followersList,setFollowersList] = useState([]);
    const token = window.localStorage.getItem('token');
    const condition =0 ;
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,condition:condition})
        .then((resp)=>{
            console.log("info aa gyi...")
            console.log(resp)
            const userInfo = resp.data.message;
            setFollowersList(userInfo.followers);
            console.log(followersList)
        })
        .catch((error)=>{
            console.log(error);
        })
    });
    const cond = 0;
    return(
    <>
        <div>
            <Navbar/>
        </div>
        <ul className={FollowCSS.cards}>
            {followersList.map(user=>{
                return(<FollowCard key={user.username} username={user.username} age={user.age} about={user.about} condition={cond}/>)
            })}
        </ul>
    </>
    )
}
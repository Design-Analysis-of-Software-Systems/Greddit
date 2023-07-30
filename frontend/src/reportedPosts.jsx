import React from "react";
import { useState,useEffect } from "react";
import { useNavigate,useParams,useLocation } from "react-router-dom";
import axios from "axios";
import { Navbar2 } from "./components/navbar2";
import { Navbar } from "./components/navbar";
import subgredditCSS from "./components/profileStyle.module.css"
import { Subgreddit } from "./mysubgreddit";
import { PostCard } from "./components/postCard";
import { ReportCard } from "./components/reportCard";
export const ParticularReport=()=>{
    console.log("AAGYA PARTICULAR MEI")
    const navigate = useNavigate();
    const location = useLocation();
    const name = location.state.name
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const token = window.localStorage.getItem('token')
    const [subgredditInfo,setSubGredditInfo]=useState({name:'',followers:[],posts:[],description:'',date: new Date(),tags:[],bannedKeywords:[],reports:[]})
    useEffect(()=>{
        axios.post('http://localhost:5000/getParticularSubgredditInfo',{token:token,name:name})
        .then((result)=>{
            const info = result.data.message
            console.log("info: "+info)
            setSubGredditInfo(info)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    const reports = subgredditInfo.reports
    // alert(reports)

    const condition =1
    return(
        <>
        <div>
        <Navbar/>
        </div>
        <div>
        <Navbar2/>
        </div>
        {console.log(subgredditInfo)}
            <div><h1 style={{color:"white"}}> REPORTED POSTS</h1></div>
            {reports.map(user=>{
                // concern text reportedby creator postID
                {console.log(user)}
                return(<ReportCard key={user.postID} id={user.postID} text={user.text} concern={user.concern} reportedby={user.reportedby} condition = {condition} creator = {user.creator} name = {name}/>)
            })}
            
        </>
    )

}
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/navbar";
import subgredditCSS from "./components/profileStyle.module.css"
import { Subgreddit } from "./mysubgreddit";
import { PostCard } from "./components/postCard";
export const SavePosts=()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const [presentUser,setPresentUser]=useState({savedposts:[]})
    const token = window.localStorage.getItem('token')
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
    const posts = presentUser.savedposts
    // console.log(posts)
    return(
        <>
        <div>
        <Navbar/>
        </div>
            <div><h1 style={{color:"white"}}>SAVED POSTS</h1></div>
            {posts.map(user=>{
                {console.log(user.id)}
                return(<PostCard key={user.id} id={user.id} text={user.text} postedby={user.postedby} postedin={user.postedin} upvotes={user.upvotes} downvotes = {user.downvotes} condition = {condition}/>)
            })}
        </>
    )

}
import React from "react";
import { useState,useEffect } from "react";
import { useNavigate,useParams,useLocation } from "react-router-dom";
import axios from "axios";
import { Navbar2 } from "./components/navbar2";
import { Navbar } from "./components/navbar";
import subgredditCSS from "./components/profileStyle.module.css"
import { Subgreddit } from "./mysubgreddit";
import { PostCard } from "./components/postCard";
export const ParticularSubgreddit=(parameter)=>{
    console.log("AAGYA PARTICULAR MEI")
    const navigate = useNavigate();
    const location = useLocation();
    const {name} = useParams();
    const creator = new URLSearchParams(location.search).get("creator");
    console.log("creator name: "+creator)
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const token = window.localStorage.getItem('token')
    const [subgredditInfo,setSubGredditInfo]=useState({name:'',followers:[],posts:[],description:'',date: new Date(),tags:[],bannedKeywords:[]})
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
    const posts = subgredditInfo.posts
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
        <div className={subgredditCSS.searchContainer} style={{textAlign:"center",display:"flex"}}>
        <input type="text" placeholder="Search..." style={{textAlign:"center",display:"flex"}}/>
        <button type="submit">Search</button>
        </div>
        <div className={subgredditCSS.cards} style={{textAlign:"center",marginLeft:"29.5%"}}>
                <a href="" className={subgredditCSS.card} style={{textAlign:"center"}}>
                <img src="https://i.imgur.com/oYiTqum.jpg" className={subgredditCSS.card__image} alt="" />
                <div className={subgredditCSS.card__overlay} style={{textAlign:"center"}}>
                    <div className={subgredditCSS.card__header} style={{textAlign:"center"}}>
                        <img className={subgredditCSS.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt="" />
                        <span className={subgredditCSS.card__thumb}>{"Description: "+subgredditInfo.description}</span>
                        <div className={subgredditCSS.card__header} style={{textAlign:"center"}}>
                        <h3 className={subgredditCSS.card__title}>{"Name: "+subgredditInfo.name}</h3> 
                        {/* {buttonChange === true ? <button className={subgredditCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginBottom:"10px",paddingTop:"7px",paddingBottom:"7px",cursor:"pointer"}} onClick={unfollowReq}>{"Unfollow"}</button> : <button className={subgredditCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginBottom:"10px",paddingTop:"7px",paddingBottom:"7px",cursor:"pointer"}} onClick={followReq}>{"Follow"}</button>} */}
                        </div>
                    </div>
                    <div className={subgredditCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={subgredditCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            {/* <h3 className={subgredditCSS.card__title}>{"About: "+subgredditInfo.description}</h3> */}
                            <h3 className={subgredditCSS.card__title}>{"Banned Keywords: "+subgredditInfo.bannedKeywords}</h3>  
                            {/* <h3 className={subgredditCSS.card__title}>{"Tags: "+subgredditInfo.tags}</h3>   */}
                        </div>
                    </div>
                    <br/>
                    <div className={subgredditCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={subgredditCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <h3 className={subgredditCSS.card__title}>{"Tags: "+subgredditInfo.tags}</h3>
                        </div>
                    </div>
                    <br/>
                    <div className={subgredditCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={subgredditCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <h3 className={subgredditCSS.card__title}>{"No. of Posts: "+ posts.length}</h3>    
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className={subgredditCSS.buttons} style={{display:"inline-flex",textAlign:"center"}}>
                        <div className={subgredditCSS.action_btn} style={{display:"inline-flex",textAlign:"center"}}>
                            <button className={subgredditCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"30px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/subgredditfollowers',{state: {subgredditname: subgredditInfo.name}})}}>{"Followers:"+ subgredditInfo.followers.length}</button>
                            <button className={subgredditCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"30px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}}>{"Join"}</button>
                            <button className={subgredditCSS.card__description} style={{borderRadius:"12px",textAlign:"center",marginLeft:"30px",marginBottom:"30px",paddingTop:"10px",paddingBottom:"10px",cursor:"pointer"}} onClick={()=>{navigate('/newpost',{state: {subgredditname: subgredditInfo.name}})}}>{"Add New Post"}</button>
                        </div>
                    </div>
                </div>
                </a>   
            </div>
            <div><h1 style={{color:"white"}}>POSTS</h1></div>
            {posts.map(user=>{
                {console.log(user.id)}
                return(<PostCard key={user.id} id={user.id} text={user.text} postedby={user.postedby} postedin={user.postedin} upvotes={user.upvotes} downvotes = {user.downvotes} condition = {condition} creator = {creator}/>)
            })}
            
        </>
    )

}
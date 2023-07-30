import React, { useState } from "react";
import { Navbar } from "./components/navbar";
import { SubgredditCard } from "./components/subgredditCard";
import subgredditCSS from "./components/subgredditStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
export const Subgreddit = ()=>{
    console.log("SUBGREDDIT MEIN AAYA!")
    // info  variable has the subgreddit data info...
    // console.log(window.localStorage.getItem("token"))
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.localStorage.getItem("token") == null)
        {
            navigate("/");
        }
    });
    const [presentUser,setPresentUser]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[],mysubgreddit:[],savedposts:[]})
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
    const [subGreddit,setSubGreddit] = useState([])
    // const [new,setNewPost] = useState({username:presentUser.username,post:'',description:'',date:new Date(),tags:[],bannedWords:[]})
    
    // const changeHandler = evt =>{
    //     const { name, value } = evt.target
    //     setNewPost({...newPost,[name]:value })
    // }
    
    useEffect(()=>{
        axios.post('http://localhost:5000/getSubgredditInfo',{token:token})
        .then((result)=>{
            const info = result.data.message
            // console.log(info)
            setSubGreddit(info)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    // console.log(subGreddit)
    return(
        <>
        <div>
        <Navbar/>
        </div>
        <div className={subgredditCSS.searchContainer} style={{textAlign:"center",display:"flex"}}>
			<input type="text" placeholder="Search..." style={{textAlign:"center",display:"flex"}}/>
			<button type="submit">Search</button>
		</div>
        <div className={subgredditCSS.searchContainer} style={{textAlign:"center",display:"flex"}}>
            <button type="submit" onClick={()=>navigate('/newsubgreddit')}>Create New SubGreddit</button>
        </div>
        <ul className={subgredditCSS.cards}>
            {subGreddit.map(info=>{
                // {console.log(info.bannedKeywords)}
                return(<SubgredditCard key={info.key} name={info.name} description={info.description} followers={info.followers} posts={info.posts} bannedKeywords = {info.bannedKeywords} creator = {info.creator}/>)
            })}
        </ul>
        </>
    )
}
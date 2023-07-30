import { Navbar } from "./components/navbar";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import HomepageCSS from "./components/homepageStyle.module.css";
import axios from "axios";
export const NewPost = ()=>{
    const min = 1;
    const max = 10000000;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    const location = useLocation()
    const name = location.state.subgredditname
    const token = window.localStorage.getItem('token')
    const navigate = useNavigate();
    const [presentUser,setPresentUser]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[]})
    const condition = 0
    const [postInfo,setPostInfo] = useState({id:randomInt ,text:'',postedby:'',postedin:name,upvotes:[],downvotes:[]})
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,condition:condition})
        .then((resp)=>{
            console.log(resp)
            const presentInfo = resp.data.message;
            setPresentUser(presentInfo);
            setPostInfo({...postInfo,postedby:presentInfo.username})
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    const [subgredditInfo,setSubGredditInfo]=useState({name:'',followers:[],posts:[],description:'',date: new Date(),tags:[],bannedKeywords:[]})
    useEffect(()=>{
        axios.post('http://localhost:5000/getParticularSubgredditInfo',{token:token,name:name})
        .then((result)=>{
            const info = result.data.message
            // console.log(info)
            setSubGredditInfo(info)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    // console.log(postInfo.postedin)
    const changeHandler = evt =>{
        const { name, value } = evt.target
        setPostInfo({...postInfo,[name]:value})
    }
    console.log(postInfo)
    const postUpdater = (e) => {
        e.preventDefault();
        if (postInfo.text) {
          const bannedKeywords = subgredditInfo.bannedKeywords; // Example list of banned keywords
          const textArr = postInfo.text.split(" ");
          const filteredArr = textArr.map((word) =>
            bannedKeywords.includes(word.toLowerCase()) ? "****" : word
          );
          const filteredText = filteredArr.join(" ");
          // Update postInfo with filtered text
          setPostInfo({ ...postInfo, text: filteredText });
          axios
            .post("http://localhost:5000/updatePostArray", {
              token: token,
              postInfo: { ...postInfo, text: filteredText }, // Use the filtered text
              name: name,
            })
            .then((response) => {
              if (response.data.message === 1) {
                alert("POSTED SUCCESSFULLY");
                navigate("/particularSubgreddit/" + name);
              } else if (response.data.message === 0) {
                console.log("UNABLE TO POST");
                alert("UNABLE TO POST");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(
            "An error Occured while creating new post.Please try after some time!"
          );
        }
      };
    
    return(
        <>
        <br/><br/><br/><br/>
        <div className="form">
            <form onSubmit={postUpdater} className="input">
                <h2>CREATE POST</h2><br/>
                <div className="inputbox">
                <label htmlFor="text">Text</label> 
                <input name="text" value={postInfo.text} onChange={changeHandler} type="text" placeholder="Text" required/>
                </div>
                <button type="submit" className="login"  onClick={postUpdater}>Create</button>
            </form>
        </div>
        <br/><br/><br/><br/>
        </>
        );

}
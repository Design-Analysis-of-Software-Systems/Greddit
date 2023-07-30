import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/navbar";
export const NewSubgreddit = (property) => {
    const [presentUser,setPresentUser]=useState({first:'',last:'',username:'',number:'',age:'',email:'',password:'',about:'',followers:[],following:[]})
    const [subgredditInfo,setSubGredditInfo]=useState({name:'',followers:[],posts:[],description:'',date: new Date(),tags:[],bannedKeywords:[],creator:'',reports:[]})
    const token = window.localStorage.getItem('token')
    // console.log(token)
    const navigate=useNavigate();
    const condition = 0
    useEffect(()=>{
        axios.post('http://localhost:5000/profileInfo',{token:token,condition:condition})
        .then((resp)=>{
            console.log(resp)
            const presentInfo = resp.data.message;
            // console.log(presentInfo);
            setPresentUser(presentInfo);
            setSubGredditInfo({...subgredditInfo,creator:presentInfo.username})
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    const changeHandler = evt =>{
        const { name, value } = evt.target
        setSubGredditInfo({...subgredditInfo,[name]:value})
    }
    console.log(subgredditInfo)
    const subgredditUpdater = (e)=>{
        e.preventDefault();
        if(subgredditInfo.name && subgredditInfo.description)
        {
            tagPusher()
            bannedKeywordPusher()
            axios.post("http://localhost:5000/updateSubGredditArray",{token:token,subgredditInfo:subgredditInfo})
            .then((response)=>{
                if(response.data.message === 1)
                {
                    alert('SUBGREDDIT CREATED SUCCESSFULLY')
                    navigate('/mysubgreddit')
                }
                else if(response.data.message === 0)
                {
                    console.log("SUBGREDDIT ALREADY EXISTS!")
                    alert('SUBGREDDIT WITH SAME NAME ALREADY EXISTS!')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
         }
        else{
            alert("An error Occured while creating new sub greddit.Please try after some time!");
        }
    }
    const [tag,setTag] = useState('')
    const [bannedKeyword,setBannedKeyword] = useState('')
    const bannedKeywordPusher =()=>{
        const bannedKeywordArray = bannedKeyword.split(' ')
        subgredditInfo.bannedKeywords =bannedKeywordArray.map(bannedKeyword=>bannedKeyword.trim())
    }
    const tagPusher = () => {
        const tagsArray = tag.split(' ');
        subgredditInfo.tags = tagsArray.map(tag => tag.trim())
    }
    return(
        <>
        <br/><br/><br/><br/>
        <div className="form">
            <form onSubmit={subgredditUpdater} className="input">
                {/* <div>
                    <Navbar/>
                </div> */}
                <h2>CREATE SUBGREDDIT</h2><br/>
                <div className="inputbox">
                <label htmlFor="name">Name</label> 
                <input name="name" value={subgredditInfo.name} onChange={changeHandler} type="text" placeholder="Sub-Greddit Name" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="description">Description</label> 
                <input name="description" value={subgredditInfo.description} onChange={changeHandler} type="text" placeholder="Description" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="tags">Tags</label> 
                <input name="tags" value={tag} onChange={e => setTag(e.target.value)} type="text" placeholder="Tags"/>
                </div>
                <div className="inputbox">
                <label htmlFor="bannedKeywords">Banned Keywords</label> 
                <input name="bannedKeywords" value={bannedKeyword} onChange={e=>setBannedKeyword(e.target.value)} type="text" placeholder="bannedKeywords"/>
                </div>
                <button type="submit" className="login"  onClick={subgredditUpdater}>Create</button>
            </form>
        </div>
        <br/><br/><br/><br/>
        </>
    )
}
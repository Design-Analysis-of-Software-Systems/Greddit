import { Navbar } from "./components/navbar";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import HomepageCSS from "./components/homepageStyle.module.css";
export const Homepage = ()=>{
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(window.localStorage.getItem("State") == null)
    //     {
    //         navigate("/");
    //     }
    // });
    return(
        <>
        <div>
        <Navbar/>
        {/* <h1 style={{color:"white"}}>NOTHING MUCH AS OF NOW...</h1> */}
		<div className={HomepageCSS.searchContainer} style={{textAlign:"center",display:"flex"}}>
			<input type="text" placeholder="Search..." style={{textAlign:"center",display:"flex"}}/>
			<button type="submit">Search</button>
		</div>
		<h1 style={{color:"white"}}>Nothing Much Here...</h1>
		</div>
        </>    
        );

}
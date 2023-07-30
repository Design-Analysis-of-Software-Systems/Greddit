import React from 'react';
import { useState } from "react";
import {useNavigate,useParams} from "react-router-dom";
import navbarCSS from './navbarstyles.module.css';
import { Profile } from '../Profile';
export const Navbar2 = ()=>{
    const navigate = useNavigate();
    const {name} = useParams();
    console.log(name)
    return(
            <div className={navbarCSS.ola}>
                <nav>
                    <ul className={navbarCSS.nav__links}>
                        <li><a  style={{fontSize:"15px"}} onClick={()=>{navigate('../subgredditfollowers',{state: {subgredditname:name}})}}>Users</a></li>
                        <li><a style={{fontSize:"15px"}} onClick={()=>navigate('../mysubgreddit')}>Joining requests</a></li>
                        <li><a style={{fontSize:"15px"}} onClick={()=>navigate('../reportedPosts', { state: { name: name } })}>Reported Page</a></li>
                        <li><a style={{fontSize:"15px"}} >Stats</a></li></ul>
                </nav>
            </div>
    );
}
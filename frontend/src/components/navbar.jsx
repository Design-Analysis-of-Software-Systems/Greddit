import React from 'react';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import navbarCSS from './navbarstyles.module.css';
import { Profile } from '../Profile';

export const Navbar = ()=>{
    const navigate = useNavigate();
    return(
        <>
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
            </head>
            <div className={navbarCSS.ola}>
                <nav>
                    <ul className={navbarCSS.nav__links}>
                        <a onClick={()=>{navigate('../homepage')}} className={navbarCSS.logo}> GREDDIT</a>
                        <li>
                            <a style={{fontSize:"15px"}} onClick={()=>navigate('../Profile')}>
                                <i className="fas fa-user"></i>
                                Profile
                            </a>
                        </li>
                        <li>
                            <a style={{fontSize:"15px"}} onClick={()=>navigate('../mysubgreddit')}>
                            <i className="far fa-smile"></i>
                            <br/>
                            My Sub Greddits
                            </a>
                        </li>
                        <li>
                            <a style={{fontSize:"15px"}}>
                                <i className="far fa-smile"></i>
                                <br/>
                                Sub Greddits
                            </a>
                        </li>
                        <li>
                            <a style={{fontSize:"15px"}} onClick={()=>navigate('../savePosts')}>
                                <i class="far fa-bookmark"></i>
                                <br/>
                                Saved Posts
                            </a>
                        </li>
                    </ul>
                </nav>
                <button onClick={()=>{window.localStorage.removeItem("token");navigate("/")}} className={navbarCSS.cta}>Logout</button>
            </div>
        </>
    );
}

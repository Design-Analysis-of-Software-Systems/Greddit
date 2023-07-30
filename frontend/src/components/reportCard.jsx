import React, { useState } from 'react';
import axios from 'axios';
import HomepageCSS from "./homepageStyle.module.css";
import { useNavigate } from 'react-router-dom';
export const ReportCard = (user)=>{
    const navigate = useNavigate()
    const text = user.text
    const reportedby = user.reportedby
    const token = window.localStorage.getItem("token")
    const id = user.id
    const concern = user.concern
    const condition = user.condition
    const creator = user.creator
    const postedin = user.name
    // console.log(postedin)
    // console.log("id value: "+id)
    const [fl,setfl]=useState(0);
    const deletePost = ()=>{
        console.log("function call ho gya")
        axios.post("http://localhost:5000/deletePost",{token:token,postedin:postedin,id:id})
        .then((response)=>{
            if(response.data.message == 1)
            {
                alert("Removed post Successfully")
                console.log("Removed post Successfully")
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const ignorePost = ()=>{
        // SETFL(1)
        setfl(1);
        console.log("function call ho gya")
        alert("function call ho gya")
    }
    const blockPost = ()=>{
        console.log("function call ho gya")
        alert("function call ho gya")
    }
    return(
    <li>
        
		<div className={HomepageCSS.postCard}style={{color:"white"}}>
			<div className={HomepageCSS.postHeader}>
				<p>{"Reported by: "+ reportedby}</p>
                <p>{"Posted in: "+postedin}</p>
			</div>
			<br/><br/>
			<div className={HomepageCSS.postBody} >
				<p>{"Text of the post reported: "+text}</p>
                <p>{"Concern: "+concern}</p>

			</div>
			<br/><br/>
            <div>
            {fl===1 ? 
            
                <div className={HomepageCSS.postFooter}>
				<button className={HomepageCSS.saveButton} onClick={ignorePost}>Ignore</button>
                <button className={HomepageCSS.saveButton} disabled="true" onClick={blockPost}>Block User</button>
                <button className={HomepageCSS.saveButton} disabled="true" onClick={deletePost}>Delete Post</button>
			</div>
            
            :
			<div className={HomepageCSS.postFooter}>
				<button className={HomepageCSS.saveButton} onClick={ignorePost}>Ignore</button>
                <button className={HomepageCSS.saveButton} onClick={blockPost}>Block User</button>
                <button className={HomepageCSS.saveButton} onClick={deletePost}>Delete Post</button>
			</div>}
            </div>
		</div>  
    </li> 
    );
}
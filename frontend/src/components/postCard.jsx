import React from 'react';
import axios from 'axios';
import HomepageCSS from "./homepageStyle.module.css";
import { useNavigate } from 'react-router-dom';
export const PostCard = (user)=>{
    const navigate = useNavigate()
    const text = user.text
    const postedby = user.postedby
    const postedin=user.postedin 
    const upvotes=user.upvotes 
    const downvotes = user.downvotes
    const token = window.localStorage.getItem("token")
    const id = user.id
    const condition = user.condition
    const creator = user.creator
    console.log(postedin)
    // console.log("id value: "+id)
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
    const savePost = ()=>{
        console.log("function call ho gya")
        axios.post("http://localhost:5000/savePosts",{token:token,postedin:postedin,id:id})
        .then((response)=>{
            if(response.data.message == 1)
            {
                alert("Saved post Successfully")
                console.log("Saved post Successfully")
                window.location.reload()
            }
            else if(response.data.message == 2)
            {
                alert("The post is already saved!")
                console.log("The post is already saved!")
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    const unsavePost = ()=>{
        console.log("function call ho gya")
        axios.post("http://localhost:5000/unsavePosts",{token:token,postedin:postedin,id:id})
        .then((response)=>{
            if(response.data.message == 1)
            {
                alert("unsaved post Successfully")
                console.log("unsaved post Successfully")
                window.location.reload()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    // const reportedPosts = ()=>{
    //     axios.post("http://localhost:5000/reportPosts",{token:token,postedin:postedin,id:id,creator:creator})
    //     .then((response)=>{
    //         if(response.data.message == 1)
    //         {
    //             alert("reported post Successfully")
    //             console.log("reported post Successfully")
    //             window.location.reload()
    //         }
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }
    return(
    <li>
        
		<div className={HomepageCSS.postCard}style={{color:"white"}}>
			<div className={HomepageCSS.postHeader}>
				<p>{"Posted by: "+ postedby}</p>
                <p>{"Posted in: "+postedin}</p>
			</div>
			<br/><br/>
			<div className={HomepageCSS.postBody} >
				<p>{text}</p>
			</div>
			<br/><br/>
			<div className={HomepageCSS.postFooter}>
				<div className={HomepageCSS.voteButtons}>
					<button className={HomepageCSS.upvoteButton} style={{marginRight:"1px"}}>{"Upvotes: "+upvotes.length}</button>
					<button className={HomepageCSS.downvoteButton}>{"Downvotes: "+downvotes.length}</button>
				</div>
				{condition == 1 ? <button className={HomepageCSS.saveButton} onClick={savePost}>Save Post</button>:<></>}
                <button className={HomepageCSS.saveButton} onClick={() => navigate('/reportInfo', { state: { postedin: postedin, postID: id, creator: creator } })}>Report Post</button>
                {condition == 0 ? <button className={HomepageCSS.saveButton} onClick={unsavePost}>Unsave Post</button>:	<button className={HomepageCSS.saveButton} onClick={deletePost}>Delete Post</button>}
			</div><a> </a>
		</div>  
    </li> 
    );
}
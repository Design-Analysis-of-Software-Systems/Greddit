import React from 'react';
import FollowCSS from './followStyle.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const SubgredditCard = (user)=>{
    console.log("CARD AAGYA")
    // console.log(user)
    const navigate = useNavigate()
    const token = window.localStorage.getItem("token")
    const keywordarray = user.bannedKeywords
    const postsarray = user.posts
    const creator = user.creator
    console.log(postsarray)
    console.log(keywordarray.join(', '))
    console.log(keywordarray.length)
    console.log(user.description)
    const name = user.name
    const deleteSubgreddit = () => {
        console.log("front called..");
        axios
          .post("http://localhost:5000/deleteSubgreddit", { token: token, name:name})
          .then((response) => {
            console.log(response.data.message);
            if (response.data.message === 1) {
              alert("Removed subgreddit Successfully");
              window.location.reload();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    return(
    <li>
        <a className={FollowCSS.card} style={{textAlign:"center",zIndex:"0"}} >
        {/* onClick={()=>{window.location.href = "/otherSubgreddit/"+user.name}} */}
            <button style={{backgroundImage:`url("https://i.imgur.com/oYiTqum.jpg")`,cursor:'pointer',backgroundSize:'cover',height:'350px'}} className={FollowCSS.card__image} alt="" onClick={()=>{window.location.href=`/particularSubgreddit/${user.name}?creator=${creator}`}}></button>
            <div className={FollowCSS.card__overlay} style={{textAlign:"center"}}>
                <div className={FollowCSS.card__Follow} style={{textAlign:"center"}}>
                    <img className={FollowCSS.card__thumb} src="https://i.imgur.com/7D7I6dI.png" alt=""  />
                    <div className={FollowCSS.card__Follow} style={{textAlign:"center"}}>
                        <h3 className={FollowCSS.card__title}>{user.name}</h3> 
                        {/* {condition == 0 ? <button className={FollowCSS.card__status} style={{fontSize:"10px",borderRadius:"5px",cursor:"pointer",zIndex:"5"}} onClick={removeFollow}>Remove</button>: <span></span>} */}
                        <h4 className={FollowCSS.card__title}>{"Current Subscribers: "+user.followers.length}</h4>
                        <h4 className={FollowCSS.card__title}>{"Posts: "+user.posts.length}</h4>
                        <h4 className={FollowCSS.card__title}> {"Banned Keywords: "+keywordarray.join(', ')}</h4>
                        <button className={FollowCSS.card__title} onClick={deleteSubgreddit}>Delete Subgreddit</button>
                        
                    </div>
                </div>
                <p>{"Description: "+user.description}</p> 
            </div>
        </a>
    </li> 
    );
}
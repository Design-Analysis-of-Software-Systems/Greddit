import { Navbar } from "./components/navbar";
import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate,useLocation} from "react-router-dom";
import HomepageCSS from "./components/homepageStyle.module.css";
import axios from "axios";

export const ReportInfo = () => {
  const location = useLocation()
  const name = location.state.postedin;
  const postID = location.state.postID;
  const creator = location.state.creator;
  const token = window.localStorage.getItem("token");
  console.log(name+postID+creator)
  const navigate = useNavigate();
  const [presentUser, setPresentUser] = useState({
    first: "",
    last: "",
    username: "",
    number: "",
    age: "",
    email: "",
    password: "",
    about: "",
    followers: [],
    following: []
  });
  const condition = 0;
  const [reportInfo, setReportInfo] = useState({
    concern: "",
    text: "",
    reportedby: "",
    creator: creator,
    postID: postID
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/profileInfo", { token: token, condition: condition })
      .then((resp) => {
        console.log(resp);
        const presentInfo = resp.data.message;
        setPresentUser(presentInfo);
        setReportInfo({ ...reportInfo, reportedby: presentInfo.username });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [subgredditInfo, setSubGredditInfo] = useState({
    name: "",
    followers: [],
    posts: [],
    description: "",
    date: new Date(),
    tags: [],
    bannedKeywords: []
  });

  useEffect(() => {
    axios
      .post("http://localhost:5000/getParticularSubgredditInfo", { token: token, name: name })
      .then((result) => {
        const info = result.data.message;
        // console.log(info)
        setSubGredditInfo(info);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const changeHandler = (evt) => {
    const { name, value } = evt.target;
    setReportInfo({ ...reportInfo, [name]: value });
  };

  console.log(reportInfo);

  const reportUpdater = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/updateReportArray", {
        token: token,
        name: name,
        creator: creator,
        id: postID,
        reportInfo: reportInfo
      })
      .then((response) => {
        if (response.data.message === 1) {
          alert("REPORTED SUCCESSFULLY");
          navigate("/particularSubgreddit/" + name);
        } else if (response.data.message === 0) {
          console.log("UNABLE TO REPORT");
          alert("UNABLE TO REPORT");
          navigate("/particularSubgreddit/" + name);
        } else {
          alert("An error occurred while reporting. Please try again later!");
          navigate("/particularSubgreddit/" + name);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return(
        <>
        <br/><br/><br/><br/>
        <div className="form">
            <form onSubmit={reportUpdater} className="input">
                <h2>REPORT POST</h2><br/>
                <div className="inputbox">
                <label htmlFor="text">Concern</label> 
                <input name="concern" value={reportInfo.concern} onChange={changeHandler} type="text" placeholder="Concern" required/>
                </div>
                <div className="inputbox">
                <label htmlFor="text">Text of post you want to report</label> 
                <input name="text" value={reportInfo.text} onChange={changeHandler} type="text" placeholder="Text" required/>
                </div>
                <button type="submit" className="login"  onClick={reportUpdater}>Report</button>
            </form>
        </div>
        <br/><br/><br/><br/>
        </>
        );

}
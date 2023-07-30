const express = require("express");
const routers = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const { error, profile } = require("console");
const jsonwebtoken = require('jsonwebtoken');
const JWTSECRETKEY = "qwertyuiop1234567890";
const requireLogin = require('../middleware/requireLogin')

// for checking backend connection...
// routers.get("/", (req, resp) => {
//   resp.send("Ciao");
// });
// for testing jwt token....
// routers.get('/protected',requireLogin,(req,resp)=>{
//     resp.send("Adios!")
// })
routers.post("/register", (req, resp) => {
  const { first, last, username, number, age, email, password, about,followers,following} = req.body.user;
  //console.log(req.body);
  User.findOne({ username: username },
    (err, user) => {
      if (user) {
          // console.log(user);
        console.log("Already Exists")
        resp.status(200).send({message:0})
      } else {
        bcrypt.hash(password,14)
        .then(encryptedpass=>{

            const usr = new User({
              first,
              last,
              username,
              number,
              age,
              email,
              about,
              password:encryptedpass,
            });
            usr
              .save()
              .then((useer) => {
                console.log(useer);
                resp.status(200).send({ message: 1});
              })
              .catch((error) => {
                console.log(error);
                resp.status(400).send(error);
              });
        })
      }
    });
});
routers.post("/login",(req,resp)=>{
    const {username,password} = req.body
    User.findOne({username:username},
        (err,existingUser)=>{
            if(!existingUser){
                resp.status(200).send({message:2})
            }
            else{
                bcrypt.compare(password,existingUser.password)
                .then(matching=>{
                    if(matching)
                    {
                        // resp.status(200).json({message:"Sahi Hai bro!"})
                        const token = jsonwebtoken.sign({existingUser},JWTSECRETKEY)
                        // console.log(token)
                        resp.status(200).send({token:token , message:1})
                    }
                    else
                    {
                        return resp.status(200).send({message:2})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
    })
});
routers.post("/profileInfo",requireLogin,(req,resp)=>{
  //console.log("Yaha aagya!!!")
  // console.log(req.body.condition)
  if(req.body.condition == 0)
  {
    const currUserToken = req.body.currUserToken;
    //console.log(currUserToken.existingUser.username)
    User.findOne({username:currUserToken.existingUser.username},(err,result1)=>{
      if(result1)
      {
        //console.log("dola aaya..")
        //console.log(result1)
        resp.send({message:result1});
      }
      else
      {
        //console.log("dola ni aaya dola..")
        resp.send({error:1});
        console.log(err);
      }
    })
  } 
  else if(req.body.condition == 1)
  {
    const username = req.body.username;
    //console.log(currUserToken.existingUser.username)
    User.findOne({username:username},(err,result1)=>{
      if(result1)
      {
        //console.log("dola aaya..")
        //console.log(result1)
        resp.send({message:result1});
      }
      else
      {
        //console.log("dola ni aaya dola..")
        resp.send({error:1});
        console.log(err);
      }
    })
  }
})
routers.post("/removeFollow",requireLogin,(req,resp)=>{
  console.log("Removefollow aa gya")
  const removeUser = req.body.username
  const mainUser = req.body.currUserToken.existingUser
  const {username,age,about} = mainUser
  const limitedMainUser = {username,age,about}
  const mainUsername = limitedMainUser.username;
  const removeUsername = removeUser;
  // console.log(limitedMainUser)
  User.findOne({username:removeUser})
  .then((result1)=>{
    result1.following.splice(result1.following.findIndex(u=>u.username===mainUsername),1)
    result1.save()
    .then(()=>{
        User.findOne({username:limitedMainUser.username})
        .then((result2)=>{
        result2.followers.splice(result2.followers.findIndex(u=>u.username === removeUsername),1)
        result2.save()
        resp.send({message:true})
      })
    })
  })
  .catch((error)=>{
    console.log(error)
  })
})
routers.post("/unFollow",requireLogin,(req,resp)=>{
  console.log("unfollow aa gya")
  const oldUser = req.body.username
  const mainUser = req.body.currUserToken.existingUser
  const {username,age,about} = mainUser
  const limitedMainUser = {username,age,about}
  const mainUsername = limitedMainUser.username;
  const oldUsername = oldUser;
  // console.log(limitedMainUser)
  User.findOne({username:oldUser})
  .then((result1)=>{
    result1.followers.splice(result1.followers.findIndex(u=>u.username === mainUsername),1)
    result1.save()
    .then(()=>{
        User.findOne({username:limitedMainUser.username})
        .then((result2)=>{
        result2.following.splice(result2.following.findIndex(u=>u.username === oldUsername),1)
        result2.save()
        resp.send({message:true})
      })
    })
  })
  .catch((error)=>{
    console.log(error)
  })
})
routers.post("/newFollow",requireLogin,(req,resp)=>{
  console.log("newFollow aa gya")
  const newUser = req.body.username
  const mainUser = req.body.currUserToken.existingUser
  const {username,age,about} = mainUser
  const limitedMainUser = {username,age,about}
  // console.log(limitedMainUser)
  User.findOne({username:newUser})
  .then((result1)=>{
    const {username,age,about} = result1
    const limitedNewUser = {username,age,about}
    // console.log(limitedMainUser)
    // console.log(limitedNewUser)
    result1.followers.push(limitedMainUser)
    result1.save()
    .then(()=>{
      User.findOne({username:limitedMainUser.username})
      .then((result2)=>{
        result2.following.push(limitedNewUser)
        result2.save()
        resp.send({message:true})
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  })
})
routers.post("/checkFollow",requireLogin,(req,resp)=>{
  console.log("yaha aa gya")
  const userToFind = req.body.username
  const mainUser = req.body.currUserToken.existingUser.username
  // console.log(userToFind +"    "+mainUser)
  User.findOne({username:mainUser})
  .then((result2)=>{
    const isFollowing = result2.following.findIndex(u => u.username === userToFind) !== -1;
    resp.send({message: isFollowing});
  })
})
routers.post("/updateProfile",requireLogin,(req,resp)=>{
  const userInfo = req.body.user
  console.log(userInfo)
  User.findOneAndUpdate({username : userInfo.username},userInfo,(error,updated)=>{
    if(updated)
    {
      console.log("Update successully!")
      resp.send({message:1})
    }
    else
    {
      console.log("ERROR")
      resp.send({message:0})
    }
  })
})
routers.post("/updateSubGredditArray",requireLogin,(req,resp)=>{
  console.log("naya daal diya")
  const mainUser = req.body.currUserToken.existingUser
  const newSubGreddit = req.body.subgredditInfo
  const {username,age,about} = mainUser
  const limitedMainUser = {username,age,about}
  newSubGreddit.followers.push(limitedMainUser)
  User.findOne({username:mainUser.username})
  .then((result1)=>{
    result1.mysubgreddit.push(newSubGreddit)
    result1.save()
    resp.send({message:1})
  })
  .catch((error)=>{
    console.log(error)
    resp.send({message:0})
  })
})
routers.post('/getSubGredditInfo',requireLogin,(req,resp)=>{
      const currUserToken = req.body.currUserToken;
      User.findOne({username:currUserToken.existingUser.username},(err,result1)=>{
        if(result1)
        {
          //console.log("dola aaya..")
          //console.log(result1)
          resp.send({message:result1.mysubgreddit});
        }
        else
        {
          //console.log("dola ni aaya dola..")
          resp.send({error:1});
          console.log(err);
        }
      })
})
routers.post('/getParticularSubgredditInfo',requireLogin, async (req,resp)=>{
  console.log("Backend aa gya!")
  const subgredditname = req.body.name
  const mainUser = req.body.currUserToken.existingUser
  console.log(mainUser.username)
  console.log("SUBGREDDIT NAME: "+subgredditname)
  const user = await User.findOne({ mysubgreddit: { $elemMatch: { name: subgredditname } } });
  if (user !== null && user !== undefined) {
    const subredditInfo = user.mysubgreddit.find((subreddit) => subreddit.name === subgredditname);
    console.log(subredditInfo);
    resp.send({message: subredditInfo});
  } else {
    resp.send({message: 'User not found'});
  }
})
routers.post("/updatePostArray", requireLogin, async (req, resp) => {
  console.log("post daal rha hu");
  const mainUser = req.body.currUserToken.existingUser;
  const newPost = req.body.postInfo;
  const subgredditname = req.body.name;
  const user = await User.findOne({ username: mainUser.username });
if (!user) {
  return resp.send({message:0});
}

const subgreddit = user.mysubgreddit.find(s => s.name === subgredditname);
if (!subgreddit) {
  return resp.send({message:0});
}
// console.log(newPost)
// console.log(subgreddit.posts)
subgreddit.posts.push(newPost);user.markModified('mysubgreddit');
user.markModified('mysubgreddit');
await user.save();
console.log(subgreddit.posts)
resp.send({ message:1});

});
routers.post("/deletePost", requireLogin, async (req, resp) => {
  const mainUser = req.body.currUserToken.existingUser;
  const subgredditname = req.body.postedin;
  const id = req.body.id;
  const user = await User.findOne({ username: mainUser.username });
  if (!user) {
    return resp.send({ message: 0 });
  }

  const subgreddit = user.mysubgreddit.find((s) => s.name === subgredditname);
  if (!subgreddit) {
    return resp.send({ message: 0 });
  }

  subgreddit.posts = subgreddit.posts.filter((post) => post.id !== id);
  user.markModified("mysubgreddit");
  await user.save();
  resp.send({ message: 1 });
});
routers.post("/savePosts", requireLogin, async (req, resp) => {
  const mainUser = req.body.currUserToken.existingUser;
  const subgredditname = req.body.postedin;
  const id = req.body.id;
  console.log(mainUser)
  console.log(subgredditname)
  console.log(id)
  const user = await User.findOne({ username: mainUser.username });
  if (!user) {
    return resp.send({ message: 0 });
  }

  const subgreddit = user.mysubgreddit.find((s) => s.name === subgredditname);
  if (!subgreddit) {
    return resp.send({ message: 0 });
  }

  const postToSave = subgreddit.posts.find((post) => post.id === id);
  console.log(postToSave)
  if (!postToSave) {
    return resp.send({ message: 0 });
  }
  if (!user.savedposts.some((post) => post.id === id)) {
    user.savedposts.push(postToSave);
    user.markModified("savedposts");
    await user.save();
    resp.send({ message: 1 });
  } else {
    resp.send({ message: 2 });
  }
});
routers.post("/unsavePosts", requireLogin, async (req, resp) => {
  const mainUser = req.body.currUserToken.existingUser;
  const id = req.body.id;
  console.log(mainUser);
  console.log(id);
  
  const user = await User.findOne({ username: mainUser.username });
  if (!user) {
    return resp.send({ message: 0 });
  }

  const postIndex = user.savedposts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return resp.send({ message: 0 });
  }

  user.savedposts.splice(postIndex, 1);
  user.markModified("savedposts");
  await user.save();
  resp.send({ message: 1 });
});

routers.post("/deleteSubgreddit", requireLogin, async (req, resp) => {
  const mainUser = req.body.currUserToken.existingUser;
  const subgredditname = req.body.name;

  const user = await User.findOne({ username: mainUser.username });
  if (!user) {
    return resp.send({ message: 0 });
  }

  const subgredditIndex = user.mysubgreddit.findIndex((s) => s.name === subgredditname);
  if (subgredditIndex === -1) {
    return resp.send({ message: 0 });
  }

  user.mysubgreddit.splice(subgredditIndex, 1);
  user.markModified("mysubgreddit");
  await user.save();
  resp.send({ message:1});
});
routers.post("/updateReportArray",requireLogin,async (req,resp)=>{
  const reportingUser = req.body.currUserToken.existingUser
  const creatorUser = req.body.creator
  const reportInfo = req.body.reportInfo
  const postID = req.body.id
  const subgredditname = req.body.name
  const user  = await User.findOne({username:creatorUser})
  if (!user) {
    return resp.send({message:0});
  }
  
  const subgreddit = user.mysubgreddit.find(s => s.name === subgredditname);
  if (!subgreddit) {
    return resp.send({message:0});
  }
  // console.log(newPost)
  // console.log(subgreddit.posts)
  subgreddit.reports.push(reportInfo);user.markModified('mysubgreddit');
  user.markModified('mysubgreddit');
  await user.save();
  console.log(subgreddit.reports)
  resp.send({ message:1});
  
  });
module.exports = routers;

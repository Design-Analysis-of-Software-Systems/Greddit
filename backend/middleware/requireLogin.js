const JWTSECRETKEY = "qwertyuiop1234567890"
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')
module.exports = (req,resp,next)=>{
    // authorization ===  Bearer <token number>
    // console.log(req.body.token + "inside requireLogin")
    // console.log("authorize ho rha hai....")
    const authorization  = req.body.token
    // console.log(authorization)
    if(!authorization){
        return resp.send({error:"You aren't authorized to visit this page.."})
    }
    else
    {
        try{
            const currUserToken = jsonwebtoken.verify(authorization,JWTSECRETKEY)
            req.body.currUserToken = currUserToken;
            // console.log(currUserToken)
            // console.log("authorize ho gya")
            next();
        }
        catch(error)
        {
            console.log(error)
        }
    }
}
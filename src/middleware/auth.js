const jwt = require('jsonwebtoken');

const db = require('../db');

const userAuth = (req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
       return res.status(401).json({error:"Please authenticate!"});

    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,'abcd123',(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Please authenticate!!"})
        }
        const {_id} = payload;
       
        db.query("SELECT * from users WHERE user_id = $1",[_id])
        .then(userdata=>{
            if(!userdata.rows.length){
              return res.status(401).json({error:"Please authenticate!!!"});
            }
            req.currentUser = userdata.rows[0];
            next();
        }).catch(e=>{
            res.status(401).json({error: "You are not allowed to be here!!"});
        })
    })
}

const adminAuth = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
       return res.status(401).json({error:"Please authenticate!!"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,'abcd123',(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Please authenticate!!"})
        }
        const {_id} = payload;
        if(_id === 'admin'){
            req.currentUser = 'admin';
            next();
        }
        else{
            res.status(401).json({error: "Some error occured!! Try logging in again !"});
        }
    })
}

module.exports = {
    userAuth,
    adminAuth
}


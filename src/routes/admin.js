const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const db = require('../db');
const {adminAuth} = require('../middleware/auth');

router.post('/admin', async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const {rows} = await db.query("SELECT * from admin where email = $1",[email]);
        if(!rows.length){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }
        if(password !== rows[0].password){
            return res.status(422).json({error: "Invalid Email or password!!!"});
        }
        const token = jwt.sign({_id: "admin"}, 'abcd123');
        res.status(200).json({token, user:{email}});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !!"})
    }
});

router.post('/autologinadmin', adminAuth , async(req, res)=>{
    const first_name = req.currentUser;
    res.status(200).json({user: {first_name}});
});

router.get('/search/:name',adminAuth,async(req, res)=>{
    const {name} = req.params;
    if(!name){
        return res.status(422).json({nouser: "Add name to search!"});
    }
    try{
        const {rows} = await db.query("SELECT first_name, last_name, email, address, birth_date FROM users WHERE first_name ILIKE $1 OR"+
                                        " last_name ILIKE $2",[`%${name}%`, `%${name}%`]);
        if(!rows.length){
            return res.status(404).json({nouser: "No User Found!!"});
        }
        res.status(200).json({users: rows});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !!"})
    }
})

router.get('/users', adminAuth, async(req, res)=>{
    try{
        const {rows} = await db.query("SELECT first_name, last_name, email, address, birth_date, phone FROM users");
        if(!rows.length){
            return res.status(404).json({error: "No User Found!! "});
        }
        res.status(200).json({users: rows});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !!"})
    }
})

module.exports = router;
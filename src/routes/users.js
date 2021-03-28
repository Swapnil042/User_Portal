const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const db = require('../db');
const {prepareName, checkEmail} =require('../utility_functions');
const {userAuth} = require('../middleware/auth');

router.post('/signup', async(req, res)=>{
    const {first_name, last_name, email, password, address, birth_date,phone} = req.body;

    if(!first_name || !last_name || !email || !password || !birth_date || !address || !phone){
        return res.status(422).json({error: 'Please add all fields'});
    }
    const fName = prepareName(first_name);
    const lName = prepareName(last_name);
    let isValid = checkEmail(email);
    if(!isValid){
        return res.status(422).json({error: "INVALID EMAIL !!"});
    }
    try{
        const userWithEmail = await db.query("SELECT * FROM users WHERE email = $1",[email]);
        if(userWithEmail.rows.length){
            return res.status(422).json({error:"Email already exists into our system !!"});
        }
        const hashedPass = await bcrypt.hash(password, 8);
        const {rows} = await db.query("INSERT INTO users (first_name, last_name, address, birth_date, email, phone,password) values" +
                                " ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",[fName, lName, address, birth_date, email, phone,hashedPass,]);
        if(!rows.length){
            return res.status(500).json({error: "Some error occured !!!!"});
        }
        res.status(200).json({message: "Account created successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Some error occured !! Please check all informations"});
    }
});

router.post('/signin', async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const {rows} = await db.query("SELECT * from users where email = $1",[email]);
        if(!rows.length){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }
        const doMatch = await bcrypt.compare(password, rows[0].password);
        if(!doMatch){
            return res.status(422).json({error: "Invalid Email or password!!"});
        }

        const token = jwt.sign({_id: rows[0].user_id}, 'abcd123');
        const {first_name, last_name, address, birth_date } = rows[0];
        res.status(200).json({token, user:{first_name, last_name,address, birth_date, email}});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Some Error occured !!"})
    }
});

router.post('/autologin', userAuth, async(req, res)=>{
    res.status(200).json({user: req.currentUser})
});

router.get('/profile', userAuth, async(req, res)=>{
    const {first_name, last_name, email,address, birth_date, phone} = req.currentUser;
    const formattedBday = birth_date.toString().slice(4,15);
    res.status(200).json({user: [['First Name', first_name], ["Last Name",last_name], ["Address", address], ["Email", email],
                                ['Phone', phone],["Date of Birth", formattedBday]]});
})

router.post('/password', userAuth, async(req, res)=>{
    const {currentPass, newPassword} = req.body;
    if(!currentPass || !newPassword){
        return res.status(422).json({error: "Please add all fields"});
    }
    try{
        const doMatch = await bcrypt.compare(currentPass, req.currentUser.password);
        if(!doMatch){
            return res.status(422).json({error: "Wrong Password !! "});
        }
        const hashedPass = await bcrypt.hash(newPassword, 8);
        const {rows} = await db.query("UPDATE users SET password = $1 RETURNING *", [hashedPass]);
        if(!rows.length){
            return res.status(500).json({error: "Some Error occured!!"});
        }
        res.status(200).json({message: "Password Updated Successfully"});
    }catch(err){
        res.status(500).json({error: "Some Error occured"});
    }
})

module.exports = router;
import express from "express";
import bcrypt from 'bcrypt'

const router = express.Router();

import User from '../models/User.js'



//REGISTER a new user

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    try {
        //encrypting password using node package bcrypt here 10 is the number of times the hashing is performed over the password


        const hashpwd = await bcrypt.hash(password, 10)

        //creating new user from given inputs as per the scehma 
        const newUSer = new User({
            username: username,
            email: email,
            password: hashpwd
        })

        //registering the user and returning response on success
        const user = await newUSer.save();
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        //check if user exists
        const user = await User.findOne({ email: email });
        !user && res.status(404).json("user not found")

        //check if password is correct

        const validPwd = await bcrypt.compareSync(password,user.password)
        !validPwd && res.status(400).json("Incorrect Password")

        //if both email and password is correct we send 200 status code
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }

})



export default router
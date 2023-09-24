import User from '../models/User.js'
import express from "express";
const router = express.Router()
import bcrypt from 'bcrypt'

//UPDATE USER
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
        try {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
  
      try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
  
        if (!user) {
          return res.status(404).json("User not found");
        }
  
        res.status(200).json("Account details have been updated");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(403).json("Don't have access to update");
    }
  });

//DELETE USER

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
  
      try {
        const user = await User.findByIdAndDelete(req.params.id);
  
        if (!user) {
          return res.status(404).json("User not found");
        }
  
        res.status(200).json("Account has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(500).json("Can delete your account only");
    }
  });

//GET A USER

router.get('/:id',async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(404).json("No user found")
        }
        const {password,isAdmin,updatedAt,...other} = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})

//FOLLOW A USER

router.put('/:id/follow', async (req, res) => {
    try {
      if (req.body.userId === req.params.id) {
        return res.status(403).json("Can't perform self follow");
      }
  
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
  
      if (!user) {
        return res.status(404).json("User to follow not found");
      }
  
      if (!currentUser) {
        return res.status(404).json("Current user not found");
      }
  
      if (user.followers.includes(req.body.userId)) {
        return res.status(403).json("Already following this user");
      }
  
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
  
      return res.status(200).json("User has been followed");
    } catch (err) {
      return res.status(500).json(err.message || "Internal server error");
    }
  });
  


//UNFOLLOW A USER

router.put('/:id/unfollow', async (req, res) => {
    try {
      if (req.body.userId === req.params.id) {
        return res.status(403).json("Can't perform self unfollow");
      }
  
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
  
      if (!user) {
        return res.status(404).json("User to follow not found");
      }
  
      if (!currentUser) {
        return res.status(404).json("Current user not found");
      }
  
      if (!user.followers.includes(req.body.userId)) {
        return res.status(403).json("Not following this user");
      }
  
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
  
      return res.status(200).json("User has been unfollowed");
    } catch (err) {
      return res.status(500).json(err.message || "Internal server error");
    }
  });


export default router
import Post from '../models/Post.js'
import User from '../models/User.js';

import express from 'express'
const router = express.Router();

//CREATE A POST

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save(); // Use await here

        // Send a JSON response indicating success
        res.status(200).json({ message: "Post published successfully", post: savedPost });
    } catch (err) {
        res.status(500).json({ error: err.message || "Internal error" });
    }
});

//UPDATE A POST
router.put('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(req.params.id)
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.userId === req.body.userId) {
        // Update the post using findByIdAndUpdate
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        
        if (!updatedPost) {
          return res.status(500).json({ message: "Failed to update post" });
        }
  
        return res.status(200).json({ message: "Post has been updated", updatedPost });
      } else {
        return res.status(403).json({ message: "Not your post" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message || "Internal error" });
    }
  });
  
//DELETE A POST

router.delete('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      console.log(req.params.id)
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.userId === req.body.userId) {
        // Update the post using findByIdAndUpdate
        const updatedPost = await Post.findByIdAndDelete(req.params.id);
        
        if (!updatedPost) {
          return res.status(500).json({ message: "Failed to delete the post" });
        }
  
        return res.status(200).json({ message: "Post has been deleted"});
      } else {
        return res.status(403).json({ message: "Not your post" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message || "Internal error" });
    }
  });

//LIKE & DISLIKE A POST
router.put('/:id/like',async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId))
        {
           await post.updateOne({$push: {likes:req.body.userId}})
           res.status(200).json("Post liked")
        }
        else{
            await post.updateOne({$pull: {likes:req.body.userId}})
            res.status(200).json("Post disliked")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET A POST
router.get('/:id',async(req,res)=>{
    try {
        const postRes = await Post.findById(req.params.id)
        res.status(200).json({message:"data fetched successfully", postDetail:postRes})
    } catch (err) {
        res.status(500).json({message:err || "Internal error"})
    }
})
//GET ALL TIMELINE POST
router.get("/timeline/all", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    const timelinePosts = userPosts.concat(...friendPosts);

    res.json(timelinePosts);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

  
export default router
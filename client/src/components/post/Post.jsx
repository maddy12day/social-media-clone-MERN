import './Post.scss'
import { MoreVert } from '@mui/icons-material'
import { Users } from '../../dummydata'
import { useState } from 'react'

export const Post = ({post}) => {
    const [like, setLike] = useState(post.like)
    const [islike, setIslike] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const likeHandler=()=>{
        setLike(!islike?like+1:like-1)
        setIslike(!islike)
    }
  return (<>
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <img src={PF+Users.filter((u)=>u.id === post.userId)[0].profilePicture} alt="" className="postProfileImg" />
                    <span className="postUsername">{Users.filter((u)=>u.id === post.userId)[0].username}</span>
                    <span className="postDate">{post.date}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF + post.photo} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`} alt="" className="likeIcon" onClick={likeHandler}/>
                    <img src="../../assets/heart.png" alt="" className="likeIcon" onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post?.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}


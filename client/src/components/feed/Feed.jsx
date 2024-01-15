import './Feed.scss'
import { Share } from '../share/Share'
// import { Post } from '../post/Post'
import axios from 'axios'
import { useEffect } from 'react'

export const Feed = () => {
  // const[posts,setPosts] = useState([]);
  useEffect(()=>{
    const fetchPost = async()=>{
      const res = await axios.get("/posts/timeline/65a40ad978b30d64d0e443ed");
      console.log(res.data);
    }
    fetchPost();
  },[])

  return (<>
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {/* {Posts.map((element)=>(
          <Post key={element.id} post={element}/>
        ))} */}
      </div>
    </div>
  </>)
}

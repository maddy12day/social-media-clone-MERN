import './Feed.scss'
import { Share } from '../share/Share'
import { Post } from '../post/Post'
import { Posts } from '../../dummydata'
export const Feed = () => {
  return (<>
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {Posts.map((element)=>(
          <Post key={element.id} post={element}/>
        ))}
      </div>
    </div>
  </>)
}

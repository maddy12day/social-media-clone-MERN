import './Share.scss'
import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'

export const Share = () => {
  return (<>
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src="../../assets/person/1.jpeg" alt="" className="shareProfileImg" />
                <input placeholder='whats is your brain cooking' className="shareInput" />
            </div>

            <hr className="shareHR" />
            
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMedia htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">PHOTO/VIDEO</span>
                    </div>
                    <div className="shareOption">
                        <Label htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">TAG</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor='green' className='shareIcon'/>
                        <span className="shareOptionText">LOCATION</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor='goldenrod' className='shareIcon'/>
                        <span className="shareOptionText">FEELING</span>
                    </div>
                </div>
                <button className="shareButton">SHARE</button>
            </div>
        </div>
    </div>
  </>
  )
}


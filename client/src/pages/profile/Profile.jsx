import './Profile.scss'
import { Feed } from "../../components/feed/Feed"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Topbar } from "../../components/topbar/topbar"
import { Rightbar } from "../../components/rightbar/Rightbar"

export const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (<>
        <Topbar />
        <div className="profile">
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img
                            className="profileCoverImg"
                            src={`${PF}post/3.jpeg`}
                            alt=""
                        />
                        <img
                            className="profileUserImg"
                            src="../../assets/person/7.jpeg"
                            alt=""
                        />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Safak Kocaoglu</h4>
                        <span className="profileInfoDesc">Hello my friends!</span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <Rightbar profile />
                </div>
            </div>
        </div>
    </>
    )
}

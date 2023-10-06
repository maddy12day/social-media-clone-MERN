import '../../styles/Home.scss'
import { Feed } from "../../components/feed/Feed"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { Topbar } from "../../components/topbar/topbar"
import { Rightbar } from "../../components/rightbar/Rightbar"

export const Home = () => {
    return (<>
        <Topbar />
        <div className="homeContainer">
            <Sidebar />
            <Feed/>
            <Rightbar/>
        </div>
    </>
    )
}
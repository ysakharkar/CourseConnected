import MenuBar from "./MenuBar";
import "./Dashboard.css";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Dashboard = () => {
    
    return (
        <div>
            <MenuBar/>
            <img src="" className='img'/>
            <div>
                <div className="topPartDashboard">
                    <div className="welcomeToApp">
                        Welcome to CourseConnected
                    </div>
                </div>
                <div className="middlePartDashboard">
                    <div className="imageForDashboard-container">
                        <img className="imageForDashboard" src="https://cdn.discordapp.com/attachments/875928959920005168/876262151214489630/logo.png" alt="" />
                    </div>
                </div>
                <div className="bottomPartDashboard">
                    <div className="tutorialToNavigate">
                        Please use the menu bar on the top of your screen to navigate through your options
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

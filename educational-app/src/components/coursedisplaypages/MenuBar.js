import { useHistory } from "react-router-dom";
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "./MenuBar.css"

const MenuBar = ({ link1,link2,link3,link4 }) => {
    let history = useHistory();
    const loginClick = () => {history.push("/login")}
    const registerClick = () => {history.push("/registration")}
    
    const bold = {fontWeight: "bold"}
    const normal = {fontWeight: "normal"}
    const buttonstyle =  {cursor:"pointer"}

    const [username, setUsername] = useState([])
    const [loginstatus, setLoginstatus] = useState(true)


    const fetchBookmarks = () =>{
        const userToken = window.localStorage.getItem("token")
         axios.post("http://localhost:3001/bookmark", {
             _id: userToken,
    }).then(response=>{
        setUsername(response.data.username)
    })};

    const deleteToken = () => {
        window.localStorage.removeItem('token');
        history.push("/login")
    }

    useEffect(() => {
        fetchBookmarks()

        const userToken = window.localStorage.getItem("token")
        if (userToken == null) {
           setLoginstatus(false)
        }
    }, [])

    return (
        <div className='menubar'>
            <div className='leftSideMenuBar'>
            <a href="/">
                <img className="logo"  src="https://cdn.discordapp.com/attachments/875928959920005168/876262151214489630/logo.png" alt="logo" />
            </a>
            <a className="popularCourses" style={link1 ? (bold) : (normal)} href="/popular-courses">Popular Courses</a>
            <a className="bookmarkedCourses"    style={link2 ? (bold) : (normal)} href="/bookmarked">Bookmarked Courses</a>
            <a className="yourCourses" style={link3 ? (bold) : (normal)} href="/your-courses">Your Courses</a>
            <a className="yourCourses" style={link4 ? (bold) : (normal)} href="/course-creation">Course Creation</a>
            </div>
            
            <div className='rightSideMenuBar'>
            <img className="searchIcon" src="https://cdn.discordapp.com/attachments/875928959920005168/876289495476076544/search.png" alt="search icon" />
            <input className="search" type="text" name="" placeholder="  Search..."/>
            <a className="loginMenuBar" style = {buttonstyle} onClick={loginstatus ? {} : (loginClick)}>{loginstatus ? "" : "Login"}</a>
            <a className="registerMenuBar" style = {buttonstyle} onClick={loginstatus ? {} : (registerClick)}>{loginstatus ? "" : "Register"}</a>
            <a className="registerMenuBar" style = {buttonstyle} onClick={loginstatus ? (deleteToken) : {}}>{loginstatus ? (username) : ("")}</a>

            </div>
        </div>
    )
}

export default MenuBar

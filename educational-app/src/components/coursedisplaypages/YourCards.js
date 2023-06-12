import MenuBar from "./MenuBar"
import CardLoader from "./CardLoader"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router";

const BookmarkedCards = () => {
    let history = useHistory();
    
    const [idlist, setIdlist] = useState([])

    const fetchBookmarks = () =>{
        const userToken = window.localStorage.getItem("token")
         axios.post("http://localhost:3001/bookmark", {
             _id: userToken,
    }).then(response=>{
        setIdlist(response.data.created)
    })};

    useEffect(() => {
        const userToken = window.localStorage.getItem("token")
        if (userToken == null) {
            history.push("/login")
        }
        
        fetchBookmarks()
    }, [])
    
    return (
        <div>
            <MenuBar link3="true"/>

            <div className="cardLoaderTwo"><CardLoader idList = {idlist}/></div>
        </div>
    )
}

export default BookmarkedCards

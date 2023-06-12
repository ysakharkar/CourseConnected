import MenuBar from "./MenuBar"
import CardLoader2 from "./CardLoader2"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useHistory } from "react-router";

const BookmarkedCards = () => {
    let history = useHistory();

    const readPopular = () =>{
         axios.get("http://localhost:3001/popular", {
    }).then(response => { 
        setIdlist(response.data)
        console.log(idlist[0]._id)
    })
    .catch(error => {
        //console.log(error.response)
    })};

    const [idlist, setIdlist] = useState([])

    useEffect(() => {
        const userToken = window.localStorage.getItem("token")
        if (userToken == null) {
            history.push("/login")
        }
        
        readPopular()
    }, [])
    
    return (
        <div>
            <MenuBar link1="true"/>
            
            <div className="cardLoaderTwo"><CardLoader2 idList = {idlist}/></div>
        </div>
    )
}

export default BookmarkedCards

import CardDataFetcher from "./CardDataFetcher"
import { useEffect, useState } from "react"
import axios from "axios"
import "./CardLoader.css"

const CardLoader = ({ idList }) => {

    const [bookmarklist, setBookmarklist] = useState([])

    useEffect(() => {
        fetchBookmarks()
    }, [])

    const fetchBookmarks = () =>{
        const userToken = window.localStorage.getItem("token")
         axios.post("http://localhost:3001/bookmark", {
             _id: userToken,
    }).then(response=>{
        setBookmarklist(response.data.bookmarked)
    })};

    const updateBookmarks = (id) =>{
        axios.put("http://localhost:3001/bStatus", {
            bookmarked:bookmarklist,
            _id : id,
        }).then(response=>{
            console.log(response);
        })};

    const clickedBookmark = (id) => {
        if(bookmarklist.includes(id)){
            console.log("remove "+ id)
            bookmarklist.splice(bookmarklist.indexOf(id), 1);
        }
        else{
            console.log("add "+ id)
            bookmarklist.push(id);
        }

        updateBookmarks(window.localStorage.getItem("token"))
    }

    const isBookmarked = (id) =>{
        if(bookmarklist.includes(id)){
            return true;
        }
        else
            return false;
    }

    return (
        <div className="CardHolder">
            {idList.map((id) => 
            
                <CardDataFetcher id={id} bookmarkStatus={isBookmarked(id)} bookmarkClick={() => clickedBookmark(id)} />
            
            )}
        </div>
    )
}

export default CardLoader

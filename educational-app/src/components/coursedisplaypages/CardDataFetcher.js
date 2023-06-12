import MenuCard from "../menucards/MenuCard"
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import BookmarkedCards from "./YourCards";
import "./CardLoader.css"

const CardDataFetcher = ( {id, bookmarkStatus, bookmarkClick} ) => {
    
    const [responseA, setResponseA] = useState([])
    const [rateList, setRateList] = useState([])
    const [numRates, setNumRates] = useState(0)
    const userstoken = window.localStorage.getItem("token")

    const updateRating = (Tid, myrating, myrates) =>{
        axios.put("http://localhost:3001/rStatus", {
            rating: myrating,
            rates: myrates,
            _id : Tid,
        }).then(response=>{
            console.log(response);
        })};

    const fetchCourses = (paramID) =>{  
        const userToken = paramID//PLUG IN YOUR course ids here
         axios.post("http://localhost:3001/courseData", {
             _id: userToken,
    }).then(response=>{
        setResponseA(response.data);
        setRateList(response.data.rates)
        setNumRates(response.data.rating)
    })};

    useEffect(() => {//fetch starting data
        fetchCourses(id)
    }, [])

    const upvote = () => {  
        if (rateList.includes(userstoken)){
            rateList.splice(rateList.indexOf(userstoken), 1)
        }
        else{
        rateList.push(userstoken)
        }
        console.log(rateList)
        setNumRates(rateList.length);
        console.log(rateList.length)
        updateRating(id, rateList.length, rateList)
    }

    return (
        <div className="MenuCardWrapper">
            <MenuCard
            id = {id}
            imageURL = {responseA.imgURL}
            rating = {numRates}
            title = {responseA.title}
            author = {responseA.author}
            text = {responseA.description}
            bookmarkStatus = {bookmarkStatus}
            date = {responseA.dateOfCreate}
            level = {responseA.level}
            onBookmarkClick = {bookmarkClick}
            upvote = {upvote}
            downvote = {console.log("downvote")}
            />
        </div>
    )
}

export default CardDataFetcher

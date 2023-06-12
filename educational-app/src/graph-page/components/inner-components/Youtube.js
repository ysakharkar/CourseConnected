import React from 'react'
import youtube_image from '../../images/youtube.svg'
import '../../styling/graph-page.css'

const Youtube = ({contentIndex, unitIndex, units}) => {

    console.log(contentIndex)
    console.log(units[unitIndex].contents[contentIndex].description)

    return (
        <div className = "element">
            <div className = "div-left">
                <img className = "image-left" src = {youtube_image}></img>
            </div>
            <div className = "div-right">
                <h2 className = "div-right-title">{units[unitIndex].contents[contentIndex].title}</h2>
                <p className = "div-right-description">{units[unitIndex].contents[contentIndex].description}</p>
            </div>
        </div>
    )
}

export default Youtube

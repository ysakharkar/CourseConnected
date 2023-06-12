import React from 'react'
import text_image from '../../images/notes.svg'
import '../../styling/graph-page.css'

const Text = ({contentIndex, unitIndex, units}) => {
    return (
        <div className = "element">
            <div className = "div-left">
                <img className = "image-left" src = {text_image}></img>
            </div>
            <div className = "div-right">
                <h2 className = "div-right-title">{units[unitIndex].contents[contentIndex].title}</h2>
                <p className = "div-right-description">{units[unitIndex].contents[contentIndex].description}</p>
            </div>
        </div>
    )
}

export default Text

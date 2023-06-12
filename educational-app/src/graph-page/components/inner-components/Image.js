import React from 'react'
import image_image from '../../images/image.svg'
import '../../styling/graph-page.css'

const Image = ({contentIndex, unitIndex, units}) => {
    return (
        <div className = "element">
            <div className = "div-left">
                <img className = "image-left" src = {image_image}></img>
            </div>
            <div className = "div-right">
                <h2 className = "div-right-title">{units[unitIndex].contents[contentIndex].title}</h2>
                <p className = "div-right-description">{units[unitIndex].contents[contentIndex].description}</p>
            </div>
        </div>
    )
}

export default Image

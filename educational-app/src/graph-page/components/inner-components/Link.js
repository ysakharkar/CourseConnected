import React from 'react'
import link_image from '../../images/link.svg'
import '../../styling/graph-page.css'

const Link = ({contentIndex, unitIndex, units}) => {

    console.log(contentIndex)

    return (
        <div className = "element">
            <div className = "div-left">
                <img className = "image-left" src = {link_image}></img>
            </div>
            <div className = "div-right">
                <h2 className = "div-right-title">{units[unitIndex].contents[contentIndex].title}</h2>
                <p className = "div-right-description">{units[unitIndex].contents[contentIndex].description}</p>
            </div>
        </div>
    )
}

export default Link

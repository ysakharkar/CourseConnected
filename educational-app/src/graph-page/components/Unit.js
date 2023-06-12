import React from 'react'
import { useEffect, useState } from 'react'

import Youtube from './inner-components/Youtube'
import Link from './inner-components/Link'
import Text from './inner-components/Text'
import Image from './inner-components/Image'
import ChapterAddPage from './ChapterAddPage'

import '../styling/graph-page.css'

const Unit = ({unitIndex, units, setUnits, addMenu, setAddMenu, addPageUnit, setAddPageUnit}) => {
    
    const [unitName, setUnitName] = useState(units[unitIndex].name);
    const [menuState, setMenuState] = useState(addMenu);


    useEffect(() => {
        
    });

    return (
        <div className = "unit-outer-div">
            <div className = "upper-lower-bar"></div>
            <div>
                <h1 className = "unit-title">{unitName}</h1>
            </div>
            <div className = "unit-outer-contents">
                {
                    units[unitIndex].contents.map((content, id) => {
                        if (content.type === "youtube") {
                            return <Youtube key = {id} contentIndex = {id} unitIndex = {unitIndex} 
                            units = {units}/>
                        }
                        else if (content.type === "link") {
                            return <Link key = {id} contentIndex = {id} unitIndex = {unitIndex} 
                            units = {units}/>
                        }
                        else if (content.type === "text") {
                            return <Text key = {id} contentIndex = {id} unitIndex = {unitIndex} 
                            units = {units}/>
                        }
                        else if (content.type === "image") {
                            return <Image key = {id} contentIndex = {id} unitIndex = {unitIndex} 
                            units = {units}/>
                        }
                    })
                }
            </div>
            <div className = "unit-button-holder">
            <button className = "unit-button" onClick = {() => {
                setAddMenu(true)
                setAddPageUnit(unitIndex)
                console.log(unitIndex)
            }} units = {units} 
            unitIndex = {unitIndex}
            >
                Add Chapter Menu
            </button>
            </div>



            <div className = "upper-lower-bar"></div>
        </div>
    )
}

export default Unit
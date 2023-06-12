import React from 'react'
import { useState, useEffect } from 'react'
import '../styling/graph-page.css'

// Import Components to Add Chapters
import AddYoutube from './add-chapter-components/AddYoutube'
import AddLink from './add-chapter-components/AddLink'
import AddText from './add-chapter-components/AddText'
import AddImage from './add-chapter-components/AddImage'
import axios from 'axios'

const ChapterAddPage = ({units, setUnits, addPageUnit, addMenu, setAddMenu, id_number}) => {

    const [inputType, setInputType] = useState("placeholder");
    const [sentToServerObject, setSentToServerObject] = useState({});

    const findInputType = (event) => {
        setInputType(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }

    useEffect(() => {
        if (Object.keys(sentToServerObject).length === 0) {
            console.log("Do Nothing");
            console.log("hello")
        }
        else {
            let tempContents = units;
            console.log(tempContents)
            let tempArray = tempContents[addPageUnit].contents.concat(sentToServerObject);
            tempContents[addPageUnit].contents = tempArray;
            const finalArray = tempContents;

            axios.put("http://localhost:3001/unitAdd", {
                unit: finalArray,
                _id : id_number,
            });

            setUnits([...finalArray]);
        }
    }, [sentToServerObject])

    const renderInputType = () => {
        if (inputType === "placeholder") {
            return <p></p>
        }
        else if (inputType === "youtube") {
            return <AddYoutube sentToServerObject = {sentToServerObject} setSentToServerObject = {setSentToServerObject}/>
        }
        else if (inputType === "link") {
            return <AddLink sentToServerObject = {sentToServerObject} setSentToServerObject = {setSentToServerObject}/>
        }
        else if (inputType === "text") {
            return <AddText sentToServerObject = {sentToServerObject} setSentToServerObject = {setSentToServerObject}/>
        }
        else if (inputType === "image") {
            return <AddImage sentToServerObject = {sentToServerObject} setSentToServerObject = {setSentToServerObject}/>
        }
    }

    return (
        <div className = "component-add-page">
            <h1>{"Add Component to " + units[addPageUnit].name}</h1>
            <form>
                <select id="type" onChange = {findInputType}>
                    <option value="placeholder"></option>
                    <option value="youtube">Youtube Video</option>
                    <option value="link">Website Link</option>
                    <option value="text">A Paragraph of Notes</option>
                    <option value="image">An Image URL</option>
                </select>
            </form>

            {renderInputType()}

            <button onClick = {() => setAddMenu(false)}>Cancel</button>
        </div>
    )
}

export default ChapterAddPage

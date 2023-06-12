import React from 'react'
import { useState, useEffect } from 'react';

const AddImage = ({sentToServerObject, setSentToServerObject}) => {

    const [tempTitle, setTempTitle] = useState("");
    const [tempDescription, setTempDescription] = useState("");
    const [tempData, setData] = useState("");

    const handleTitleChange = (event) => {
        setTempTitle(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setTempDescription(event.target.value);
    }
    
    const handleLinkChange = (event) => {
        setData(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let chapter = {
            title: tempTitle,
            type: "image",
            description: tempDescription,
            data: tempData
        }

        if (chapter.title === "" || chapter.description === "" || chapter.data === "") {
            alert("No Data Was Inputted");
        }
        else {
            setSentToServerObject(chapter);
        }

    }

    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Title</label>
                    <input value = {tempTitle} onChange = {handleTitleChange}></input>
                <label>Description</label>
                    <textarea value = {tempDescription} onChange = {handleDescriptionChange}></textarea>
                <label>Link</label>
                    <input value = {tempData} onChange = {handleLinkChange}></input>
                <button type="submit">Submit New Chapter</button>
            </form>
        </div>
    )
}

export default AddImage

import React from 'react'
import { useState, useEffect } from 'react';
import '../styling/graph-page.css';
import axios from 'axios'

const UnitAddition = ({units, setUnits, id_number}) => {
    const [unitName, setUnitName] = useState('');
    const [tempUnitName, setTempUnitName] = useState('');

    const handleChange = (event) => {
        setTempUnitName(event.target.value);
        console.log(tempUnitName);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setUnitName(tempUnitName);
        setTempUnitName('');

        const tempUnitObject = {
            name: unitName,
            contents: [
                
            ]
        }
        
        let arrayToPush = units;
        arrayToPush.push(tempUnitObject);
        console.log(arrayToPush);

        
        
        axios.put("http://localhost:3001/unitAdd", {
                unit: arrayToPush,
                _id : id_number,
            });
        
        setUnits(arrayToPush);

    }

    return (
        <div className = "unit-addition-container">
            <form onSubmit = {handleSubmit}>
                <label>Unit Name:</label>
                <input className = "unit-addition-input" value = {tempUnitName} onChange = {handleChange}></input>
                <button className = "unit-addition-button" type = "submit">Submit</button>
            </form>
        </div>
    )
}

export default UnitAddition

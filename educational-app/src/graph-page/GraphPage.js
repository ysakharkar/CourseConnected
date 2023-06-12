// Import Statements
import React from 'react'
import { useEffect, useState } from 'react'
//import { useHistory } from 'react-router';
import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
    ReactFlowProvider
  } from 'react-flow-renderer';
  


// Importing Axios for Communicating with Json-Server and Backend
import axios from 'axios'

// Components Brought In
import ChapterAddPage from './components/ChapterAddPage'
import Unit from './components/Unit'
import UnitAddition from './components/UnitAddition'

// Start of the Actual React App
// Defined by the Functional Component GraphPage
//let history = useHistory();

const GraphPage = () => {

    const id_number = String(window.location.pathname).slice(6,);
    console.log(id_number);

    // UseState Variables
    const [units, setUnits] = useState([])
    const [elements, setElements] = useState([])
    const [courseName, setCourseName] = useState('')
    const [addMenu, setAddMenu] = useState(false);

    // UseState Variables for Adding Components to the Unit (Remember, some messy code due to ChapterAddPage)
    const [addPageUnit, setAddPageUnit] = useState([])

    // useEffect runs when component is re - rendered
    useEffect(() => {
        //Redirects if no token
        const userToken = window.localStorage.getItem("token")
        if (userToken == null) {
         //   history.push("/login")
        }


        axios.post("http://localhost:3001/courseData", {_id: id_number,})
             .then(response=>{
                console.log(response.data);
                setUnits(response.data.unit);
                setCourseName(response.data.title);
            })

        console.log("harambe");
    }, []);

    console.log(units);

    // This useEffect runs when "units" variable changes 
    useEffect(() => {
        console.log("harambe");
        formatElements(units);
    }, [units])

    // Formats everything into the format for ReactFlow component
    const formatElements = (units) => {
        let tempElements = []
        let tempEdges = []
        let idNumber = 1
        let x = 100
        let y = 200
        let iterator = -1;

        for (let i = 0; i < units.length; i++) {
            let tempObject = {
                type: 'default',
                id: idNumber.toString(),
                data: {label: <Unit addMenu = {addMenu} setAddMenu = {setAddMenu} 
                        unitIndex = {i} units = {units} setUnits = {setUnits}
                        addPageUnit = {addPageUnit} setAddPageUnit = {setAddPageUnit}/>},
                sourcePosition: 'right',
                targetPosition: 'left',
                position: {x: x, y: y}
            }
            tempElements = tempElements.concat(tempObject);
            idNumber = idNumber + 1;
            x = x + 500;
            y = y + iterator*100;
            if (iterator === 1) {
                iterator = -1;
            }
            if (iterator === -1) {
                iterator = 1;
            }
        }

        for (let i = 1; i < tempElements.length; i++) {
            let tempID = 'e' + tempElements[i - 1].id + '-' + tempElements[i].id;
            let tempObject = {
                id: tempID,
                source: tempElements[i - 1].id,
                target: tempElements[i].id
            }
            tempEdges = tempEdges.concat(tempObject);
        }

        tempElements = tempElements.concat(tempEdges);
        console.log(tempElements);
        console.log("message here");

        setElements(tempElements);

    }

    const unitCreation = () => {

    }

    return(
        <div>
            <ReactFlowProvider>
            <ReactFlow elements={elements} >
                <div className = "graph-overlay">
                    <div className = "header-div">
                        <h1 className = "graph-page-title">{courseName}</h1>
                    </div>
                    <div className = "second-lower">
                        {addMenu ? <ChapterAddPage id_number = {id_number} setElements = {setElements} units = {units} setUnits = {setUnits} addPageUnit = {addPageUnit} addMenu = {addMenu} setAddMenu = {setAddMenu}/> : <p></p>}
                    </div>
                    <div className = "third-lower">
                        <UnitAddition units = {units} setUnits = {setUnits} id_number = {id_number}/>
                    </div>
                </div>
                <MiniMap />
                <Controls />
            </ReactFlow >
            </ReactFlowProvider>
        </div>
    )
}

export default GraphPage
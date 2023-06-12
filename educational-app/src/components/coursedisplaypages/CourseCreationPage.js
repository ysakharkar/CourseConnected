import axios from "axios"
import { useState, useEffect } from 'react';
import MenuBar from "./MenuBar";
import { useHistory } from "react-router";
import "./CourseCreationPage.css";

const CourseCreationPage = () => {
    //States
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState(5);
    const [dateOfCreate, setDateOfCreate] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [createBy, setCreateBy] = useState("");
    const [yourCourses, setYourCourses] = useState([])
    
    let history = useHistory();
    useEffect(() => {
        
        const userToken = window.localStorage.getItem("token")
        if (userToken == null) {
            history.push("/login")
        }
    }, [])

    useEffect(()=>{
        fetchBookmarks();
        axios.get("http://localhost:3001/read").then((response)=>{
        }); 
    }, []);

    const fetchBookmarks = () =>{
        const userToken = window.localStorage.getItem("token")
         axios.post("http://localhost:3001/bookmark", {
             _id: userToken,
    }).then(response=>{
        setYourCourses(response.data.created)
    })};

  //const editDB = ()=>{ //edits database WHEN YOU SPECIFIY THE ID
  //  );
  //};

  //  useEffect(() => {
    //    console.log("I suck")
     //   axios.put("http://localhost:3001/update", {
     //       id: "611813413648ed8d24ede623",
     //       newTitle: "proof of concept",
    //    }
   //     
   // )}, []);
    
   const updateCourses = (id, createdid) =>{
    axios.put("http://localhost:3001/cStatus", {
        created:createdid,
        _id : id,
    })}; 
   
   const addToDB = (event) =>{
        event.preventDefault();
        setCreateBy(window.localStorage.getItem("token"));
        axios.post("http://localhost:3001/insert", {
            title: title,
            subject: subject,
            author: author,
            description: description,
            level: level,
            dateOfCreate: dateOfCreate,
            imgURL: imageurl,
            createdBy: createBy,
        }
        )
        .then(response => {
            console.log(response.data);
            yourCourses.push(response.data)
            updateCourses(window.localStorage.getItem("token"), yourCourses)
            history.push("/your-courses")
        });};



    return (
        <div>
            <MenuBar link4="true"/>
            <div className="titleCourseCreate">
                <h1>Course Creation</h1>
            </div>
            <form className='add-form' onSubmit={addToDB}>
                <div className='form-control'>
                    <label className="titleCourseCreateField">Title: </label>
                    <input className="titleCourseCreateFieldFillable" type='text' placeholder = 'Add title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label className="subjectCourseCreateField">Subject: </label>
                    <input className="subjectCourseCreateFieldFillable" type='text' placeholder = 'Add subject' value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label className="authorCourseCreateField">Author: </label>
                    <input className="authorCourseCreateFieldFillable" type='text' placeholder = 'Add your creator name' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label className="descCourseCreateField">Description: </label>
                    <input className="descCourseCreateFieldFillable" type='text' placeholder = 'Add a description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label className="imgCourseCreateField">Cover Image URL: </label>
                    <input className="imgCourseCreateFieldFillable" type='text' placeholder = 'Add URL of the image' value={imageurl} onChange={(e) => setImageurl(e.target.value)}/>
                </div>
                <div className='form-control'>
                    <label className="levelCourseCreateField">Level: </label>
                    <input className="levelCourseCreateFieldFillable" type='range' min = "1" max = "5" onChange={(e) => setLevel(e.target.value) }/>
                </div>
                <div className='form-control'>
                    <label className="dateCourseCreateField">Date: </label>
                    <input className="dateCourseCreateFieldFillable" type="date" id="dateselect" name="dateselect" onChange={(e) => setDateOfCreate(e.target.value) }/>
                </div>
                <input className="saveCourseButton" type = 'submit' value =  'Save Course'></input>
            </form>
              
        </div>
    )
}

export default CourseCreationPage

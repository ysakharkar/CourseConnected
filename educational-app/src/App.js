import React from 'react'
import MenuCard from './components/menucards/MenuCard';
import CourseCreationPage from './components/coursedisplaypages/CourseCreationPage';
import Login from './components/loginAndRegister/Login';
import LoginError from './components/loginAndRegister/LoginError';
import Register from './components/loginAndRegister/Register'
import RegisterError from './components/loginAndRegister/RegisterError';
import MenuBar from './components/coursedisplaypages/MenuBar';
import { useState, useEffect } from 'react';
import GraphPage from './graph-page/GraphPage'
import { BrowserRouter as Router, Route, useParams } from 'react-router-dom'
import BookmarkedCards from './components/coursedisplaypages/BookmarkedCards';
import YourCards from './components/coursedisplaypages/YourCards';
import PopularCards from './components/coursedisplaypages/PopularCards';
import Dashboard from './components/coursedisplaypages/Dashboard';
import Verification from './components/loginAndRegister/Verification';
//returns id when on url/page/id (Ask Aryan if you don't understand)
const Page = () => {
  const str = String(window.location.pathname).slice(6,)
  return(str)
}

const App = () => {
  
return(
  <Router>
  
    <Route exact path="/">
      <Dashboard/>
    </Route>

    <Route exact path="/your-courses">
      <YourCards/>
    </Route>

    <Route exact path="/popular-courses">
      <PopularCards/>
    </Route>

    <Route exact path="/bookmarked">
      <BookmarkedCards/>
    </Route>

    <Route exact path="/login">
      <Login/>
    </Route>

    <Route exact path="/registration">
      <Register/>
    </Route>
  
    <Route exact path="/course-creation">
      <CourseCreationPage/>
    </Route>

    <Route exact path="/login-failed">
      <LoginError/>
    </Route>

    <Route exact path="/registration-failed">
      <RegisterError/>
    </Route>

    <Route exact path="/verification">
      <Verification/>
    </Route>

    <Route exact path="/page/:page_id">
      <GraphPage />
    </Route>
  
  </Router>
)}

export default App;
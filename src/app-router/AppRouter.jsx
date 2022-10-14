import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import NavBar from '../components/Navbar'
import PersonalCreate from '../pages/PersonalCreate' 
import DepartmentDetail from '../pages/DepartmentDetail'

const AppRouter = () => {

    return (
      <Router>
        <NavBar/>
          <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="" element={<DepartmentDetail/>} />
              <Route path="" element={<PersonalCreate/>} />
          </Routes>
      </Router>
  
    )
  }
  
  export default AppRouter
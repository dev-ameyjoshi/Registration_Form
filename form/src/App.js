import React from 'react'
import './App.css';
// import { AppBar } from '@mui/material';
// import { Link } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup';
// import SignInSide from './Components/login/SignInSide';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Signup />} />
          
        </Routes>



      </Router>


    </>
  );
}

export default App;

import React from 'react'
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Components/Signup';

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
          <Route path="/Registration_Form" element={<Signup />} />
          
        </Routes>



      </Router>


    </>
  );
}

export default App;

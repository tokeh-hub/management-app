import './App.css';
import React,{useRef,useState} from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
function App() {
  return (
    <div className="">
       <Routes>
          <Route element={<Home/>} path='/'/>
          <Route element={<Home />} path='/board'/>
       </Routes>
    </div>
  );
}

export default App;

import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Register from './pages/Register'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
<marquee>A hospital is a healthcare institution that provides medical, surgical, and nursing care to patients who are ill or injured</marquee>
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes> 
          <Route path='/home' index element={<Home></Home>} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/login" element={<Login />} /> */}
         </Routes>
         <Routes>
          <Route path="/auth" element={<Register />} />
         </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' />
      <Footer></Footer>
    </>
  )
}

export default App


// import './App.css'
import './main.css'
import { Suspense } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './Components/ChatBot'
import Loader from './pages/Loader'
// import Profile from './pages/Profile'

const Home = React.lazy(() => import("./pages/Home"));
const Appointment = React.lazy(() => import("./pages/Appointment"));
const Profile = React.lazy(() => import("./pages/Profile"));
const About = React.lazy(() => import("./pages/About"));
const Register = React.lazy(() => import("./pages/Register"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {/* <ChatBot /> */}
        </Suspense>
      </BrowserRouter>

      <ToastContainer position="top-center" />
    </>
  )
}

export default App


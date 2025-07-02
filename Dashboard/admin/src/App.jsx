import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayouts from './layouts/AdminLayouts'
import Doctors from './pages/Doctors'
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AddDoctor from './pages/AddDoctor'
import Login from './pages/Login'

function App() {
  return (
    <div>
      
      <BrowserRouter>
      
      <Routes>
        <Route path='/admin' element ={<AdminLayouts></AdminLayouts>}>
        <Route index element={<Dashboard></Dashboard>}/>
        <Route path='/admin/doctors' element={<Doctors></Doctors>} />
        <Route path='/admin/adddoctor' element={<AddDoctor></AddDoctor>} />
        </Route>
        <Route path='/admin/login' element={<Login></Login>} />
      </Routes>
      <ToastContainer position='top-center'></ToastContainer>
      </BrowserRouter>
    </div>
  )
}

export default App

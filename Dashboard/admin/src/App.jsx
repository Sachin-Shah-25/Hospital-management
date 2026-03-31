import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayouts from './layouts/AdminLayouts'
// import Doctors from './pages/Doctors'
// import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback.jsx'
// import AddDoctor from './pages/AddDoctor'
// import Login from './pages/Login'

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Doctors = React.lazy(() => import("./pages/Doctors"))
const AddDoctor = React.lazy(() => import("./pages/AddDoctor"))
const Login = React.lazy(() => import("./pages/Login"))


function App() {
  return (
    <div>

      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Routes>
              <Route path='/' element={<AdminLayouts></AdminLayouts>}>
                <Route index element={<Dashboard></Dashboard>} />
                <Route path='/admin/doctors' element={<Doctors></Doctors>} />
                <Route path='/admin/adddoctor' element={<AddDoctor></AddDoctor>} />
              </Route>
              <Route path='/admin/login' element={<Login></Login>} />
            </Routes>
            <ToastContainer position='top-center'></ToastContainer>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App

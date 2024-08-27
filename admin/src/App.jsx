import React from 'react'
import Navbar from './compntents/Navbar/Navbar'
import Sidebar from './compntents/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const Url = 'https://food-delivery-backend-md1b.onrender.com';
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes >
          <Route path="/" element={<Add Url={Url}/>} />
          <Route path="/add" element={<Add Url={Url}/>} />
          <Route path="/list" element={<List Url={Url}/>} />
          <Route path="/orders" element={<Orders Url={Url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App

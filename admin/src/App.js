import React from 'react'
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';

function App() {

  const url="https://food-delivery-backend1-riv6.onrender.com"
  return (
    <div className="App">

      <Navbar></Navbar>
      <hr></hr>
      <div className='app-content'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/add' element={<Add url={url}></Add>}></Route>
          <Route path='/list' element={<List url={url}></List>}></Route>
          <Route path='/orders' element={<Orders url={url}></Orders>}></Route>
        </Routes>

      </div>


      
    </div>
  );
}

export default App;

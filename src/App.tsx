import { useState } from 'react';
import './App.css'
import '@fontsource/roboto/300.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import UsuariosPage from './components/usuarios/UsuariosPage';
import InventoryPage from './components/inventory/InventoryPage';
import MainLayout from './layout/MainLayout';
import EmptyLayout from './layout/EmptyLayout';
import Login from './components/auth/login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<MainLayout/>}>
            <Route path='/dashboard/usuarios' element={<UsuariosPage/>}></Route>
            <Route path='/dashboard/inventario' element={<InventoryPage/>}></Route>
          </Route>
          <Route path='/' element={<EmptyLayout/>}>
            <Route path='/login' element={<Login/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

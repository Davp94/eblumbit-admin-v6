import { useState } from 'react';
import './App.css'
import InventoryDetail from './components/inventory/InventoryDetail'
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import UsuariosPage from './components/usuarios/UsuariosPage';
import InventoryPage from './components/inventory/InventoryPage';
import MainLayout from './layout/MainLayout';

function App() {
  const products = [
    {
      "nombre": "Proructo 1",
      "descripcion": "desripcion 1",
      "img": "https.//Dsadsa/"
    },
    {
      "nombre": "Proructo 2",
      "descripcion": "desripcion 2",
      "img": "https.//Dsadsa/"
    },
    {
      "nombre": "Proructo 3",
      "descripcion": "desripcion 3",
      "img": "https.//Dsadsa/"
    },
        {
      "nombre": "Proructo 4",
      "descripcion": "desripcion 4",
      "img": "https.//Dsadsa/"
    },
        {
      "nombre": "Proructo 5",
      "descripcion": "desripcion 5",
      "img": "https.//Dsadsa/"
    }
  ];

  let saludo: string = 'HOLA MUNDO';
  const [saludoHook, setSaludoHook] = useState('HELLO WORLD')
  
  const changeSaludo = () => {
    saludo = 'HOLA MUNDO CHANGED';
    console.log('SALUDO', saludo);
  }

    const changeSaludoHook = () => {
    setSaludoHook('HELLO WORLD CHANGED'); 
    console.log('SALUDO', saludo);
  }
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout/>}></Route>
          <Route path='/usuarios' element={<UsuariosPage/>}></Route>
          <Route path='/inventario' element={<InventoryPage/>}></Route>
          <Route path='/' element={<App/>}></Route>
        </Routes>
      </BrowserRouter>
      
      {/* <InventoryDetail />
      <InventoryDetail /> */}
    </>
  )
}

export default App

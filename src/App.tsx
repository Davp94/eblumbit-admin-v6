import { useState } from 'react';
import './App.css'
import InventoryDetail from './components/inventory/InventoryDetail'

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
      <h1>{saludo}</h1>
      <button onClick={() => changeSaludo()}>CHANGE SALUDO</button>
      <p>--------------------------------</p>
      <h1>{saludoHook}</h1>
      <button onClick={() => changeSaludoHook()}>CHANGE SALUDO HOOK</button>
      <p>------------------------</p>
      {products.map(p=><InventoryDetail product={p} />)}
      
      
      {/* <InventoryDetail />
      <InventoryDetail /> */}
    </>
  )
}

export default App

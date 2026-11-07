import { useState } from 'react';
import './App.css'
import '@fontsource/roboto/300.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router';
import UsuariosPage from './components/usuarios/UsuariosPage';
import RolesPage from './components/roles/RolesPage';
import PermissionsPage from './components/permissions/PermissionsPage';
import InventoryPage from './components/inventory/InventoryPage';
import MainLayout from './layout/MainLayout';
import EmptyLayout from './layout/EmptyLayout';
import Login from './components/auth/login';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import ProfilePage from './components/usuarios/ProfilePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<MainLayout/>}>
              <Route index element={<Navigate to={'/dashboard/usuarios'}/>}></Route>
              <Route path='/dashboard/inventario' element={<InventoryPage/>}></Route>
              <Route path='/dashboard/usuarios' element={<UsuariosPage/>}></Route>
              <Route path='/dashboard/roles' element={<RolesPage/>}></Route>
              <Route path='/dashboard/permisos' element={<PermissionsPage/>}></Route>
              <Route path='/dashboard/profile' element={<ProfilePage/>}></Route>
            </Route>
          </Route>

          <Route element={<PublicRoute/>}>
            <Route element={<EmptyLayout/>}>
              <Route path='/login' element={<Login/>}/>
            </Route>
          </Route>
          <Route path='/' element={<Navigate to={'/dashboard'}/>} />
          <Route path='*' element={<Navigate to={'/dashboard'}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';


import Login from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

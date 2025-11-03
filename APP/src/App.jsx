import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';


import Credit from './Credit';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/credit" element={<Credit />} />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}

import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Layout from './pages/Layout';
import Libro from './pages/Libro';
import Wishlist from './pages/Wishlist';
import AddLibro from './pages/AddLibro';

import Login from './pages/Login';

import { Provider } from 'react-redux';

import store from './redux/store';
import LibreriaPersonale from './pages/LibreriaPersonale';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter basename={window.location.pathname || ''}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/libreriapersonale" element={<LibreriaPersonale />} />
          <Route path="/libro/:id" element={<Libro />} />

          <Route path="/wishlist" element={<Wishlist/>} />
          <Route path="/TEST" element={<AddLibro/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);


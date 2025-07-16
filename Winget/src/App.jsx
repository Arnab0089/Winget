import React from 'react';
import Script from './component/script';
import './App.css';
import Header from './Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/LogIn';
import Signup from './auth/Signup';
import { ToastContainer } from 'react-toastify';
import List from './component/myapp/List';
import MyScript from './component/myapp/MyScript/MyScript';
import FullScript from './component/myapp/MyScript/FullScript';
import About from './component/about/about';

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="">
          <Routes>
            <Route path="/" element={<Script />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/myapps" element={<List />} />
            <Route path="/script/:id" element={<MyScript />} />
            <Route path="/rawfile/:id" element={<FullScript />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

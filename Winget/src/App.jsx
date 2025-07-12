import React from 'react';
import Script from './component/script';
import './App.css';
import Header from './Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/LogIn';
import Signup from './auth/Signup';
import { ToastContainer } from 'react-toastify';
import MyApp from './component/Myapp/AppList';
import MyScript from './component/myapp/MyScript/MyScript';
import FullScript from './component/myapp/MyScript/FullScript';

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
            <Route path="/myapps" element={<MyApp />} />
            <Route path="/script/:id" element={<MyScript />} />
            <Route path="/rawfile/:id" element={<FullScript />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

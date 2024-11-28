import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import App from './App';
import PasswordList from './passwordList'
import reportWebVitals from './reportWebVitals';
import Navigation from './navigation';
import Home from './home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Navigation/>   
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/App" element={<App />} />
      <Route path="/PasswordList" element={<PasswordList />} />
    </Routes>
    <p class="footer">Copyright PassPro 2024</p>
  </Router>
  
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

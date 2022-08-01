import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
import { AuntProvider } from './models/AuthProvider';
import { AuthProvider } from './context/AuthContext';
=======

>>>>>>> origin/ajuste_home
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuntProvider>
    <App />
   </AuntProvider>
    
  </React.StrictMode>
);
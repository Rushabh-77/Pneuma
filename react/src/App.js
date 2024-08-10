import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/registration';
import Login from './pages/login';
import BankPage from './pages/bank';
import CreditCardPage from './pages/creditCard';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/protectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/bank" 
          element={
            <ProtectedRoute>
              <BankPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/creditCard" 
          element={
            <ProtectedRoute>
              <CreditCardPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

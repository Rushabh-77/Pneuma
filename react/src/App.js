import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Register from './pages/registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import BankPage from './pages/bank';
import CreditCardPage from './pages/creditCard';
import Dashboard from './pages/dashboard';


function AppRoutes() {
  let routes = useRoutes([
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/bank", element: <BankPage /> },
    { path: "/creditCard", element: <CreditCardPage /> },
  ]);
  return routes;
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <ToastContainer />
    </Router>
  );
}

export default App;

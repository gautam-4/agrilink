import React, { useState, useContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Cart from './pages/Cart/Cart'
import LoginPopup from './components/LoginPopup/LoginPopup'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify'
import Scan from './pages/Scan/Scan'
import Insurance from './pages/Insurance/Insurance'
import { StoreContext } from './Context/StoreContext'
import AgriBot from './pages/AgriBot/AgriBot'

const App = () => {
  const { token, setToken } = useContext(StoreContext); // Make sure setToken exists in context
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // Check token in localStorage or context
    const savedToken = localStorage.getItem('token'); // assuming you store token in localStorage
    if (savedToken) {
      setToken(savedToken); // set the token back to context
    } else if (!token) {
      setShowLogin(true); // Show login only if token is not present
    }
  }, [token, setToken]);

  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const RootRoute = () => {
    if (token) {
      return <Navigate to="/home" replace />;
    }
    return <></>; // Add landing page component if needed
  };

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <div className='app'>
        <Routes>
          <Route path="/" element={<RootRoute />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute>
                <Verify />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insurance"
            element={
              <ProtectedRoute>
                <Insurance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agribot"
            element={
              <ProtectedRoute>
                <AgriBot />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={token ? "/home" : "/"} replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;

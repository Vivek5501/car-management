import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import CarCreate from './pages/CarCreate';
import CarDetail from './pages/CarDetail';
import CarEdit from './pages/CarEdit';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
            <Route path="/cars/new" element={<ProtectedRoute><CarCreate /></ProtectedRoute>} />
            <Route path="/cars/:id" element={<ProtectedRoute><CarDetail /></ProtectedRoute>} />
            <Route path="/cars/:id/edit" element={<ProtectedRoute><CarEdit /></ProtectedRoute>} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import HomePage from './Landing_page/home/HomePage';
import AboutPage from './Landing_page/about/AboutPage';
 import PricingPage from './Landing_page/pricing/PricingPage';
import ProductPage from './Landing_page/products/ProductPage';
import SupportPage from './Landing_page/support/SupportPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Landing_page/Navbar';
import Footer from './Landing_page/Footer';
import NotFound from './Landing_page/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import DonorPage from './pages/DonorPage';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import OurMission from './pages/OurMission';
import HowItWorks from './pages/HowItWorks';
import SuccessStories from './pages/SuccessStories';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div style={appContainerStyle}>
        <Navbar />
        <main style={mainContentStyle}>
          <Routes>
            <Route
              path="/"
              element={!user ? <LandingPage /> : <Navigate to="/donor" />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/donor'} /> : <Login />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/donor" /> : <Register />}
            />

            <Route
              path="/donor"
              element={
                <ProtectedRoute>
                  <DonorPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<AboutUs />} />
            <Route path="/mission" element={<OurMission />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const appContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const mainContentStyle = {
  flex: '1 0 auto',
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

// Common Public Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import WhatsAppButton from './components/common/WhatsAppButton';
import ScrollToTop from './components/common/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminEnquiriesPage from './pages/admin/AdminEnquiriesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Public Layout Container
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-ivory text-charcoal">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

// 404 Page
const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-24">
      <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block mb-3">
        404 — Page Not Found
      </span>
      <h1 className="font-serif text-5xl md:text-6xl text-charcoal mb-4">
        Uncharted Spatial Coordinates
      </h1>
      <p className="text-warmgrey max-w-md mx-auto text-base mb-8 font-light">
        The requested page does not exist or has been relocated within the Vastukruta archive.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs uppercase tracking-[0.2em] font-semibold"
      >
        Return to Studio Sanctuary
      </Link>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="projects" element={<AdminProjectsPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;

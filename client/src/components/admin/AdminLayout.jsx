import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  User,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const AdminLayout = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="font-serif text-xl text-charcoal animate-pulse">Loading Studio Portal...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Projects CMS', path: '/admin/projects', icon: FolderKanban },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Studio Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F0EDE6] text-charcoal flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-charcoal text-ivory p-4 flex items-center justify-between z-30">
        <div className="flex flex-col">
          <span className="font-serif text-lg tracking-widest uppercase">{settings.studioName || 'VASTUKRUTA'}</span>
          <span className="text-[9px] tracking-widest text-taupe uppercase">Admin Studio Portal</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 text-ivory hover:text-taupe focus:outline-none"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 bottom-0 w-64 bg-charcoal text-ivory z-40 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out md:translate-x-0 h-screen ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Brand header */}
          <div className="pb-6 border-b border-border-dark">
            <Link to="/" target="_blank" className="block group">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-light text-ivory group-hover:text-taupe transition-colors">
                {settings.studioName || 'VASTUKRUTA'}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-taupe block font-medium mt-0.5">
                {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
              </span>
            </Link>
            <div className="mt-3 inline-flex items-center space-x-1.5 px-2.5 py-0.5 bg-taupe/20 border border-taupe/40 text-[10px] uppercase tracking-wider text-taupe-light rounded">
              <Shield className="w-3 h-3" />
              <span>Studio Administration</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-wider transition-colors rounded-sm ${
                      isActive
                        ? 'bg-ivory text-charcoal font-semibold shadow-sm'
                        : 'text-warmgrey-light hover:text-ivory hover:bg-charcoal-dark'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="pt-6 border-t border-border-dark space-y-3">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-taupe/30 border border-taupe flex items-center justify-center text-taupe-light font-serif">
              {user?.name ? user.name[0] : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-ivory truncate">{user?.name || 'Architect'}</p>
              <p className="text-[10px] text-warmgrey-light truncate">{user?.email}</p>
            </div>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs text-warmgrey-light hover:text-ivory hover:bg-charcoal-dark rounded transition-colors"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-charcoal-dark rounded transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

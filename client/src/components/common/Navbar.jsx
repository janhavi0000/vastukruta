import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md py-4 border-b border-border-subtle shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="group flex flex-col tracking-widest text-charcoal">
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-[0.22em] uppercase transition-colors group-hover:text-taupe-dark">
              {settings.studioName || 'VASTUKRUTA'}
            </span>
            <span className="text-[9px] md:text-[10px] tracking-[0.32em] uppercase text-warmgrey -mt-1 font-sans font-medium">
              {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10 text-[13px] tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative transition-colors duration-300 py-1 ${
                    isActive
                      ? 'text-charcoal font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-taupe'
                      : 'text-warmgrey hover:text-charcoal'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 text-[12px] tracking-[0.18em] uppercase font-semibold px-6 py-2.5 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-300 group"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-charcoal focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-charcoal-dark/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-ivory z-50 shadow-2xl p-8 flex flex-col justify-between transform transition-transform duration-400 ease-in-out lg:hidden border-l border-border-medium ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.2em] uppercase font-normal">
                {settings.studioName || 'VASTUKRUTA'}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-warmgrey font-sans">
                {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-charcoal focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-8 flex flex-col space-y-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-base tracking-[0.16em] uppercase transition-colors py-1 ${
                    isActive ? 'text-charcoal font-semibold pl-2 border-l-2 border-taupe' : 'text-warmgrey hover:text-charcoal'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-border-subtle space-y-4">
          <Link
            to="/contact"
            className="w-full text-center flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase font-semibold py-3 border border-charcoal bg-charcoal text-ivory hover:bg-transparent hover:text-charcoal transition-all"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <div className="text-center text-xs text-warmgrey">
            <p className="font-serif italic text-sm text-charcoal">{settings.tagline}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

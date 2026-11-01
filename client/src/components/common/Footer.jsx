import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory border-t border-border-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Upper Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border-dark">
          {/* Brand & Statement */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-serif text-3xl md:text-4xl tracking-[0.2em] uppercase font-light block">
                {settings.studioName || 'VASTUKRUTA'}
              </span>
              <span className="text-[11px] tracking-[0.34em] uppercase text-taupe block font-medium mt-1">
                {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
              </span>
            </div>
            <p className="text-warmgrey-light text-sm md:text-base font-light leading-relaxed max-w-md">
              {settings.tagline || 'Spaces Designed with Purpose. Experiences Created with Care.'}
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 text-xs tracking-[0.2em] uppercase font-semibold text-ivory hover:text-taupe transition-colors duration-300 group"
              >
                <span>Initiate a Project Conversation</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.24em] text-taupe font-semibold">Studio</h4>
            <ul className="space-y-3 text-sm text-warmgrey-light">
              <li>
                <Link to="/" className="hover:text-ivory transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ivory transition-colors">About Practice</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-ivory transition-colors">Services Scope</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-ivory transition-colors">Selected Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ivory transition-colors">Contact & Enquiries</Link>
              </li>
            </ul>
          </div>

          {/* Studio Contact Info */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.24em] text-taupe font-semibold">Studio & Atelier</h4>
            <div className="space-y-3 text-sm text-warmgrey-light font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-taupe mt-1 shrink-0" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-taupe shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-ivory transition-colors">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-taupe shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-ivory transition-colors">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start space-x-3 pt-1">
                <Clock className="w-4 h-4 text-taupe mt-0.5 shrink-0" />
                <span className="text-xs">{settings.officeHours}</span>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-3 flex items-center space-x-4">
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border-dark text-warmgrey-light hover:text-ivory hover:border-taupe transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-border-dark text-warmgrey-light hover:text-ivory hover:border-taupe transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Lower Row: Copyright, Architecture Registry, and Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-warmgrey gap-4">
          <p>
            © {currentYear} {settings.studioName || 'VASTUKRUTA'}. Principal Architect: {settings.principalArchitect || 'AR. PRANALI GHORPADE'}. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="text-[11px] text-warmgrey-light/60">Council of Architecture Registered</span>
            <Link
              to="/admin"
              className="text-warmgrey-light/70 hover:text-ivory transition-colors underline underline-offset-4 decoration-border-dark hover:decoration-taupe"
            >
              Architect Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

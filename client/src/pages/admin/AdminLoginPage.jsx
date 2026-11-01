import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const AdminLoginPage = () => {
  const { login } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both administrator email and password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@vastukruta.com');
    setPassword('Vastukruta@2026');
    setError('');
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block group mb-4">
          <span className="font-serif text-3xl tracking-[0.24em] uppercase font-normal text-charcoal">
            {settings.studioName || 'VASTUKRUTA'}
          </span>
          <span className="text-[10px] tracking-[0.34em] uppercase text-taupe block font-medium">
            {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
          </span>
        </Link>
        <h2 className="font-serif text-2xl text-charcoal font-light">Architect Portal Sign In</h2>
        <p className="text-xs text-warmgrey uppercase tracking-widest mt-1">
          Studio Administration & Project CMS
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white p-8 sm:p-10 border border-border-subtle shadow-md">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                Architect / Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-warmgrey absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vastukruta.com"
                  className="w-full pl-10 pr-4 py-3 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-charcoal text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-warmgrey absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-charcoal text-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Studio Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Helper Pill */}
          <div className="mt-8 pt-6 border-t border-border-subtle text-center">
            <span className="text-[11px] text-warmgrey block mb-2">Testing credentials:</span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="inline-flex items-center space-x-2 px-3 py-1.5 bg-beige/50 border border-border-medium hover:bg-beige text-charcoal text-xs rounded transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-taupe" />
              <span>Fill Default Demo Credentials</span>
            </button>
            <p className="text-[10px] text-warmgrey mt-2 font-mono">
              admin@vastukruta.com / Vastukruta@2026
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-warmgrey hover:text-charcoal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;

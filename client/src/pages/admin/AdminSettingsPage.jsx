import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { settingAPI } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

const AdminSettingsPage = () => {
  const { settings, refreshSettings } = useSettings();

  const [formData, setFormData] = useState({
    studioName: '',
    principalArchitect: '',
    tagline: '',
    heroHeading: '',
    heroSubtitle: '',
    phone: '',
    email: '',
    whatsapp: '',
    address: '',
    mapEmbedUrl: '',
    instagram: '',
    linkedin: '',
    architectBio: '',
    officeHours: '',
  });

  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData({
        studioName: settings.studioName || 'VASTUKRUTA',
        principalArchitect: settings.principalArchitect || 'AR. PRANALI GHORPADE',
        tagline: settings.tagline || '',
        heroHeading: settings.heroHeading || '',
        heroSubtitle: settings.heroSubtitle || '',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsapp: settings.whatsapp || '',
        address: settings.address || '',
        mapEmbedUrl: settings.mapEmbedUrl || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
        architectBio: settings.architectBio || '',
        officeHours: settings.officeHours || '',
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await settingAPI.update(formData);
      refreshSettings();
      setSuccessMessage('Studio settings and branding updated successfully. Changes are now live across the website.');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to save studio settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-border-medium">
        <span className="text-[11px] uppercase tracking-[0.24em] text-taupe font-semibold block">
          Website Content Management
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Studio Profile & Contact Settings</h1>
        <p className="text-warmgrey text-xs sm:text-sm mt-1">
          Update brand identifiers, contact channels, studio location, and social links in real time.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 border border-border-subtle shadow-sm space-y-8 text-xs">
        {/* Brand Identity Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-charcoal pb-2 border-b border-border-subtle">
            Brand Identity & Leadership
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                Studio Brand Name *
              </label>
              <input
                type="text"
                name="studioName"
                value={formData.studioName}
                onChange={handleChange}
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                Principal Architect *
              </label>
              <input
                type="text"
                name="principalArchitect"
                value={formData.principalArchitect}
                onChange={handleChange}
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Studio Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              placeholder="Spaces Designed with Purpose. Experiences Created with Care."
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Homepage Hero Headline
            </label>
            <input
              type="text"
              name="heroHeading"
              value={formData.heroHeading}
              onChange={handleChange}
              placeholder="Designing Spaces. Shaping Experiences."
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Homepage Hero Subtitle
            </label>
            <textarea
              rows={2}
              name="heroSubtitle"
              value={formData.heroSubtitle}
              onChange={handleChange}
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Principal Architect Biography
            </label>
            <textarea
              rows={4}
              name="architectBio"
              value={formData.architectBio}
              onChange={handleChange}
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <h3 className="font-serif text-xl text-charcoal pb-2 border-b border-border-subtle">
            Contact & Studio Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                Public Studio Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98230 45678"
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                Public Studio Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@vastukruta.com"
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                WhatsApp Number (Digits with country code)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="919823045678"
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Physical Studio Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Studio Operating Hours
            </label>
            <input
              type="text"
              name="officeHours"
              value={formData.officeHours}
              onChange={handleChange}
              placeholder="Monday – Saturday: 10:00 AM – 7:00 PM"
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
              Google Maps Embed URL (iframe src)
            </label>
            <input
              type="text"
              name="mapEmbedUrl"
              value={formData.mapEmbedUrl}
              onChange={handleChange}
              className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none font-mono text-[11px]"
            />
          </div>
        </div>

        {/* Social Media Section */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <h3 className="font-serif text-xl text-charcoal pb-2 border-b border-border-subtle">
            Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/vastukruta.architects"
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/vastukruta"
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="pt-6 border-t border-border-subtle flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            {saving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Studio Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettingsPage;

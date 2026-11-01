import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { enquiryAPI } from '../services/api';
import { useSettings } from '../context/SettingsContext';

const ContactPage = () => {
  const { settings } = useSettings();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    projectType: 'Residential Architecture',
    location: '',
    approxArea: '',
    budget: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Pre-fill project type if passed from query params (e.g., from Services page)
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const refParam = searchParams.get('ref');

    if (typeParam) {
      setFormData((prev) => ({
        ...prev,
        projectType: typeParam,
        description: refParam ? `Enquiring regarding similar design approach as: ${refParam}\n\n` : prev.description,
      }));
    }
  }, [searchParams]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your contact phone number.';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project typology.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please specify the project location or city.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your vision, plot dimensions, or scope.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await enquiryAPI.submit(formData);
      setSubmissionSuccess({
        referenceId: res.data?.referenceId || res.data?.data?.id,
        message:
          res.data?.message ||
          'Your architectural enquiry has been received. Ar. Pranali Ghorpade will review your project brief and connect shortly.',
      });

      // Reset form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        projectType: 'Residential Architecture',
        location: '',
        approxArea: '',
        budget: '',
        description: '',
      });
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmitError(
        err.response?.data?.message ||
          'An unexpected error occurred while transmitting your enquiry. Please reach out to us directly via WhatsApp or phone.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const rawWhatsapp = (settings?.whatsapp || '919823045678').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(
    'Hello Ar. Pranali Ghorpade, I would like to enquire about a new architectural project with Vastukruta.'
  )}`;

  return (
    <div className="bg-ivory text-charcoal pt-32 pb-28">
      {/* Header section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
            Initiate Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.1]">
            Let's discuss your space.
          </h1>
          <p className="text-warmgrey text-lg font-light leading-relaxed">
            Every architectural landmark begins with a conversation. Fill out our project enquiry form below or reach
            out directly to our studio team.
          </p>
        </div>
      </section>

      {/* Main Grid: Details Sidebar & Project Form */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Studio Information & Direct Channels */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-beige/30 p-8 border border-border-subtle space-y-8">
              <div>
                <span className="text-[10px] tracking-[0.24em] uppercase text-taupe font-semibold block mb-2">
                  Studio Location
                </span>
                <h3 className="font-serif text-2xl text-charcoal mb-3">Pune Studio & Atelier</h3>
                <div className="flex items-start space-x-3 text-warmgrey text-sm font-light">
                  <MapPin className="w-5 h-5 text-taupe shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="border-t border-border-subtle pt-6 space-y-4">
                <span className="text-[10px] tracking-[0.24em] uppercase text-taupe font-semibold block">
                  Direct Inquiries
                </span>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-taupe shrink-0" />
                  <a href={`tel:${settings.phone}`} className="hover:text-taupe transition-colors">
                    {settings.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-taupe shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-taupe transition-colors">
                    {settings.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-taupe shrink-0" />
                  <span className="text-warmgrey text-xs">{settings.officeHours}</span>
                </div>
              </div>

              {/* Instant WhatsApp Channel */}
              <div className="border-t border-border-subtle pt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded font-medium text-xs tracking-wider uppercase shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Message on WhatsApp</span>
                </a>
                <p className="text-[11px] text-warmgrey text-center mt-2 font-light">
                  Direct mobile connection with Ar. Pranali Ghorpade
                </p>
              </div>
            </div>

            {/* Google Maps Embed / Card */}
            <div className="border border-border-subtle overflow-hidden bg-beige aspect-[4/3]">
              <iframe
                title="Vastukruta Studio Location Map"
                src={settings.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.6) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-ivory p-8 sm:p-12 border border-border-subtle shadow-sm">
              <div className="mb-8 pb-6 border-b border-border-subtle">
                <span className="text-xs uppercase tracking-[0.24em] text-taupe font-semibold block mb-1">
                  Project Brief
                </span>
                <h2 className="font-serif text-3xl text-charcoal font-normal">
                  Commission an Architectural Design
                </h2>
                <p className="text-warmgrey text-sm mt-1">
                  Please provide preliminary details so we may prepare an insightful initial response.
                </p>
              </div>

              {/* Success Notification Alert */}
              {submissionSuccess && (
                <div className="mb-8 p-6 bg-beige/60 border border-taupe text-charcoal rounded space-y-2">
                  <div className="flex items-center space-x-2 text-taupe-deep font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-taupe" />
                    <span>Enquiry Successfully Received</span>
                  </div>
                  <p className="text-sm text-warmgrey">{submissionSuccess.message}</p>
                  {submissionSuccess.referenceId && (
                    <div className="text-xs font-mono text-warmgrey-dark pt-1">
                      Reference Code: <span className="text-charcoal font-bold">{submissionSuccess.referenceId}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSubmissionSuccess(null)}
                    className="text-xs underline text-taupe hover:text-charcoal pt-2 block font-medium"
                  >
                    Submit Another Brief
                  </button>
                </div>
              )}

              {/* Error Alert */}
              {submitError && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Full Name <span className="text-taupe">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Singhania"
                    className={`w-full px-4 py-3 bg-beige/20 border ${
                      errors.fullName ? 'border-red-400' : 'border-border-subtle'
                    } focus:border-taupe focus:outline-none text-charcoal text-sm transition-colors`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* 2 & 3. Phone & Email in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                      Phone / Mobile <span className="text-taupe">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98220 00000"
                      className={`w-full px-4 py-3 bg-beige/20 border ${
                        errors.phone ? 'border-red-400' : 'border-border-subtle'
                      } focus:border-taupe focus:outline-none text-charcoal text-sm transition-colors`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                      Email Address <span className="text-taupe">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. vikram@example.com"
                      className={`w-full px-4 py-3 bg-beige/20 border ${
                        errors.email ? 'border-red-400' : 'border-border-subtle'
                      } focus:border-taupe focus:outline-none text-charcoal text-sm transition-colors`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* 4. Project Type Dropdown */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Project Type <span className="text-taupe">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-charcoal text-sm"
                  >
                    <option value="Architectural Design">Architectural Design (Complete)</option>
                    <option value="Residential Architecture">Residential Architecture (Villa / Bungalow)</option>
                    <option value="Commercial Architecture">Commercial Architecture / Workplace</option>
                    <option value="Interior Design">Interior Design (Luxury Residential / Penthouse)</option>
                    <option value="Building Planning and Layouts">Building Planning and Layouts</option>
                    <option value="Renovation and Remodeling">Renovation & Adaptive Reuse</option>
                    <option value="3D Visualization and Design Consultation">3D Visualization & Consultation</option>
                    <option value="Other">Other Bespoke Requirement</option>
                  </select>
                </div>

                {/* 5 & 6. Location & Approx Area in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                      Project Location / City <span className="text-taupe">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Baner, Pune / Alibaug"
                      className={`w-full px-4 py-3 bg-beige/20 border ${
                        errors.location ? 'border-red-400' : 'border-border-subtle'
                      } focus:border-taupe focus:outline-none text-charcoal text-sm transition-colors`}
                    />
                    {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                      Approx. Area (sq. ft.)
                    </label>
                    <input
                      type="text"
                      name="approxArea"
                      value={formData.approxArea}
                      onChange={handleChange}
                      placeholder="e.g. 4,500 sq. ft."
                      className="w-full px-4 py-3 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-charcoal text-sm"
                    />
                  </div>
                </div>

                {/* 7. Estimated Budget (Optional) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Estimated Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="e.g. ₹1.5 Cr – ₹2.5 Cr / Flexible"
                    className="w-full px-4 py-3 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-charcoal text-sm"
                  />
                </div>

                {/* 8. Project Description */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-2">
                    Project Vision & Scope Details <span className="text-taupe">*</span>
                  </label>
                  <textarea
                    rows={5}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your plot topography, intended spatial requirements, material preferences, and desired project timeline..."
                    className={`w-full px-4 py-3 bg-beige/20 border ${
                      errors.description ? 'border-red-400' : 'border-border-subtle'
                    } focus:border-taupe focus:outline-none text-charcoal text-sm transition-colors`}
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                {/* 9. Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Project Brief...</span>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-warmgrey text-center mt-3 font-light">
                    Your confidential information will only be used for direct architectural consultation.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

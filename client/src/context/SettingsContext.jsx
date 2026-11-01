import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingAPI } from '../services/api';

const defaultSettings = {
  studioName: 'VASTUKRUTA',
  principalArchitect: 'AR. PRANALI GHORPADE',
  tagline: 'Spaces Designed with Purpose. Experiences Created with Care.',
  heroHeading: 'Designing Spaces. Shaping Experiences.',
  heroSubtitle: 'Thoughtful architecture and interiors crafted around the way you live, work and experience spaces.',
  phone: '+91 98230 45678',
  email: 'info@vastukruta.com',
  whatsapp: '919823045678',
  address: 'Studio Vastukruta, 4th Floor, Deccan Chamber, FC Road, Pune, Maharashtra 411004',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2520330364964!2d73.84074817519154!3d18.517524982578553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf82d6b70129%3A0xc07cfb70f0fa47c7!2sFergusson%20College%20Rd%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  instagram: 'https://instagram.com/vastukruta.architects',
  linkedin: 'https://linkedin.com/company/vastukruta',
  architectBio: 'Ar. Pranali Ghorpade is the founder and principal architect of Vastukruta. Anchored in the principles of climatic sensitivity, tectonic honesty, and serene spatial proportions, her work seeks to bring calmness and purposeful elegance to modern living.',
  officeHours: 'Monday – Saturday: 10:00 AM – 7:00 PM (Sunday by Appointment)',
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await settingAPI.get();
      if (res.data?.data) {
        setSettings({ ...defaultSettings, ...res.data.data });
      }
    } catch (err) {
      console.warn('[SettingsContext] Falling back to default studio settings:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = () => fetchSettings();

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass, Eye, ShieldCheck, Sparkles, Feather } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const AboutPage = () => {
  const { settings } = useSettings();

  const studioValues = [
    {
      title: 'Contextual Groundedness',
      desc: 'Architecture should emerge organically from its site contours, climate, surrounding vegetation, and cultural narrative.',
    },
    {
      title: 'Material Authenticity',
      desc: 'We advocate for tactile, unpretentious materials—raw stone, lime plaster, untreated wood, and exposed concrete that weather gracefully with time.',
    },
    {
      title: 'Climatic Wisdom',
      desc: 'Prioritizing natural cross-ventilation, shaded overhangs, internal light shafts, and thermal massing to minimize energy dependency.',
    },
    {
      title: 'Poetic Restraint',
      desc: 'Stripping away excess decoration to reveal spatial elegance, proportion, tranquility, and natural light as the quintessential luxury.',
    },
  ];

  return (
    <div className="bg-ivory text-charcoal pt-32 pb-24">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
            About the Practice
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.1]">
            Architecture as an enduring dialogue between space, light, and the human spirit.
          </h1>
          <p className="text-warmgrey text-lg font-light leading-relaxed pt-2">
            VASTUKRUTA is a progressive architecture and spatial design studio based in Pune, India, operating at the
            intersection of contemporary minimalism and vernacular tectonic wisdom.
          </p>
        </div>
      </section>

      {/* 2. Photo Grid / Editorial Visuals */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 aspect-[16/10] overflow-hidden bg-beige border border-border-subtle">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
              alt="Vastukruta Architectural Detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-4 aspect-[3/4] md:aspect-auto overflow-hidden bg-beige border border-border-subtle">
            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"
              alt="Architectural Materiality"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Principal Architect Profile */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-y border-border-subtle mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-beige overflow-hidden border border-border-subtle">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
                alt="Ar. Pranali Ghorpade - Principal Architect"
                className="w-full h-full object-cover object-top filter grayscale contrast-105"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-ivory/95 p-4 border border-border-subtle">
                <span className="text-[10px] tracking-[0.24em] uppercase text-taupe block font-semibold">
                  Principal Architect
                </span>
                <span className="font-serif text-xl text-charcoal">
                  {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
                </span>
                <span className="text-[11px] text-warmgrey block mt-0.5">Founder, Vastukruta</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
              Leadership & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
              Ar. Pranali Ghorpade
            </h2>
            <div className="space-y-4 text-warmgrey text-base sm:text-lg leading-relaxed font-light">
              <p>
                {settings.architectBio ||
                  'Ar. Pranali Ghorpade is the founder and principal architect at Vastukruta. With a strong commitment to contextual architecture, climate-responsive design, and timeless aesthetic restraint, her practice creates living spaces that harmonize modern living with understated material honesty.'}
              </p>
              <p>
                Under her leadership, Vastukruta approaches every project not as an assembly of walls, but as an
                intimate sanctuary designed around human rituals, family dynamics, and spatial stillness. Her design
                philosophy favors tactile materials, soft diffused light, and uncluttered geometry over passing trends.
              </p>
              <p>
                She remains personally involved throughout all phases of design exploration—from preliminary master
                plans, volumetric massing studies, and client walkthroughs to on-site craftsmanship coordination.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs tracking-wider uppercase text-charcoal font-medium">
              <div className="px-4 py-2 bg-beige/60 border border-border-subtle">Council of Architecture (CoA)</div>
              <div className="px-4 py-2 bg-beige/60 border border-border-subtle">Residential Architecture</div>
              <div className="px-4 py-2 bg-beige/60 border border-border-subtle">Sustainable Tropical Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Studio Values & Ethos */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
            Guiding Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal">
            The Studio Ethos
          </h2>
          <p className="text-warmgrey text-base">
            How we think, create, and build spaces that remain meaningful across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studioValues.map((val, idx) => (
            <div key={val.title} className="p-8 bg-beige/30 border border-border-subtle space-y-3">
              <span className="text-xs font-serif text-taupe tracking-widest block">0{idx + 1}</span>
              <h3 className="font-serif text-2xl text-charcoal">{val.title}</h3>
              <p className="text-warmgrey text-base leading-relaxed font-light">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Working Methodology */}
      <section className="bg-charcoal text-ivory py-24 mb-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
              Execution Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory">
              Rigorous Coordination from Blueprint to Reality
            </h2>
            <p className="text-warmgrey-light text-base leading-relaxed">
              Great architecture relies on seamless synergy between design intention and site execution. We maintain
              uncompromising standards across technical documentation, structural calculations, vendor curation, and
              artisanal finishes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 border border-border-dark space-y-2">
              <span className="font-serif text-2xl text-taupe">Direct Involvement</span>
              <p className="text-warmgrey-light text-sm leading-relaxed">
                Direct principal architect oversight at every critical milestone, ensuring no design compromise.
              </p>
            </div>
            <div className="p-6 border border-border-dark space-y-2">
              <span className="font-serif text-2xl text-taupe">Master Craftsmen</span>
              <p className="text-warmgrey-light text-sm leading-relaxed">
                Long-standing collaboration with trusted stone masons, carpenters, metal fabricators, and MEP consultants.
              </p>
            </div>
            <div className="p-6 border border-border-dark space-y-2">
              <span className="font-serif text-2xl text-taupe">Transparent Practice</span>
              <p className="text-warmgrey-light text-sm leading-relaxed">
                Clear scheduling, detailed bill of quantities (BOQ), and transparent progress updates throughout execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to collaborate CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light">
          Let's shape your architectural vision together.
        </h2>
        <p className="text-warmgrey text-base">
          Our studio is currently accepting select residential and interior commissions.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs tracking-[0.2em] uppercase font-semibold"
          >
            <span>Start a Project Enquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

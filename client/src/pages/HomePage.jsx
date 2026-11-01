import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Compass, Sun, Layers, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectAPI } from '../services/api';
import { useSettings } from '../context/SettingsContext';

const HomePage = () => {
  const { settings } = useSettings();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await projectAPI.getAll({ featured: true });
        if (res.data?.data?.length > 0) {
          setFeaturedProjects(res.data.data.slice(0, 4));
        } else {
          // Fallback if none flagged featured: take first 4 projects
          const allRes = await projectAPI.getAll();
          setFeaturedProjects(allRes.data?.data?.slice(0, 4) || []);
        }
      } catch (err) {
        console.error('Failed to load featured projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    };

    fetchFeatured();
  }, []);

  const servicesPreview = [
    {
      title: 'Architectural Design',
      category: 'Architecture',
      description: 'Site-responsive, climate-conscious architectural planning for bespoke residences, villas, and multi-unit buildings.',
      icon: Ruler,
    },
    {
      title: 'Interior Design',
      category: 'Interiors',
      description: 'Curated interior spaces emphasizing natural materials, tailored joinery, and poetic interplay of ambient light.',
      icon: Layers,
    },
    {
      title: 'Residential Planning',
      category: 'Residential',
      description: 'Comprehensive private home and bungalow planning tailored to contemporary Indian lifestyles and family rituals.',
      icon: Compass,
    },
    {
      title: 'Commercial Design',
      category: 'Workplace',
      description: 'Forward-thinking workplace environments, studio spaces, and boutique commercial elevations.',
      icon: Sparkles,
    },
    {
      title: 'Renovation & Space Planning',
      category: 'Adaptive Reuse',
      description: 'Sensitively rejuvenating existing structures with modern spatial flow, structural clarity, and finish upgrades.',
      icon: Sun,
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Understanding the Vision',
      desc: 'In-depth client dialogue, site context analysis, climatic study, and lifestyle aspirations form our foundational brief.',
    },
    {
      number: '02',
      title: 'Concept & Planning',
      desc: 'Exploring spatial flow, volumetric massing, daylight orientations, and preliminary architectural zoning layouts.',
    },
    {
      number: '03',
      title: 'Design Development',
      desc: 'Detailed material selections, 3D visualizations, structural coordination, and comprehensive construction drawings.',
    },
    {
      number: '04',
      title: 'Execution & Delivery',
      desc: 'Rigorous site oversight, master craftsmanship supervision, and meticulous quality checks until final handover.',
    },
  ];

  return (
    <div className="bg-ivory text-charcoal">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with warm architectural overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=88"
            alt="Vastukruta Architecture Architecture"
            className="w-full h-full object-cover object-center filter brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block border-y border-ivory/30 py-1.5 px-4 mb-2">
              <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] font-medium text-ivory/90">
                Architecture & Interior Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.08] text-balance">
              {settings.heroHeading || 'Designing Spaces. Shaping Experiences.'}
            </h1>

            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light text-ivory/80 leading-relaxed font-sans">
              {settings.heroSubtitle ||
                'Thoughtful architecture and interiors crafted around the way you live, work and experience spaces.'}
            </p>

            {/* Buttons */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-3.5 bg-ivory text-charcoal hover:bg-beige transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center space-x-2"
              >
                <span>Explore Our Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 border border-ivory text-ivory hover:bg-ivory hover:text-charcoal transition-all duration-300 text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center"
              >
                <span>Let's Connect</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center text-ivory/70 hover:text-ivory transition-colors">
          <span className="text-[10px] uppercase tracking-[0.24em] mb-2 font-light">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION: VASTUKRUTA & AR. PRANALI GHORPADE */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Studio Monogram */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] bg-beige overflow-hidden shadow-lg border border-border-subtle">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85"
                alt="Ar. Pranali Ghorpade - Principal Architect"
                className="w-full h-full object-cover object-top filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-ivory">
                <span className="text-[10px] tracking-[0.28em] uppercase text-taupe-light block">
                  Principal Architect & Founder
                </span>
                <h3 className="font-serif text-2xl tracking-wide font-normal">
                  {settings.principalArchitect || 'AR. PRANALI GHORPADE'}
                </h3>
              </div>
            </div>

            {/* Architectural accent ornament box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 border-2 border-taupe/40 -z-10" />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
                The Practice
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal leading-tight">
                Architectural Clarity Rooted in Context & Restraint.
              </h2>
            </div>

            <p className="text-warmgrey text-base sm:text-lg leading-relaxed font-light">
              Founded by <strong className="font-normal text-charcoal">Ar. Pranali Ghorpade</strong>,{' '}
              <strong className="font-normal text-charcoal">VASTUKRUTA</strong> is an architecture and interior design
              practice dedicated to crafting spaces that evoke timeless calm, sensory richness, and purposeful simplicity.
            </p>

            <p className="text-warmgrey text-base sm:text-lg leading-relaxed font-light">
              We believe architecture should be quiet yet profound. Every residence, workspace, and interior volume we
              design is an intimate response to sunlight, honest materiality, local climatic rhythms, and the unique rituals
              of those who inhabit it.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-border-subtle">
              <div>
                <span className="font-serif text-3xl md:text-4xl text-charcoal block">10+</span>
                <span className="text-xs uppercase tracking-widest text-warmgrey">Years Studio Ethos</span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-charcoal block">45+</span>
                <span className="text-xs uppercase tracking-widest text-warmgrey">Bespoke Projects</span>
              </div>
              <div>
                <span className="font-serif text-3xl md:text-4xl text-charcoal block">100%</span>
                <span className="text-xs uppercase tracking-widest text-warmgrey">Custom Craftsmanship</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-semibold text-charcoal hover:text-taupe transition-colors group"
              >
                <span>Read Studio Philosophy & Journey</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal">
              Featured Architecture & Interiors
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-semibold text-charcoal hover:text-taupe transition-colors group"
          >
            <span>View All Works</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Dynamic Project Cards */}
        {loadingProjects ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[16/10] bg-beige/60 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {featuredProjects.map((project, idx) => (
              <Link
                key={project._id || project.slug}
                to={`/projects/${project.slug || project._id}`}
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-beige border border-border-subtle">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1 text-[11px] uppercase tracking-widest text-charcoal">
                    {project.category}
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-normal text-charcoal group-hover:text-taupe transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs tracking-wider uppercase text-warmgrey">
                      {project.location} • {project.year}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full border border-border-medium flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-ivory transition-colors shrink-0 mt-1">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 4. SERVICES PREVIEW */}
      <section className="py-24 bg-beige/40 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
              Disciplines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal">
              Comprehensive Architectural & Spatial Services
            </h2>
            <p className="text-warmgrey text-base">
              From initial master planning through construction execution and bespoke interior styling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesPreview.map((service, index) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-ivory p-8 border border-border-subtle hover:border-taupe transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded bg-beige/60 flex items-center justify-center text-charcoal">
                      <IconComp className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] tracking-[0.24em] uppercase text-taupe font-semibold block">
                      {service.category}
                    </span>
                    <h3 className="font-serif text-2xl text-charcoal">{service.title}</h3>
                    <p className="text-warmgrey text-sm leading-relaxed">{service.description}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-border-subtle">
                    <Link
                      to="/services"
                      className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase font-medium text-charcoal hover:text-taupe transition-colors"
                    >
                      <span>Explore Scope</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* 6th Card: Direct consultation invitation */}
            <div className="bg-charcoal text-ivory p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.24em] uppercase text-taupe-light font-semibold block">
                  Tailored Approach
                </span>
                <h3 className="font-serif text-2xl text-ivory">Have a Unique Requirement?</h3>
                <p className="text-warmgrey-light text-sm leading-relaxed">
                  We frequently design bespoke architectural solutions for non-standard plots, heritage renovations,
                  and specialized interior programs.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="w-full text-center inline-block py-3 px-4 border border-taupe text-ivory hover:bg-taupe text-xs tracking-widest uppercase font-semibold transition-colors"
                >
                  Discuss Your Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DESIGN PHILOSOPHY SECTION (DARK CHARCOAL CONTRAST) */}
      <section className="py-24 md:py-32 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
                Design Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-ivory leading-tight">
                Spaces Defined by Light, Materiality & Authenticity.
              </h2>
              <p className="text-warmgrey-light text-base leading-relaxed font-light">
                At Vastukruta, design is never an imposition onto a site. It is an honest dialogue between nature,
                structure, and human experience.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 border border-border-dark bg-charcoal-dark/50 space-y-3">
                <Sun className="w-6 h-6 text-taupe stroke-[1.5]" />
                <h4 className="font-serif text-xl text-ivory">Natural Light as Material</h4>
                <p className="text-warmgrey-light text-sm leading-relaxed">
                  We shape openings, courtyards, and light shafts so daylight becomes the primary interior finish,
                  transforming atmospheres throughout the day.
                </p>
              </div>

              <div className="p-6 border border-border-dark bg-charcoal-dark/50 space-y-3">
                <Layers className="w-6 h-6 text-taupe stroke-[1.5]" />
                <h4 className="font-serif text-xl text-ivory">Tactile & Honest Materials</h4>
                <p className="text-warmgrey-light text-sm leading-relaxed">
                  We celebrate regional stone, lime plaster, untreated teak, and exposed concrete for their authentic
                  textures and graceful aging.
                </p>
              </div>

              <div className="p-6 border border-border-dark bg-charcoal-dark/50 space-y-3">
                <Compass className="w-6 h-6 text-taupe stroke-[1.5]" />
                <h4 className="font-serif text-xl text-ivory">Climatic Sensitivity</h4>
                <p className="text-warmgrey-light text-sm leading-relaxed">
                  Passive cross-ventilation, deep overhangs, and thermal zoning create homes that breathe naturally,
                  lowering carbon footprints.
                </p>
              </div>

              <div className="p-6 border border-border-dark bg-charcoal-dark/50 space-y-3">
                <CheckCircle2 className="w-6 h-6 text-taupe stroke-[1.5]" />
                <h4 className="font-serif text-xl text-ivory">Purposeful Proportions</h4>
                <p className="text-warmgrey-light text-sm leading-relaxed">
                  Rejecting superficial trends, we emphasize timeless proportions, unencumbered circulation, and
                  effortless everyday comfort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE PROCESS SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-border-subtle">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
            Our Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-charcoal">
            The Architectural Journey
          </h2>
          <p className="text-warmgrey text-base">
            From initial sketch to key handover, our transparent four-stage process ensures artistic integrity and
            rigorous construction discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="relative group pt-6 border-t-2 border-border-medium hover:border-taupe transition-colors duration-400">
              <span className="font-serif text-3xl text-taupe font-light block mb-3">{step.number}</span>
              <h3 className="font-serif text-2xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-warmgrey text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CALL TO ACTION SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-beige/30 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-xs tracking-[0.3em] uppercase text-taupe font-semibold block">
            Collaborate With Us
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-charcoal leading-tight text-balance">
            Have a space in mind? Let's create something meaningful.
          </h2>
          <p className="max-w-xl mx-auto text-warmgrey text-base sm:text-lg">
            Whether you are envisioning a private villa, an urban residence, or a bespoke interior transformation, we
            welcome the opportunity to collaborate.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-semibold flex items-center space-x-2"
            >
              <span>Schedule a Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all duration-300 text-xs tracking-[0.2em] uppercase font-semibold"
            >
              <span>Explore Portfolio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

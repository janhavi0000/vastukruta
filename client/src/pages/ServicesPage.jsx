import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Compass, Layers, Home, Building2, LayoutGrid, Hammer, Eye } from 'lucide-react';

const ServicesPage = () => {
  const servicesList = [
    {
      id: 'architectural-design',
      title: 'Architectural Design',
      category: 'Core Discipline',
      enquiryType: 'Architectural Design',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      icon: Compass,
      description:
        'Comprehensive architectural design from concept to completion. We generate site-sensitive, contextual forms that harness passive ventilation, natural illumination, and enduring materiality.',
      includes: [
        'Topographical site analysis & climatic study',
        'Conceptual massing & spatial flow planning',
        'Architectural design development & approval drawings',
        'Structural, MEP & civil coordination',
        'Detailed construction documentation & specifications',
        'Regular site supervision & quality inspection',
      ],
    },
    {
      id: 'residential-architecture',
      title: 'Residential Architecture',
      category: 'Living Spaces',
      enquiryType: 'Residential Architecture',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
      icon: Home,
      description:
        'Bespoke luxury villas, modern bungalows, weekend retreats, and private family estates customized to the distinct lifestyles, spatial rhythms, and privacy needs of modern families.',
      includes: [
        'Custom villa & bungalow architecture',
        'Courtyard & open-to-sky living integration',
        'Climate-responsive envelope & jaali design',
        'Private terraces, verandahs & water bodies',
        'Landscape & exterior hardscape master plan',
        'Material sourcing & artisanal finishes guidance',
      ],
    },
    {
      id: 'commercial-architecture',
      title: 'Commercial Architecture',
      category: 'Workplace & Retail',
      enquiryType: 'Commercial Architecture',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      icon: Building2,
      description:
        'Distinctive corporate headquarters, creative ateliers, boutique retail galleries, and commercial elevations engineered for brand prestige, energy efficiency, and functional agility.',
      includes: [
        'Commercial building elevations & facade engineering',
        'Collaborative office floor layouts & zoning',
        'Solar shading & energy-efficient envelope design',
        'Lobby, reception & public realm experiences',
        'Code compliance & municipal drawing coordination',
        'High-traffic material durability consulting',
      ],
    },
    {
      id: 'interior-design',
      title: 'Interior Design',
      category: 'Interiors',
      enquiryType: 'Interior Design',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
      icon: Layers,
      description:
        'Atmospheric, sensory-rich interior environments where bespoke cabinetry, lime plaster, natural stone, and warm diffused lighting converge into calm, uncluttered living spaces.',
      includes: [
        'Complete spatial reconfiguration & flow optimization',
        'Custom furniture & bespoke joinery drawings',
        'Material, stone, veneer & textile curation',
        'Architectural lighting layouts & fixture selection',
        'Sanitaryware, hardware & fittings schedules',
        'Art curation & styling direction',
      ],
    },
    {
      id: 'building-planning',
      title: 'Building Planning and Layouts',
      category: 'Spatial Engineering',
      enquiryType: 'Building Planning and Layouts',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
      icon: LayoutGrid,
      description:
        'Rational, high-efficiency space planning for plots of all dimensions. We maximize usable floor plate, daylight penetration, and circulation clarity while respecting municipal norms and Vastu principles.',
      includes: [
        'Floor plate efficiency & circulation analysis',
        'Zoning & departmental clustering layouts',
        'Vastu-compliant spatial orientation (if desired)',
        'Fire egress, accessibility & service core planning',
        'Parking & vehicular movement layouts',
        'FSI / FAR optimization documentation',
      ],
    },
    {
      id: 'renovation-remodeling',
      title: 'Renovation and Remodeling',
      category: 'Adaptive Reuse',
      enquiryType: 'Renovation and Remodeling',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85',
      icon: Hammer,
      description:
        'Sensitively revitalizing aged apartments, ancestral bungalows, or outdated structures. We remove redundant walls, expand natural light, and introduce contemporary infrastructure without losing soul.',
      includes: [
        'Structural assessment & wall removal feasibility',
        'Complete plumbing, electrical & HVAC overhauls',
        'Modernizing layouts for open-plan living',
        'Restoration of heritage woodwork or stone elements',
        'Moisture proofing & finish rejuvenation',
        'Phased execution planning to minimize disruption',
      ],
    },
    {
      id: '3d-visualization',
      title: '3D Visualization and Design Consultation',
      category: 'Digital Representation',
      enquiryType: '3D Visualization and Design Consultation',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      icon: Eye,
      description:
        'Photorealistic architectural visualizations, 3D daylight simulations, and dedicated design consultations that allow you to experience materials, scale, and spatial mood long before ground is broken.',
      includes: [
        'High-resolution exterior & interior renders',
        'Daylight & artificial lighting mood studies',
        'Material & texture swatch mockups',
        'Virtual walkthroughs & 360 panoramic views',
        'One-on-one architectural consultation sessions',
        'Site feasibility & design potential audits',
      ],
    },
  ];

  return (
    <div className="bg-ivory text-charcoal pt-32 pb-24">
      {/* Page Title */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
            Studio Capabilities
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.1]">
            Thoughtful services tailored to individual spatial visions.
          </h1>
          <p className="text-warmgrey text-lg font-light leading-relaxed pt-2">
            Every project begins with listening. Explore our core architectural and interior design offerings, each
            executed with meticulous attention to detail and material craft.
          </p>
        </div>
      </section>

      {/* Services List - Editorial Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {servicesList.map((service, index) => {
          const isEven = index % 2 === 0;
          const IconComp = service.icon;

          return (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                !isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] overflow-hidden bg-beige border border-border-subtle group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text & Scope Column */}
              <div className={`lg:col-span-6 space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs uppercase tracking-[0.24em] text-taupe font-semibold">
                      0{index + 1} • {service.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-tight">
                    {service.title}
                  </h2>
                </div>

                <p className="text-warmgrey text-base leading-relaxed font-light">{service.description}</p>

                {/* Scope items */}
                <div className="pt-2 border-t border-border-subtle">
                  <h4 className="text-xs uppercase tracking-wider text-charcoal font-semibold mb-3">
                    What this service includes:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-warmgrey">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-taupe mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct CTA */}
                <div className="pt-4">
                  <Link
                    to={`/contact?type=${encodeURIComponent(service.enquiryType)}`}
                    className="inline-flex items-center space-x-2 px-6 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-all text-xs tracking-[0.18em] uppercase font-semibold group"
                  >
                    <span>Discuss Your {service.title} Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Footer Banner */}
      <section className="max-w-5xl mx-auto px-6 mt-32 text-center bg-beige/40 p-12 md:p-16 border border-border-subtle">
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
          Uncertain which service matches your project scope?
        </h3>
        <p className="text-warmgrey text-base max-w-xl mx-auto mb-8">
          Contact our studio directly for an exploratory conversation. Ar. Pranali Ghorpade will guide you through the
          recommended architectural approach.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs tracking-[0.2em] uppercase font-semibold"
        >
          <span>Schedule an Initial Call</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};

export default ServicesPage;

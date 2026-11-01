import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Filter } from 'lucide-react';
import { projectAPI } from '../services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Residential', 'Commercial', 'Interiors', 'Other'];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        const res = await projectAPI.getAll(params);
        setProjects(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load portfolio projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCategory]);

  return (
    <div className="bg-ivory text-charcoal pt-32 pb-28">
      {/* Page Title */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
            Architectural Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.1]">
            Selected Works
          </h1>
          <p className="text-warmgrey text-base sm:text-lg font-light leading-relaxed">
            A curated collection of residences, workplaces, and spatial interventions shaped by context, light, and
            material honesty.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3 border-b border-border-subtle pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-charcoal text-ivory font-semibold'
                  : 'text-warmgrey hover:text-charcoal bg-transparent hover:bg-beige/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Editorial Gallery */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="space-y-4">
                <div className="aspect-[16/10] bg-beige/60 rounded"></div>
                <div className="h-6 bg-beige/80 w-3/4 rounded"></div>
                <div className="h-4 bg-beige/50 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-beige/20 border border-border-subtle">
            <p className="font-serif text-2xl text-charcoal mb-2">No projects found in this category.</p>
            <p className="text-sm text-warmgrey">Try selecting "All" or check back as new projects are published.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-6 px-6 py-2.5 bg-charcoal text-ivory text-xs uppercase tracking-widest"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            {projects.map((project, idx) => {
              // Create an editorial rhythm: alternating between wide cards and regular cards
              const isWide = idx % 3 === 0;
              const colSpan = isWide ? 'md:col-span-12 lg:col-span-12' : 'md:col-span-6 lg:col-span-6';
              const aspectRatio = isWide ? 'aspect-[16/9] md:aspect-[21/10]' : 'aspect-[4/3]';

              return (
                <div key={project._id || project.slug} className={`${colSpan} group`}>
                  <Link to={`/projects/${project.slug || project._id}`} className="block">
                    <div className={`relative ${aspectRatio} overflow-hidden bg-beige border border-border-subtle`}>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-ivory/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest text-charcoal font-medium">
                        {project.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-charcoal/80 text-ivory backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-mono">
                        {project.year}
                      </div>
                    </div>

                    <div className="mt-5 flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-serif text-2xl md:text-3xl font-normal text-charcoal group-hover:text-taupe transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs tracking-wider uppercase text-warmgrey">
                          {project.location} {project.area ? `• ${project.area}` : ''}
                        </p>
                        {project.shortDescription && (
                          <p className="text-sm text-warmgrey line-clamp-2 max-w-2xl font-light pt-1">
                            {project.shortDescription}
                          </p>
                        )}
                      </div>
                      <div className="w-9 h-9 rounded-full border border-border-medium flex items-center justify-center text-charcoal group-hover:bg-charcoal group-hover:text-ivory transition-colors shrink-0 mt-1 ml-4">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Commission CTA banner */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="border-t border-border-subtle pt-16 space-y-6">
          <span className="text-xs uppercase tracking-[0.28em] text-taupe font-semibold block">
            Start Your Commission
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Have a site ready for architectural exploration?
          </h2>
          <p className="text-warmgrey text-base max-w-lg mx-auto font-light">
            Connect with Ar. Pranali Ghorpade for a preliminary feasibility consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-ivory hover:bg-taupe transition-colors text-xs tracking-[0.2em] uppercase font-semibold"
            >
              <span>Initiate Project Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

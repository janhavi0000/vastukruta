import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Calendar, Maximize2, Tag, CheckCircle2 } from 'lucide-react';
import { projectAPI } from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [navigation, setNavigation] = useState({ previous: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModalImage, setActiveModalImage] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await projectAPI.getBySlug(slug);
        setProject(res.data?.data);
        setNavigation(res.data?.navigation || { previous: null, next: null });
      } catch (err) {
        console.error('Failed to load project details:', err);
        setError('The requested architectural project could not be found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-beige/60 w-32 rounded"></div>
          <div className="h-14 bg-beige/80 w-3/4 rounded"></div>
          <div className="aspect-[21/9] bg-beige/60 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center">
        <h2 className="font-serif text-3xl text-charcoal mb-4">Project Not Found</h2>
        <p className="text-warmgrey mb-8">{error || 'The requested project could not be located.'}</p>
        <Link
          to="/projects"
          className="px-6 py-3 bg-charcoal text-ivory text-xs uppercase tracking-widest font-semibold"
        >
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory text-charcoal pt-32 pb-28">
      {/* 1. Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-warmgrey hover:text-charcoal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Works</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-taupe font-semibold">
            {project.category}
          </span>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-charcoal leading-[1.08]">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base uppercase tracking-wider text-warmgrey font-sans">
            {project.location} {project.year ? `• Year ${project.year}` : ''} {project.area ? `• ${project.area}` : ''}
          </p>
        </div>
      </div>

      {/* 2. Hero Cover Image */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="aspect-[16/9] md:aspect-[21/10] overflow-hidden bg-beige border border-border-subtle shadow-sm">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Main Narrative & Specifications Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Project Story Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
              Architectural Concept & Narrative
            </span>
            <div className="text-warmgrey text-base sm:text-lg leading-relaxed font-light space-y-4 whitespace-pre-line">
              {project.description}
            </div>
          </div>

          {/* Specifications Sidebar Column */}
          <div className="lg:col-span-5">
            <div className="bg-beige/40 p-8 border border-border-subtle space-y-6">
              <h3 className="font-serif text-2xl text-charcoal pb-4 border-b border-border-subtle">
                Project Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-border-subtle/60">
                  <span className="text-warmgrey uppercase tracking-wider text-xs">Typology / Category</span>
                  <span className="text-charcoal font-medium">{project.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-subtle/60">
                  <span className="text-warmgrey uppercase tracking-wider text-xs">Location</span>
                  <span className="text-charcoal font-medium">{project.location}</span>
                </div>
                {project.area && (
                  <div className="flex justify-between py-2 border-b border-border-subtle/60">
                    <span className="text-warmgrey uppercase tracking-wider text-xs">Area</span>
                    <span className="text-charcoal font-medium">{project.area}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex justify-between py-2 border-b border-border-subtle/60">
                    <span className="text-warmgrey uppercase tracking-wider text-xs">Year</span>
                    <span className="text-charcoal font-medium">{project.year}</span>
                  </div>
                )}
                {project.client && (
                  <div className="flex justify-between py-2 border-b border-border-subtle/60">
                    <span className="text-warmgrey uppercase tracking-wider text-xs">Client</span>
                    <span className="text-charcoal font-medium">{project.client}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-border-subtle/60">
                  <span className="text-warmgrey uppercase tracking-wider text-xs">Status</span>
                  <span className="text-charcoal font-medium">{project.status}</span>
                </div>

                {/* Additional dynamic specifications */}
                {project.specifications &&
                  project.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between py-2 border-b border-border-subtle/60">
                      <span className="text-warmgrey uppercase tracking-wider text-xs">{spec.label}</span>
                      <span className="text-charcoal font-medium text-right max-w-[60%]">{spec.value}</span>
                    </div>
                  ))}
              </div>

              <div className="pt-4">
                <Link
                  to={`/contact?type=${encodeURIComponent(project.category)}&ref=${encodeURIComponent(project.title)}`}
                  className="w-full text-center flex items-center justify-center space-x-2 py-3 bg-charcoal text-ivory hover:bg-taupe text-xs tracking-widest uppercase font-semibold transition-colors"
                >
                  <span>Inquire for Similar Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Multi-Image Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
          <div className="mb-10 space-y-2">
            <span className="text-xs tracking-[0.28em] uppercase text-taupe font-semibold block">
              Photographic Essay
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
              Spaces, Materials & Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((imgUrl, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden bg-beige border border-border-subtle group cursor-pointer"
                onClick={() => setActiveModalImage(imgUrl)}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} detail ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 bg-ivory/90 text-charcoal rounded-full">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveModalImage(null)}
        >
          <img
            src={activeModalImage}
            alt="Fullscreen architectural photograph"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
          <button
            onClick={() => setActiveModalImage(null)}
            className="absolute top-6 right-6 text-ivory text-sm tracking-widest uppercase bg-charcoal/50 px-4 py-2 border border-border-dark"
          >
            Close ✕
          </button>
        </div>
      )}

      {/* 6. Previous & Next Project Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 border-t border-border-subtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {navigation.previous && (
            <Link
              to={`/projects/${navigation.previous.slug || navigation.previous._id}`}
              className="p-6 border border-border-subtle hover:border-taupe transition-colors group flex items-center space-x-4 bg-beige/20"
            >
              <ArrowLeft className="w-5 h-5 text-warmgrey group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] uppercase tracking-widest text-warmgrey block">Previous Project</span>
                <span className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-taupe transition-colors">
                  {navigation.previous.title}
                </span>
              </div>
            </Link>
          )}

          {navigation.next && (
            <Link
              to={`/projects/${navigation.next.slug || navigation.next._id}`}
              className="p-6 border border-border-subtle hover:border-taupe transition-colors group flex items-center justify-between bg-beige/20 text-right sm:ml-auto w-full"
            >
              <div className="text-left sm:text-right w-full pr-4">
                <span className="text-[10px] uppercase tracking-widest text-warmgrey block">Next Project</span>
                <span className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-taupe transition-colors">
                  {navigation.next.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-warmgrey group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

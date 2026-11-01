import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Upload,
  X,
  Check,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import { projectAPI, uploadAPI } from '../../services/api';

const AdminProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null); // id of project to delete
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Form State
  const initialForm = {
    title: '',
    slug: '',
    category: 'Residential',
    location: '',
    year: new Date().getFullYear().toString(),
    area: '',
    client: 'Private Residence',
    status: 'Completed',
    shortDescription: '',
    description: '',
    coverImage: '',
    galleryString: '', // newline separated
    specifications: [
      { label: 'Typology', value: 'Private Villa' },
      { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
      { label: 'Material Palette', value: 'Natural Stone, Teak, Concrete' },
    ],
    featured: false,
    published: true,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectAPI.getAll({
        includeUnpublished: 'true',
        category: filterCategory !== 'All' ? filterCategory : undefined,
        search: search || undefined,
      });
      setProjects(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filterCategory, search]);

  // Open modal if action=new in query params
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      openAddModal();
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData(initialForm);
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      location: project.location,
      year: project.year,
      area: project.area || '',
      client: project.client || '',
      status: project.status || 'Completed',
      shortDescription: project.shortDescription || '',
      description: project.description,
      coverImage: project.coverImage,
      galleryString: (project.gallery || []).join('\n'),
      specifications:
        project.specifications && project.specifications.length > 0
          ? project.specifications
          : [{ label: 'Typology', value: project.category }],
      featured: Boolean(project.featured),
      published: project.published !== undefined ? Boolean(project.published) : true,
    });
    setFormError('');
    setFormSuccess('');
    setIsModalOpen(true);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...formData.specifications];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, specifications: updated }));
  };

  const addSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { label: '', value: '' }],
    }));
  };

  const removeSpecRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  // Image Upload helper
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await uploadAPI.uploadSingle(data);
      if (res.data?.url) {
        setFormData((prev) => ({ ...prev, coverImage: res.data.url }));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!formData.title || !formData.category || !formData.location || !formData.description || !formData.coverImage) {
      setFormError('Please fill in Title, Category, Location, Description, and Cover Image.');
      return;
    }

    const galleryArray = formData.galleryString
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      ...formData,
      gallery: galleryArray,
    };

    try {
      if (editingProject) {
        await projectAPI.update(editingProject._id, payload);
        setFormSuccess('Project updated successfully.');
      } else {
        await projectAPI.create(payload);
        setFormSuccess('Project created successfully.');
      }

      setTimeout(() => {
        setIsModalOpen(false);
        fetchProjects();
      }, 700);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to save project.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await projectAPI.delete(id);
      setIsDeleting(null);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project.');
    }
  };

  const togglePublish = async (project) => {
    try {
      await projectAPI.update(project._id, { published: !project.published });
      fetchProjects();
    } catch (err) {
      alert('Failed to update published status');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-medium gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-taupe font-semibold block">
            Portfolio CMS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Projects Management</h1>
          <p className="text-warmgrey text-xs sm:text-sm mt-1">
            Add, update, curate photographs, and manage live architectural projects.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-5 py-3 bg-charcoal text-ivory hover:bg-taupe text-xs tracking-wider uppercase font-semibold transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 border border-border-subtle">
        <div className="flex items-center space-x-2">
          {['All', 'Residential', 'Commercial', 'Interiors', 'Other'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-colors ${
                filterCategory === cat
                  ? 'bg-charcoal text-ivory font-semibold'
                  : 'text-warmgrey hover:text-charcoal bg-transparent hover:bg-beige/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-warmgrey absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-warmgrey animate-pulse">Loading architectural projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-warmgrey">
            <p className="font-serif text-xl text-charcoal mb-2">No projects found.</p>
            <p className="text-xs mb-4">Click below to add your first architectural commission.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-border-subtle text-warmgrey uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/70">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-12 h-10 object-cover rounded border border-border-subtle shrink-0"
                        />
                        <div>
                          <p className="font-medium text-sm text-charcoal">{proj.title}</p>
                          <p className="text-[10px] text-warmgrey font-mono truncate max-w-[200px]">{proj.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-charcoal font-medium">{proj.category}</td>
                    <td className="py-3 px-4 text-warmgrey">{proj.location}</td>
                    <td className="py-3 px-4 text-warmgrey font-mono">{proj.year}</td>
                    <td className="py-3 px-4 text-center">
                      {proj.featured ? (
                        <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded text-[10px] uppercase font-semibold">
                          Featured
                        </span>
                      ) : (
                        <span className="text-warmgrey text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => togglePublish(proj)}
                        className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold border ${
                          proj.published
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }`}
                        title="Click to toggle publish status"
                      >
                        {proj.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <a
                          href={`/projects/${proj.slug || proj._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-warmgrey hover:text-charcoal hover:bg-beige/50 rounded"
                          title="View Live"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 text-warmgrey hover:text-charcoal hover:bg-beige/50 rounded"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setIsDeleting(proj._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 max-w-sm w-full border border-border-subtle shadow-xl space-y-4">
            <h3 className="font-serif text-xl text-charcoal">Delete Project?</h3>
            <p className="text-xs text-warmgrey">
              This action cannot be undone. The project will be permanently removed from the portfolio.
            </p>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setIsDeleting(null)}
                className="px-4 py-2 bg-beige/40 text-charcoal text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(isDeleting)}
                className="px-4 py-2 bg-red-600 text-white text-xs uppercase tracking-wider hover:bg-red-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-border-subtle shadow-2xl my-6">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6">
              <div>
                <h2 className="font-serif text-2xl text-charcoal">
                  {editingProject ? 'Edit Architectural Project' : 'Add New Architectural Project'}
                </h2>
                <p className="text-xs text-warmgrey">Fill in details, photography, and specifications</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-warmgrey hover:text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. The Courtyard Villa"
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    URL Slug (Optional - auto-generated)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. the-courtyard-villa"
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Category, Location, Year, Area */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Interiors">Interiors</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Alibaug, Maharashtra"
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Area (sq. ft.)
                  </label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. 6,200 sq. ft."
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  />
                </div>
              </div>

              {/* Client & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Client Typology
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Private Residence"
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                    Completion Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Concept">Concept</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              {/* Short & Detailed Description */}
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                  Short Summary (for card preview)
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence overview of the architectural concept..."
                  className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                  Full Architectural Narrative *
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Elaborate on climate strategy, material selection, spatial zoning..."
                  className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none"
                  required
                />
              </div>

              {/* Cover Image URL & File Upload */}
              <div className="p-4 bg-[#FAF8F5] border border-border-subtle space-y-3">
                <label className="block uppercase tracking-wider font-semibold text-charcoal">
                  Cover Photograph *
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://... or upload below"
                    className="flex-1 p-2 bg-white border border-border-subtle focus:border-taupe focus:outline-none text-xs"
                    required
                  />
                  <label className="px-4 py-2 bg-charcoal text-ivory text-xs uppercase tracking-wider cursor-pointer hover:bg-taupe transition-colors flex items-center justify-center space-x-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
                {formData.coverImage && (
                  <div className="mt-2 flex items-center space-x-3">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-24 h-16 object-cover border border-border-subtle rounded"
                    />
                    <span className="text-[11px] text-emerald-700">✓ Image ready</span>
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block uppercase tracking-wider font-semibold mb-1 text-charcoal">
                  Additional Gallery Images (Paste URLs, one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.galleryString}
                  onChange={(e) => setFormData({ ...formData, galleryString: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-1...&#10;https://images.unsplash.com/photo-2..."
                  className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none font-mono text-xs"
                />
              </div>

              {/* Dynamic Specifications */}
              <div className="p-4 bg-[#FAF8F5] border border-border-subtle space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block uppercase tracking-wider font-semibold text-charcoal">
                    Architectural Specifications & Data
                  </label>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="text-xs uppercase tracking-wider text-taupe font-semibold hover:underline"
                  >
                    + Add Spec Row
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Label (e.g. Material)"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                        className="w-1/3 p-2 bg-white border border-border-subtle text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. Basalt Stone)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="flex-1 p-2 bg-white border border-border-subtle text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(idx)}
                        className="p-1.5 text-red-500 hover:text-red-700"
                        title="Remove row"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured & Published Toggles */}
              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-taupe border-border-subtle focus:ring-0"
                  />
                  <span className="font-medium text-charcoal">Feature on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-taupe border-border-subtle focus:ring-0"
                  />
                  <span className="font-medium text-charcoal">Publish to Live Portfolio</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-6 border-t border-border-subtle flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-beige/40 text-charcoal text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-charcoal text-ivory hover:bg-taupe text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsPage;

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  CheckCircle,
  Clock,
  MessageCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { enquiryAPI } from '../../services/api';

const AdminEnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Selected Enquiry for Details Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [saveNotesSuccess, setSaveNotesSuccess] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await enquiryAPI.getAll({
        status: statusFilter !== 'All' ? statusFilter : undefined,
        search: search || undefined,
      });
      setEnquiries(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, search]);

  const handleOpenDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || '');
    setSaveNotesSuccess(false);
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    setUpdatingStatus(true);
    try {
      await enquiryAPI.updateStatus(enquiryId, { status: newStatus });
      // Update local state
      setEnquiries((prev) =>
        prev.map((e) => (e._id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      await enquiryAPI.updateStatus(selectedEnquiry._id, { adminNotes });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === selectedEnquiry._id ? { ...e, adminNotes } : e))
      );
      setSaveNotesSuccess(true);
      setTimeout(() => setSaveNotesSuccess(false), 2000);
    } catch (err) {
      alert('Failed to save notes.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await enquiryAPI.delete(id);
      setIsDeleting(null);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(null);
      }
      fetchEnquiries();
    } catch (err) {
      alert('Failed to delete enquiry.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'In Progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border-medium">
        <span className="text-[11px] uppercase tracking-[0.24em] text-taupe font-semibold block">
          Client Inquiries
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">Enquiry Management</h1>
        <p className="text-warmgrey text-xs sm:text-sm mt-1">
          Review, track, and update client project submissions and requirements.
        </p>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 border border-border-subtle">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-sm transition-colors ${
                statusFilter === tab
                  ? 'bg-charcoal text-ivory font-semibold'
                  : 'text-warmgrey hover:text-charcoal bg-transparent hover:bg-beige/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-warmgrey absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search client, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-warmgrey animate-pulse">Loading inquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-warmgrey">
            <p className="font-serif text-xl text-charcoal mb-1">No enquiries found.</p>
            <p className="text-xs">No client requests match the current filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-border-subtle text-warmgrey uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Typology</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/70">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-sm text-charcoal">{enq.fullName}</p>
                      <p className="text-[10px] text-warmgrey font-mono truncate max-w-[150px]">
                        ID: {enq._id.slice(-6)}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal">{enq.projectType}</td>
                    <td className="py-3.5 px-4 text-warmgrey">{enq.location}</td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <a href={`tel:${enq.phone}`} className="text-warmgrey hover:text-charcoal block">
                          {enq.phone}
                        </a>
                        <a href={`mailto:${enq.email}`} className="text-[11px] text-taupe hover:underline block">
                          {enq.email}
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-warmgrey whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className={`text-[11px] font-semibold py-1 px-2 border rounded cursor-pointer focus:outline-none ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenDetails(enq)}
                          className="px-2.5 py-1.5 bg-beige/40 hover:bg-beige text-charcoal rounded text-[11px] uppercase tracking-wider font-semibold flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                        <button
                          onClick={() => setIsDeleting(enq._id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Delete Enquiry"
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
            <h3 className="font-serif text-xl text-charcoal">Delete Client Enquiry?</h3>
            <p className="text-xs text-warmgrey">
              This action cannot be undone. All submitted details will be permanently erased.
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

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-charcoal/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-border-subtle shadow-2xl my-6 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-border-subtle">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-taupe block">
                  Enquiry ID: {selectedEnquiry._id}
                </span>
                <h2 className="font-serif text-2xl text-charcoal">{selectedEnquiry.fullName}</h2>
                <p className="text-xs text-warmgrey">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-warmgrey hover:text-charcoal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Status Selector Bar */}
            <div className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-border-subtle text-xs">
              <span className="font-semibold text-charcoal uppercase tracking-wider">Pipeline Status:</span>
              <div className="flex items-center space-x-2">
                {['New', 'Contacted', 'In Progress', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedEnquiry._id, st)}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-all border ${
                      selectedEnquiry.status === st
                        ? getStatusBadge(st) + ' ring-2 ring-offset-1 ring-taupe'
                        : 'bg-white text-warmgrey border-border-subtle hover:bg-beige/30'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Phone Number</span>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="font-medium text-sm text-charcoal hover:text-taupe flex items-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-taupe" />
                  <span>{selectedEnquiry.phone}</span>
                </a>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Email Address</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="font-medium text-sm text-charcoal hover:text-taupe flex items-center space-x-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-taupe" />
                  <span className="truncate">{selectedEnquiry.email}</span>
                </a>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Project Typology</span>
                <p className="font-medium text-charcoal">{selectedEnquiry.projectType}</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Location</span>
                <p className="font-medium text-charcoal flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-taupe" />
                  <span>{selectedEnquiry.location}</span>
                </p>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Approximate Area</span>
                <p className="font-medium text-charcoal">{selectedEnquiry.approxArea || 'Not specified'}</p>
              </div>

              <div className="p-3 bg-[#FAF8F5] border border-border-subtle space-y-1">
                <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Budget Indication</span>
                <p className="font-medium text-charcoal">{selectedEnquiry.budget || 'Flexible / Unspecified'}</p>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
                Project Vision & Client Scope:
              </span>
              <div className="p-4 bg-[#FAF8F5] border border-border-subtle text-xs leading-relaxed text-charcoal whitespace-pre-wrap">
                {selectedEnquiry.description}
              </div>
            </div>

            {/* Architect Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-border-subtle">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Internal Studio Notes:
                </span>
                {saveNotesSuccess && (
                  <span className="text-[11px] text-emerald-700 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Log call summary, scheduled site visits, material preferences..."
                className="w-full p-2.5 bg-beige/20 border border-border-subtle focus:border-taupe focus:outline-none text-xs"
              />
              <div className="flex justify-between items-center pt-1">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.fullName}, this is Ar. Pranali Ghorpade from Vastukruta regarding your recent project inquiry.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-[#25D366] font-semibold hover:underline"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Client</span>
                </a>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 bg-charcoal text-ivory hover:bg-taupe text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiriesPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Inbox,
  Sparkles,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Eye,
  Settings as SettingsIcon,
} from 'lucide-react';
import { enquiryAPI, projectAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalProjects: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    inProgress: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [enquiryStatsRes, projectsRes] = await Promise.all([
          enquiryAPI.getStats(),
          projectAPI.getAll({ includeUnpublished: 'true' }),
        ]);

        const eqData = enquiryStatsRes.data?.stats || {};
        const pList = projectsRes.data?.data || [];

        setStats({
          totalProjects: pList.length,
          totalEnquiries: eqData.total || 0,
          newEnquiries: eqData.new || 0,
          inProgress: eqData.inProgress || 0,
        });

        setRecentEnquiries(enquiryStatsRes.data?.recent || []);
        setRecentProjects(pList.slice(0, 4));
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
    <div className="space-y-10">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border-medium gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] text-taupe font-semibold block">
            Studio Command Center
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal">
            Welcome back, {user?.name || 'Architect'}
          </h1>
          <p className="text-warmgrey text-xs sm:text-sm mt-1">
            Real-time portfolio management and client enquiry pipeline for Vastukruta.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/projects?action=new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-charcoal text-ivory hover:bg-taupe text-xs tracking-wider uppercase font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-border-medium text-charcoal hover:bg-beige/40 text-xs tracking-wider uppercase font-semibold transition-colors"
          >
            <Inbox className="w-4 h-4" />
            <span>View All Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-border-subtle shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-beige/50 rounded flex items-center justify-center text-charcoal shrink-0">
            <FolderKanban className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warmgrey block">Total Projects</span>
            <span className="font-serif text-3xl font-medium text-charcoal">{stats.totalProjects}</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded flex items-center justify-center shrink-0">
            <Inbox className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warmgrey block">New Enquiries</span>
            <span className="font-serif text-3xl font-medium text-blue-900">{stats.newEnquiries}</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warmgrey block">In Progress</span>
            <span className="font-serif text-3xl font-medium text-purple-900">{stats.inProgress}</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-border-subtle shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warmgrey block">Total Leads</span>
            <span className="font-serif text-3xl font-medium text-emerald-900">{stats.totalEnquiries}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Client Enquiries */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-border-subtle shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Recent Inquiries</h2>
              <p className="text-xs text-warmgrey">Incoming project briefs from potential clients</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs uppercase tracking-wider text-taupe hover:text-charcoal font-semibold flex items-center space-x-1"
            >
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-beige/30 rounded"></div>
              ))}
            </div>
          ) : recentEnquiries.length === 0 ? (
            <p className="text-sm text-warmgrey py-8 text-center">No enquiries received yet.</p>
          ) : (
            <div className="space-y-4">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry._id}
                  className="p-4 bg-[#FAF8F5] border border-border-subtle hover:border-taupe transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-charcoal">{enquiry.fullName}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 border rounded-full font-medium ${getStatusBadge(
                          enquiry.status
                        )}`}
                      >
                        {enquiry.status}
                      </span>
                    </div>
                    <p className="text-xs text-warmgrey">
                      {enquiry.projectType} • {enquiry.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-warmgrey shrink-0">
                    <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                    <Link
                      to="/admin/enquiries"
                      className="p-1.5 hover:bg-beige/60 rounded text-charcoal"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Projects Preview */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-border-subtle shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Featured Works</h2>
              <p className="text-xs text-warmgrey">Live studio portfolio items</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs uppercase tracking-wider text-taupe hover:text-charcoal font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-14 bg-beige/30 rounded"></div>
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <p className="text-sm text-warmgrey py-8 text-center">No projects in database.</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-border-subtle"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-12 h-10 object-cover rounded shrink-0 border border-border-subtle"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-charcoal truncate">{p.title}</p>
                      <p className="text-[10px] uppercase tracking-wider text-warmgrey truncate">
                        {p.category} • {p.location}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 pl-2">
                    <Link
                      to={`/projects/${p.slug || p._id}`}
                      target="_blank"
                      className="p-1 text-warmgrey hover:text-charcoal"
                      title="Preview Live"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-border-subtle">
            <Link
              to="/admin/settings"
              className="flex items-center justify-between p-3 bg-beige/30 hover:bg-beige/60 text-xs text-charcoal rounded transition-colors"
            >
              <span className="flex items-center space-x-2">
                <SettingsIcon className="w-4 h-4 text-taupe" />
                <span>Update Studio Profile & Contact Settings</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

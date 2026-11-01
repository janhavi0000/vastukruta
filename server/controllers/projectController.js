const Project = require('../models/Project');

// Helper to generate slug
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// @desc    Get all projects (public with filters, admin can see unpublished)
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const { category, featured, search, includeUnpublished } = req.query;
    const filter = {};

    // Only filter published if not explicitly requested by admin
    if (includeUnpublished !== 'true') {
      filter.published = true;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.featured = true;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects.',
      error: error.message,
    });
  }
};

// @desc    Get single project by slug or ID with adjacent previous & next navigation
// @route   GET /api/projects/:slugOrId
// @access  Public
exports.getProjectBySlugOrId = async (req, res) => {
  try {
    const { slugOrId } = req.params;

    let project = await Project.findOne({ slug: slugOrId });
    if (!project && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(slugOrId);
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Get adjacent projects for seamless editorial navigation
    const allPublished = await Project.find({ published: true })
      .select('title slug category coverImage')
      .sort({ order: 1, createdAt: -1 });

    const currentIndex = allPublished.findIndex((p) => p._id.toString() === project._id.toString());
    const prevProject = currentIndex > 0 ? allPublished[currentIndex - 1] : allPublished[allPublished.length - 1];
    const nextProject = currentIndex < allPublished.length - 1 ? allPublished[currentIndex + 1] : allPublished[0];

    res.status(200).json({
      success: true,
      data: project,
      navigation: {
        previous: prevProject || null,
        next: nextProject || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.',
      error: error.message,
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin)
exports.createProject = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      location,
      year,
      area,
      client,
      status,
      shortDescription,
      description,
      specifications,
      coverImage,
      gallery,
      featured,
      published,
      order,
    } = req.body;

    if (!title || !category || !location || !description || !coverImage) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, location, description, and cover image are required fields.',
      });
    }

    let finalSlug = slug ? slugify(slug) : slugify(title);

    // Ensure unique slug
    let existingSlug = await Project.findOne({ slug: finalSlug });
    if (existingSlug) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const project = await Project.create({
      title,
      slug: finalSlug,
      category,
      location,
      year: year || new Date().getFullYear().toString(),
      area: area || '',
      client: client || 'Private Residence',
      status: status || 'Completed',
      shortDescription: shortDescription || '',
      description,
      specifications: Array.isArray(specifications) ? specifications : [],
      coverImage,
      gallery: Array.isArray(gallery) ? gallery : [],
      featured: Boolean(featured),
      published: published !== undefined ? Boolean(published) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project,
    });
  } catch (error) {
    console.error('[Create Project Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project.',
      error: error.message,
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    let project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // If slug is changed, check uniqueness
    if (req.body.slug && req.body.slug !== project.slug) {
      const formattedSlug = slugify(req.body.slug);
      const existing = await Project.findOne({ slug: formattedSlug, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'A project with this URL slug already exists.',
        });
      }
      req.body.slug = formattedSlug;
    }

    project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project.',
      error: error.message,
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
      error: error.message,
    });
  }
};

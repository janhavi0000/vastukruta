const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');

const User = require('../models/User');
const Project = require('../models/Project');
const Enquiry = require('../models/Enquiry');
const Setting = require('../models/Setting');

const seedData = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    console.log('[Seed] Clearing existing Vastukruta collections...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Enquiry.deleteMany({});
    await Setting.deleteMany({});

    // 1. Create Default Admin User
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@vastukruta.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Vastukruta@2026';
    const adminName = process.env.ADMIN_NAME || 'Ar. Pranali Ghorpade';

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });
    console.log(`[Seed] Created Admin: ${admin.email} / ${adminPassword}`);

    // 2. Create Studio Settings
    const studioSettings = await Setting.create({
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
    });
    console.log('[Seed] Created Studio Settings for Vastukruta');

    // 3. Create Curated Architectural Projects
    const projects = [
      {
        title: 'The Courtyard Villa',
        slug: 'the-courtyard-villa',
        category: 'Residential',
        location: 'Alibaug, Maharashtra',
        year: '2024',
        area: '6,200 sq. ft.',
        client: 'Private Residence',
        status: 'Completed',
        shortDescription: 'A tropical modern residence configured around a contemplative central water court and laterite stone colonnades.',
        description: `Conceived as a tranquil retreat away from the metropolitan rush, The Courtyard Villa responds intuitively to the tropical coastal climate of Alibaug. The residence is organized around a central open-to-sky water body that acts as both a thermal sink and an atmospheric sanctuary.

Deep verandahs, pivoted teakwood louvers, and locally sourced laterite stone walls foster a passive cooling microclimate. The interior program flows uninterrupted from intimate reading alcoves to generous communal spaces, celebrating the interplay of morning shadows, warm breeze, and filtered daylight.`,
        specifications: [
          { label: 'Typology', value: 'Private Luxury Villa' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Site Area', value: '18,500 sq. ft.' },
          { label: 'Built-up Area', value: '6,200 sq. ft.' },
          { label: 'Material Palette', value: 'Laterite Stone, Reclaimed Teak, Exposed Concrete, Kota Stone' },
          { label: 'Climate Strategy', value: 'Passive Cross-ventilation, Thermal Courtyard, Rainwater Harvesting' },
          { label: 'Completion Year', value: '2024' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: true,
        published: true,
        order: 1,
      },
      {
        title: 'Pavilion of Light',
        slug: 'pavilion-of-light',
        category: 'Residential',
        location: 'Prabhat Road, Pune',
        year: '2024',
        area: '4,800 sq. ft.',
        client: 'Private Residence',
        status: 'Completed',
        shortDescription: 'A multi-generational urban home characterized by board-formed concrete walls, brass jaalis, and sculpted light shafts.',
        description: `Set on a compact urban footprint in Pune's venerable Prabhat Road neighborhood, Pavilion of Light explores how verticality and inward-looking courtyards can yield serene domestic privacy amidst a bustling cityscape.

Board-formed concrete exterior planes are punctuated by perforated brass screens that filter harsh afternoon sun into gentle, lace-like patterns across honed lime plaster floors. A three-story central skylight acts as a spatial spine, anchoring the family living areas, prayer sanctuary, and rooftop garden pavilion.`,
        specifications: [
          { label: 'Typology', value: 'Bespoke Urban Residence' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Built-up Area', value: '4,800 sq. ft.' },
          { label: 'Key Materials', value: 'Board-formed Concrete, Brushed Brass, Lime Plaster, White Ash' },
          { label: 'Structural Consultant', value: 'Vastukruta Studio Structural Associates' },
          { label: 'Scope', value: 'Architecture, Landscape & Interior Styling' },
          { label: 'Completion Year', value: '2024' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: true,
        published: true,
        order: 2,
      },
      {
        title: 'Aura Minimalist Penthouse',
        slug: 'aura-minimalist-penthouse',
        category: 'Interiors',
        location: 'Bandra West, Mumbai',
        year: '2024',
        area: '3,800 sq. ft.',
        client: 'Private Residence',
        status: 'Completed',
        shortDescription: 'A calming seaside duplex penthouse embracing wabi-sabi aesthetics, micro-cement finishes, and hand-rubbed smoked oak.',
        description: `Aura Penthouse was conceived as a contemplative sanctuary elevated above the vibrant energy of Mumbai's coastline. Stripped of all non-essential ornamentation, the layout champions breathing room, tactile honesty, and soft diffused illumination.

Seamless micro-cement floors unite the living, dining, and gallery corridors. Floor-to-ceiling pivot windows invite sea breezes and frame changing sky horizons, while customized smoked oak joinery discreetly houses functional services, creating an uninterrupted rhythm of serene architectural surfaces.`,
        specifications: [
          { label: 'Typology', value: 'Luxury Residential Interior' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Area', value: '3,800 sq. ft.' },
          { label: 'Finish Palette', value: 'Mineral Micro-cement, Smoked Oak, Raw Travertine, Linen' },
          { label: 'Lighting Design', value: 'Concealed Warm Architectural 2700K Illumination' },
          { label: 'Completion Year', value: '2024' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: true,
        published: true,
        order: 3,
      },
      {
        title: 'Studio Atelier & Design Lab',
        slug: 'studio-atelier-design-lab',
        category: 'Commercial',
        location: 'Koregaon Park, Pune',
        year: '2023',
        area: '3,400 sq. ft.',
        client: 'Creative Collective',
        status: 'Completed',
        shortDescription: 'Adaptive reuse of an industrial warehouse into a biophilic creative workplace and material archive.',
        description: `Transforming a disused industrial warehouse into a cutting-edge creative studio, this project balances industrial heritage with contemporary architectural warmth. Exposed wire-cut brickwork and black mild-steel trusses were restored, complemented by double-height north-facing glazing.

Mezzanine discussion pods cantilever gently over an expansive central presentation hall. Integrated planters with indoor ficus trees and acoustic felt panels ensure a calm, productive acoustic atmosphere.`,
        specifications: [
          { label: 'Typology', value: 'Commercial Workplace & Atelier' },
          { label: 'Design Lead', value: 'Ar. Pranali Ghorpade' },
          { label: 'Built-up Area', value: '3,400 sq. ft.' },
          { label: 'Structure', value: 'Restored Steel Trusses & Exposed Wire-cut Brick' },
          { label: 'Sustainability', value: '100% Daylit Core, Energy-efficient Variable Refrigerant Flow (VRF)' },
          { label: 'Completion Year', value: '2023' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: true,
        published: true,
        order: 4,
      },
      {
        title: 'The Monolith Cliff Residence',
        slug: 'the-monolith-cliff-residence',
        category: 'Residential',
        location: 'Lonavala Hills, Maharashtra',
        year: '2023',
        area: '5,800 sq. ft.',
        client: 'Private Residence',
        status: 'Completed',
        shortDescription: 'A dramatic cantilevered hillside residence sculpted from local basalt stone and charred cedar timber.',
        description: `Anchored firmly into a steep mountain slope, The Monolith Cliff Residence appears to emerge directly from the bedrock. Two bold geometric volumes cantilever out towards panoramic valley vistas, creating covered outdoor living terraces sheltered from monsoon winds.

The upper level features an infinity-edge swimming pool that mirrors the shifting sky, while the lower level houses quiet sleeping quarters tucked into the cool earth. Sustainable stormwater management channels natural cliff runoff around the structural foundations.`,
        specifications: [
          { label: 'Typology', value: 'Hillside Retreat Residence' },
          { label: 'Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Area', value: '5,800 sq. ft.' },
          { label: 'Materials', value: 'Chiseled Basalt Stone, Charred Shou Sugi Ban Wood, Low-E Glass' },
          { label: 'Features', value: 'Valley Infinity Pool, Solar Thermal Water, Cantilever Terraces' },
          { label: 'Completion Year', value: '2023' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: false,
        published: true,
        order: 5,
      },
      {
        title: 'Earth & Timber Haven',
        slug: 'earth-timber-haven',
        category: 'Interiors',
        location: 'Kothrud, Pune',
        year: '2023',
        area: '2,650 sq. ft.',
        client: 'Private Residence',
        status: 'Completed',
        shortDescription: 'A serene domestic interior merging tactile terrazzo, cane weave, and natural lime-washed walls.',
        description: `This complete apartment remodel in Kothrud, Pune, redefines contemporary Indian interior aesthetics through a calm lens. Drawing inspiration from vernacular craft and modernist spatial clarity, the home replaces conventional partitions with open arches and fluted timber screens.

Custom cane weave cabinetry, cast-in-place green terrazzo countertops, and brass joinery provide rich tactile moments throughout every room.`,
        specifications: [
          { label: 'Typology', value: 'Apartment Interior Renovation' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Area', value: '2,650 sq. ft.' },
          { label: 'Finishes', value: 'Custom In-situ Terrazzo, Hand-woven Rattan, Natural Lime Wash' },
          { label: 'Cabinetry', value: 'Solid Teak and Linen Inserts' },
          { label: 'Completion Year', value: '2023' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: false,
        published: true,
        order: 6,
      },
      {
        title: 'Zenith Tech Innovation Hub',
        slug: 'zenith-tech-innovation-hub',
        category: 'Commercial',
        location: 'Baner Tech Corridor, Pune',
        year: '2024',
        area: '12,500 sq. ft.',
        client: 'Zenith Technologies',
        status: 'Completed',
        shortDescription: 'High-performance corporate building elevation and interior master planning with integrated solar louvers.',
        description: `Commissioned to design a state-of-the-art office for an innovative technology group, Vastukruta combined architectural dignity with energy performance. The building envelope utilizes automated perforated terracotta fins that respond to Pune's solar path, curbing cooling loads by 34%.

Inside, collaborative amphitheaters, focus nooks, and a triple-height atrium with live ficus trees encourage organic collaboration and wellness.`,
        specifications: [
          { label: 'Typology', value: 'Corporate Headquarters' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Built-up Area', value: '12,500 sq. ft.' },
          { label: 'Envelope', value: 'Terracotta Solar Fins & High-performance Double Glazing' },
          { label: 'Green Rating Target', value: 'GRIHA 4-Star Compliant' },
          { label: 'Completion Year', value: '2024' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: false,
        published: true,
        order: 7,
      },
      {
        title: 'Serenade Organic Farmhouse',
        slug: 'serenade-organic-farmhouse',
        category: 'Other',
        location: 'Mulshi, Maharashtra',
        year: '2024',
        area: '4,200 sq. ft.',
        client: 'Private Family',
        status: 'Under Construction',
        shortDescription: 'A rammed-earth weekend homestead blending regenerative landscape design, timber colonnades, and lake views.',
        description: `Set beside the serene waters of Mulshi lake, this experimental farmhouse utilizes stabilized rammed earth excavated directly from site contours. The horizontal layered strata of the walls narrate the geological memory of the terrain.

Shaded verandas, timber roof trusses, and permeable cobblestone walkways foster a continuous dialogue with the surrounding fruit orchards and organic farming terraces.`,
        specifications: [
          { label: 'Typology', value: 'Ecological Farmhouse' },
          { label: 'Principal Architect', value: 'Ar. Pranali Ghorpade' },
          { label: 'Plot Area', value: '2 Acres' },
          { label: 'Built-up Area', value: '4,200 sq. ft.' },
          { label: 'Structure', value: 'Stabilized Rammed Earth & Local Mango Timber' },
          { label: 'Status', value: 'Under Construction' },
        ],
        coverImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
        gallery: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
        ],
        featured: false,
        published: true,
        order: 8,
      },
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`[Seed] Successfully seeded ${createdProjects.length} architectural projects.`);

    // 4. Create Initial Sample Enquiries for Admin Dashboard demonstration
    const enquiries = [
      {
        fullName: 'Vikram & Radhika Deshmukh',
        phone: '+91 98221 12345',
        email: 'vikram.deshmukh@example.com',
        projectType: 'Residential Architecture',
        location: 'Bavdhan, Pune',
        approxArea: '5,200 sq. ft.',
        budget: '₹2.5 Cr - ₹3 Cr',
        description: 'We recently acquired a hillside corner plot in Bavdhan with valley views. We are looking for an architectural consultation to build a modern 4-BHK villa that maximizes natural light, incorporates open courtyards, and utilizes sustainable materials like exposed concrete and stone.',
        status: 'New',
        adminNotes: 'Review topographical site drawings sent by client.',
      },
      {
        fullName: 'Ananya S. Joshi',
        phone: '+91 97654 98765',
        email: 'ananya.joshi@designgroup.in',
        projectType: 'Interior Design',
        location: 'Kalyani Nagar, Pune',
        approxArea: '3,200 sq. ft.',
        budget: '₹75 Lakhs - ₹1 Cr',
        description: 'Looking for a comprehensive interior makeover for our 4-BHK penthouse. We appreciate the warm minimalist and wabi-sabi aesthetics shown in your Aura Penthouse project.',
        status: 'Contacted',
        adminNotes: 'First discovery call completed on Saturday. In-person studio meeting scheduled.',
      },
      {
        fullName: 'Rohan Mehra',
        phone: '+91 99234 56789',
        email: 'rohan.mehra@zenithtech.com',
        projectType: 'Commercial Architecture',
        location: 'Hinjawadi Phase 1, Pune',
        approxArea: '8,500 sq. ft.',
        budget: 'Flexible',
        description: 'Planning a tech innovation lab and collaborative workplace. Need architectural elevation design, sustainable sun-shading, and internal mezzanine spatial layout.',
        status: 'In Progress',
        adminNotes: 'Initial concept zoning and floor layout options presented.',
      },
    ];

    const createdEnquiries = await Enquiry.insertMany(enquiries);
    console.log(`[Seed] Successfully seeded ${createdEnquiries.length} client enquiries.`);

    console.log('[Seed] Database seeding completed successfully.');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Database seeding failed:', error);
    await disconnectDB();
    process.exit(1);
  }
};

seedData();

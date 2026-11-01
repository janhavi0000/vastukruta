# VASTUKRUTA — Architecture & Interior Design Studio

**Principal Architect:** AR. PRANALI GHORPADE  
**Studio Tagline:** *"Spaces Designed with Purpose. Experiences Created with Care."*  
**Aesthetic Style:** Minimalist, Contemporary, Editorial Architecture Magazine Style

---

## 🏛️ Project Overview

**VASTUKRUTA** is a complete, modern, premium, and fully functional full-stack web application designed for the architecture and interior design practice of **Ar. Pranali Ghorpade**. 

Inspired by leading minimalist architectural studios like *Atelier Kotak* and *Acumen Architects*, this platform combines editorial design elegance with a complete backend CMS, real MongoDB persistence, dynamic project portfolio management, client enquiry processing, and an interactive admin dashboard.

---

## 🎨 Brand Identity & Design System

### Architectural Palette
- **Primary Background:** Warm Ivory (`#F5F2EC`)
- **Secondary Background:** Sand Beige (`#E5DED2`)
- **Accent:** Muted Taupe (`#A18F7A`)
- **Text:** Deep Charcoal (`#292824`)
- **Secondary Text:** Warm Grey (`#77736B`)
- **Dark Accent Sections:** Charcoal (`#242421`)

### Typography
- **Headings & Editorial Titles:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (serif)
- **Body, Navigation, Buttons & Meta:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) (sans-serif)

---

## 🚀 Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Custom architectural palette and typography)
- **Routing:** React Router DOM (v6)
- **Icons:** Lucide React
- **Animations:** Framer Motion (subtle reveals and transitions)
- **API Client:** Axios with JWT Interceptor

### Backend
- **Runtime:** Node.js & Express.js REST API
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS password hashing
- **File Uploads:** Multer (local `/uploads` storage with Cloudinary support)
- **Notifications:** Nodemailer for automated client enquiry alerts
- **Integrations:** Direct WhatsApp Click-to-Chat & Google Maps Embed

---

## 📑 Website Structure & Pages

### Public Website
1. **Home (`/`)**:
   - Hero section with high-resolution architectural background, editorial typography, and scroll indicator.
   - Introduction to studio and **Ar. Pranali Ghorpade** with architectural portrait placeholder and key metrics.
   - Featured works showcase with dynamic MongoDB cards.
   - Disciplines / Services preview.
   - Design philosophy with dark charcoal contrast styling.
   - 4-step architectural methodology process.
   - Call to action and comprehensive footer.
2. **About Practice (`/about`)**:
   - Complete studio vision and design philosophy.
   - Detailed biography of **Ar. Pranali Ghorpade**.
   - Studio ethos: Contextual Groundedness, Material Authenticity, Climatic Wisdom, Poetic Restraint.
   - Working methodology and craftsmanship supervision.
3. **Services (`/services`)**:
   - Comprehensive presentation of 7 core disciplines:
     1. *Architectural Design*
     2. *Residential Architecture*
     3. *Commercial Architecture*
     4. *Interior Design*
     5. *Building Planning and Layouts*
     6. *Renovation and Remodeling*
     7. *3D Visualization and Design Consultation*
   - Includes full list of deliverables and direct enquiry buttons pre-filling the project type.
4. **Portfolio (`/projects`)**:
   - Category filtering: *All*, *Residential*, *Commercial*, *Interiors*, *Other*.
   - Editorial masonry / asymmetrical rhythm with hover animations.
   - Metadata tags: Typology, Year, Location, Area.
5. **Project Details (`/projects/:slug`)**:
   - Full-width hero cover photo.
   - Concept story and architectural narrative.
   - Specifications sidebar (Typology, Location, Area, Materials, Climate strategy, Principal Architect).
   - High-resolution photo essay gallery with fullscreen lightbox modal.
   - Previous and next project navigation.
6. **Contact & Enquiry (`/contact`)**:
   - Studio address, phone, email, and operating hours.
   - Google Maps interactive embed.
   - WhatsApp Click-to-Chat button with pre-filled message.
   - **Working Project Enquiry Form**: Full Name, Phone, Email, Typology, Location, Approx Area, Budget, Description.
   - Validates inputs, saves to MongoDB, generates enquiry reference code, and sends email notifications.

### Admin Dashboard (`/admin`)
- **Admin Authentication (`/admin/login`)**:
  - Secure login with email and hashed password.
  - JWT token stored securely with auto-logout on expiry.
  - Quick-fill button for demo credentials.
- **Dashboard Overview (`/admin`)**:
  - Metrics cards: Total Projects, Total Enquiries, New Enquiries, In Progress.
  - Recent enquiries preview with instant status indicators.
  - Live portfolio items overview.
- **Projects CMS (`/admin/projects`)**:
  - Add, edit, delete architectural projects.
  - Dynamic specifications editor (add/remove custom key-value pairs).
  - Photo upload via Multer or direct image URL input.
  - Multi-image photo essay gallery builder.
  - Homepage featured toggle and published/draft toggle.
- **Enquiries Management (`/admin/enquiries`)**:
  - Filter inquiries by status: *All*, *New*, *Contacted*, *In Progress*, *Completed*.
  - Search by client name, email, phone, or location.
  - Complete enquiry modal with client brief and contact triggers.
  - Pipeline status update with instant database reflection.
  - Internal studio notes logger.
- **Studio Content Settings (`/admin/settings`)**:
  - Edit Studio Name, Principal Architect, Tagline, Phone, Email, WhatsApp Number, Address, Google Map Embed URL, and Social Links.
  - Changes are saved to MongoDB and immediately reflect across the entire live website!

---

## 🔑 Default Administrator Credentials

Use these credentials to sign into the protected Architect Portal at `http://localhost:5173/admin/login`:

- **Email:** `admin@vastukruta.com`
- **Password:** `Vastukruta@2026`

*(A one-click button is also available on the login page to populate these credentials instantly).*

---

## 🛠️ Setup & Running Instructions

### 1. Prerequisites
- **Node.js:** v18.0.0 or later (Tested on Node v24)
- **MongoDB:** Local MongoDB running at `mongodb://localhost:27017` or MongoDB Atlas URI.

### 2. Database Seeding
To populate the database with default admin credentials, studio settings, 8 curated architectural projects, and initial demo client enquiries:

```bash
cd server
npm run seed
```

### 3. Running the Server (Backend)
```bash
cd server
npm start        # or npm run dev
```
Backend API will start on: `http://localhost:5000`  
Health check endpoint: `http://localhost:5000/api/health`

### 4. Running the Client (Frontend)
```bash
cd client
npm run dev
```
Frontend application will be accessible at: `http://localhost:5173`

### 5. Convenient One-Click Launch (Windows)
Double-click `start.bat` in the project root to launch MongoDB check, backend server, and frontend server simultaneously.

---

## 📡 REST API Endpoints

### Public APIs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status and brand identity |
| `GET` | `/api/projects` | Fetch all published projects (filterable by category, search) |
| `GET` | `/api/projects/:slug` | Fetch project details with adjacent prev/next navigation |
| `POST` | `/api/enquiries` | Submit client project enquiry (saved to MongoDB) |
| `GET` | `/api/settings` | Retrieve live studio settings & contact details |

### Admin Protected APIs (Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Authenticate administrator and receive JWT |
| `GET` | `/api/auth/me` | Verify active admin session |
| `POST` | `/api/projects` | Create a new project |
| `PUT` | `/api/projects/:id` | Update existing project |
| `DELETE` | `/api/projects/:id` | Delete project |
| `GET` | `/api/enquiries` | List all inquiries (filterable by status) |
| `GET` | `/api/enquiries/stats` | Retrieve enquiry statistics & metrics |
| `PATCH` | `/api/enquiries/:id/status` | Update enquiry status & internal notes |
| `DELETE` | `/api/enquiries/:id` | Delete enquiry |
| `PUT` | `/api/settings` | Update studio profile & settings |
| `POST` | `/api/upload/single` | Upload image file (Multer) |

---

## 🌿 Architectural Integrity Notice
All project placeholders are curated with real-world architectural typologies (Villas, Urban Residences, Commercial Ateliers, Penthouse Remodels) with realistic materials (Basalt stone, Laterite, Board-formed concrete, Teakwood, Lime wash) and professional photography. Real project images can be uploaded directly at any time via the `/admin` portal.

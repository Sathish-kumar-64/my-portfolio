import { api } from './api';

// Fallback Mock Data in case API is loading or offline
const MOCK_PROFILE = {
  full_name: "Sathish Kumar",
  headline: "Senior Full Stack Developer & Architect",
  bio: "Passionate Full Stack Engineer with expertise in building scalable web applications using React 19, Django REST Framework, PostgreSQL, and Cloud microservices. Advocate of clean architecture, SOLID principles, and high-performance UI/UX design.",
  email: "sathish.kumar@example.com",
  location: "Chennai, India",
  available_for_freelance: true,
  years_experience: 5,
  projects_completed: 30,
  technologies_mastered: 18,
  happy_clients: 15,
};

const MOCK_SKILLS = [
  { id: 1, name: "React 19", category: "frontend", proficiency: 95, icon_name: "FaReact", is_featured: true },
  { id: 2, name: "TypeScript", category: "frontend", proficiency: 90, icon_name: "SiTypescript", is_featured: true },
  { id: 3, name: "Tailwind CSS", category: "frontend", proficiency: 95, icon_name: "SiTailwindcss", is_featured: true },
  { id: 4, name: "Framer Motion", category: "frontend", proficiency: 85, icon_name: "SiFramer", is_featured: false },
  { id: 5, name: "Django & DRF", category: "backend", proficiency: 95, icon_name: "SiDjango", is_featured: true },
  { id: 6, name: "Python", category: "backend", proficiency: 92, icon_name: "FaPython", is_featured: true },
  { id: 7, name: "Node.js & Express", category: "backend", proficiency: 85, icon_name: "FaNodeJs", is_featured: false },
  { id: 8, name: "PostgreSQL", category: "database", proficiency: 92, icon_name: "SiPostgresql", is_featured: true },
  { id: 9, name: "Redis", category: "database", proficiency: 85, icon_name: "SiRedis", is_featured: false },
  { id: 10, name: "Docker & Kubernetes", category: "devops", proficiency: 85, icon_name: "FaDocker", is_featured: true },
  { id: 11, name: "AWS & Render", category: "cloud", proficiency: 85, icon_name: "FaAws", is_featured: true },
  { id: 12, name: "GitHub Actions CI/CD", category: "devops", proficiency: 90, icon_name: "FaGithub", is_featured: true },
];

const MOCK_PROJECTS = [
  {
    id: 1,
    title: "Enterprise School ERP Portal",
    slug: "enterprise-school-erp",
    short_description: "Full-scale multi-tenant ERP system for educational institutions with student management, gradebooks, and financial modules.",
    description: "Architected an end-to-end Enterprise School ERP system with role-based access control, fee management, student attendance tracking, and dynamic reporting. Built using clean architecture and modular design.",
    tech_stack: ["React 19", "Django REST", "PostgreSQL", "Tailwind CSS"],
    features: ["Multi-tenant architecture", "Role-based authorization", "Automated fee invoicing", "Interactive gradebook dashboard"],
    category: "fullstack",
    project_status: "completed",
    is_featured: true,
    github_url: "https://github.com/sathishkumar/school-erp",
    live_demo_url: "https://school-erp-demo.vercel.app"
  },
  {
    id: 2,
    title: "Real-Time Cloud Inventory Engine",
    slug: "realtime-inventory-engine",
    short_description: "Microservice-driven inventory tracking software with stock predictions and real-time audit logs.",
    description: "High-throughput inventory management engine handling stock movements, vendor orders, and automated low-stock email triggers. Built with Django REST Framework and PostgreSQL.",
    tech_stack: ["Django DRF", "PostgreSQL", "Redis", "Celery", "Vite"],
    features: ["Real-time websocket alerts", "Audit log tracking", "Stock analytics", "Barcode scanner integration"],
    category: "backend",
    project_status: "completed",
    is_featured: true,
    github_url: "https://github.com/sathishkumar/inventory-engine",
    live_demo_url: "https://inventory-demo.onrender.com"
  },
  {
    id: 3,
    title: "Modern Full Stack Portfolio",
    slug: "modern-fullstack-portfolio",
    short_description: "Recruiter-focused interactive portfolio website with dynamic dark mode, glassmorphism UI, and REST API backend.",
    description: "Production-ready portfolio application showcasing interactive stats cards, live search/filter for projects, blog system with reader comments, and contact form email notifications.",
    tech_stack: ["React 19", "Vite", "Tailwind CSS", "Django", "PostgreSQL"],
    features: ["Glassmorphism modern design", "Dynamic live search & filtering", "JWT Admin control panel", "Automated email notifications"],
    category: "fullstack",
    project_status: "completed",
    is_featured: true,
    github_url: "https://github.com/sathishkumar/portfolio",
    live_demo_url: "https://sathishkumar.vercel.app"
  }
];

const MOCK_EXPERIENCE = [
  {
    id: 1,
    company: "TechCorp Solutions",
    role: "Senior Full Stack Engineer",
    location: "Chennai, India (Hybrid)",
    employment_type: "full_time",
    start_date: "2023-01-01",
    is_current: true,
    responsibilities: [
      "Led the migration of legacy monolith to micro-frontend architecture using React 19 and Vite.",
      "Designed high-performance REST APIs in Django REST Framework servicing over 100k daily active users.",
      "Implemented Generic CRUD engines reducing backend boilerplate code by 40%."
    ],
    technologies: ["React", "Django", "PostgreSQL", "Docker", "AWS"]
  },
  {
    id: 2,
    company: "Innovate Digital",
    role: "Full Stack Developer",
    location: "Remote",
    employment_type: "full_time",
    start_date: "2021-06-01",
    end_date: "2022-12-31",
    is_current: false,
    responsibilities: [
      "Developed responsive web interfaces with Tailwind CSS and React Router.",
      "Integrated JWT authentication and automated email notification systems.",
      "Configured GitHub Actions CI/CD workflows for automated testing and zero-downtime deployment."
    ],
    technologies: ["React", "Python", "Django", "PostgreSQL", "Tailwind CSS"]
  }
];

const MOCK_CERTIFICATES = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    issue_date: "2023-08-15",
    credential_id: "AWS-ASA-994820",
    credential_url: "https://aws.amazon.com/verification"
  },
  {
    id: 2,
    title: "Meta Certified Professional Front-End Developer",
    organization: "Meta / Coursera",
    issue_date: "2022-11-20",
    credential_id: "META-FED-88491",
    credential_url: "https://coursera.org/verify/professional-cert"
  }
];

const MOCK_BLOGS = [
  {
    id: 1,
    title: "Building Scalable Micro-Frontend Architectures with React 19 & Vite",
    slug: "building-scalable-micro-frontends",
    summary: "Learn how to structure scalable React apps using micro-folder strategies, clean architecture, and rapid Vite bundling.",
    content: "Modern web development demands maintainable, modular codebases. In this article, we explore how to organize your React applications using a feature-based folder structure with SOLID principles, KISS, and DRY patterns.",
    category: "Frontend Engineering",
    tags: ["React 19", "Vite", "Architecture", "Tailwind CSS"],
    published_at: "2026-07-01",
    views_count: 340,
    comments: [
      { id: 101, author_name: "Alex Johnson", content: "Great article on clean micro-folder architecture!", created_at: "2026-07-02" }
    ]
  }
];

export const portfolioService = {
  async getProfile() {
    try {
      const res = await api.get('/profile/me/');
      return res.data.results?.[0] || res.data?.[0] || MOCK_PROFILE;
    } catch {
      return MOCK_PROFILE;
    }
  },

  async getSocials() {
    try {
      const res = await api.get('/profile/socials/');
      return res.data.results || res.data;
    } catch {
      return [
        { platform: 'github', url: 'https://github.com/sathishkumar' },
        { platform: 'linkedin', url: 'https://linkedin.com/in/sathishkumar' },
        { platform: 'leetcode', url: 'https://leetcode.com/sathishkumar' }
      ];
    }
  },

  async getSkills(category = '') {
    try {
      const url = category ? `/skills/?category=${category}` : '/skills/';
      const res = await api.get(url);
      return res.data.results || res.data;
    } catch {
      return category ? MOCK_SKILLS.filter(s => s.category === category) : MOCK_SKILLS;
    }
  },

  async getProjects(params = {}) {
    try {
      const res = await api.get('/projects/', { params });
      return res.data.results || res.data;
    } catch {
      return MOCK_PROJECTS;
    }
  },

  async getProjectBySlug(slug) {
    try {
      const res = await api.get(`/projects/${slug}/`);
      return res.data;
    } catch {
      return MOCK_PROJECTS.find(p => p.slug === slug) || MOCK_PROJECTS[0];
    }
  },

  async getExperience() {
    try {
      const res = await api.get('/experience/');
      return res.data.results || res.data;
    } catch {
      return MOCK_EXPERIENCE;
    }
  },

  async getCertificates() {
    try {
      const res = await api.get('/certificates/');
      return res.data.results || res.data;
    } catch {
      return MOCK_CERTIFICATES;
    }
  },

  async getBlogs(params = {}) {
    try {
      const res = await api.get('/blogs/', { params });
      return res.data.results || res.data;
    } catch {
      return MOCK_BLOGS;
    }
  },

  async getBlogBySlug(slug) {
    try {
      const res = await api.get(`/blogs/${slug}/`);
      return res.data;
    } catch {
      return MOCK_BLOGS.find(b => b.slug === slug) || MOCK_BLOGS[0];
    }
  },

  async addBlogComment(slug, commentData) {
    try {
      const res = await api.post(`/blogs/${slug}/add_comment/`, commentData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async sendContactMessage(messageData) {
    try {
      const res = await api.post('/contact/', messageData);
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  async login(username, password) {
    const res = await api.post('/auth/login/', { username, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    return res.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

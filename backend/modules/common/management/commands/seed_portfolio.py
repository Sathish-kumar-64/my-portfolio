from django.core.management.base import BaseCommand
from modules.profile.models import Profile, SocialLink, Resume
from modules.skills.models import Skill
from modules.projects.models import Project
from modules.experience.models import Experience
from modules.certificates.models import Certificate
from modules.blogs.models import Blog

class Command(BaseCommand):
    help = "Seeds initial portfolio data for Sathish Kumar"

    def handle(self, *args, **options):
        self.stdout.write("Seeding portfolio data...")

        # 1. Profile
        Profile.objects.get_or_create(
            full_name="Sathish Kumar",
            defaults={
                "headline": "Senior Full Stack Developer & Architect",
                "bio": "Passionate Full Stack Engineer with expertise in building scalable web applications using React, Django REST Framework, PostgreSQL, and Cloud microservices. Advocate of clean architecture, SOLID principles, and high-performance UX.",
                "email": "sathish.kumar@example.com",
                "location": "Chennai, India",
                "years_experience": 5,
                "projects_completed": 30,
                "technologies_mastered": 18,
                "happy_clients": 15,
            }
        )

        # 2. Social Links
        socials = [
            ("github", "https://github.com/sathishkumar", "FaGithub", 1),
            ("linkedin", "https://linkedin.com/in/sathishkumar", "FaLinkedin", 2),
            ("leetcode", "https://leetcode.com/sathishkumar", "SiLeetcode", 3),
            ("twitter", "https://twitter.com/sathishkumar", "FaTwitter", 4),
        ]
        for platform, url, icon, order in socials:
            SocialLink.objects.get_or_create(
                platform=platform,
                defaults={"url": url, "icon_name": icon, "display_order": order}
            )

        # 3. Skills
        skills_data = [
            # Frontend
            ("React 19", "frontend", 95, "FaReact", True, 1),
            ("TypeScript", "frontend", 90, "SiTypescript", True, 2),
            ("Vite & Next.js", "frontend", 88, "SiNextdotjs", True, 3),
            ("Tailwind CSS", "frontend", 95, "SiTailwindcss", True, 4),
            ("Framer Motion", "frontend", 85, "SiFramer", False, 5),
            # Backend
            ("Django & DRF", "backend", 95, "SiDjango", True, 1),
            ("Python", "backend", 92, "FaPython", True, 2),
            ("Node.js & Express", "backend", 85, "FaNodeJs", False, 3),
            ("RESTful & GraphQL APIs", "backend", 90, "SiFastapi", True, 4),
            # Database
            ("PostgreSQL", "database", 92, "SiPostgresql", True, 1),
            ("Redis", "database", 85, "SiRedis", False, 2),
            # Cloud & DevOps
            ("Docker & Kubernetes", "devops", 85, "FaDocker", True, 1),
            ("AWS & Render", "cloud", 85, "FaAws", True, 2),
            ("GitHub Actions CI/CD", "devops", 90, "FaGithub", True, 3),
        ]
        for name, cat, prof, icon, feat, order in skills_data:
            Skill.objects.get_or_create(
                name=name,
                defaults={
                    "category": cat,
                    "proficiency": prof,
                    "icon_name": icon,
                    "is_featured": feat,
                    "display_order": order
                }
            )

        # 4. Projects
        projects_data = [
            {
                "title": "Enterprise School ERP Portal",
                "short_description": "Full-scale multi-tenant ERP system for educational institutions with student management, gradebooks, and financial modules.",
                "description": "Architected an end-to-end Enterprise School ERP system with role-based access control, fee management, student attendance tracking, and dynamic reporting. Built using clean architecture and modular design.",
                "tech_stack": ["React 19", "Django REST", "PostgreSQL", "Tailwind CSS"],
                "features": ["Multi-tenant architecture", "Role-based authorization", "Automated fee invoicing", "Interactive gradebook dashboard"],
                "category": "fullstack",
                "project_status": "completed",
                "is_featured": True,
                "display_order": 1,
                "github_url": "https://github.com/sathishkumar/school-erp",
                "live_demo_url": "https://school-erp-demo.vercel.app"
            },
            {
                "title": "Real-Time Cloud Inventory Engine",
                "short_description": "Microservice-driven inventory tracking software with stock predictions and real-time audit logs.",
                "description": "High-throughput inventory management engine handling stock movements, vendor orders, and automated low-stock email triggers. Built with Django REST Framework and PostgreSQL.",
                "tech_stack": ["Django DRF", "PostgreSQL", "Redis", "Celery", "Vite"],
                "features": ["Real-time websocket alerts", "Audit log tracking", "Stock analytics", "Barcode scanner integration"],
                "category": "backend",
                "project_status": "completed",
                "is_featured": True,
                "display_order": 2,
                "github_url": "https://github.com/sathishkumar/inventory-engine",
                "live_demo_url": "https://inventory-demo.onrender.com"
            },
            {
                "title": "Modern Full Stack Portfolio",
                "short_description": "Recruiter-focused interactive portfolio website with dynamic dark mode, glassmorphism UI, and REST API backend.",
                "description": "Production-ready portfolio application showcasing interactive stats cards, live search/filter for projects, blog system with reader comments, and contact form email notifications.",
                "tech_stack": ["React 19", "Vite", "Tailwind CSS", "Django", "PostgreSQL"],
                "features": ["Glassmorphism modern design", "Dynamic live search & filtering", "JWT Admin control panel", "Automated email notifications"],
                "category": "fullstack",
                "project_status": "completed",
                "is_featured": True,
                "display_order": 3,
                "github_url": "https://github.com/sathishkumar/portfolio",
                "live_demo_url": "https://sathishkumar.vercel.app"
            }
        ]
        for pdata in projects_data:
            Project.objects.get_or_create(
                title=pdata["title"],
                defaults=pdata
            )

        # 5. Experience
        Experience.objects.get_or_create(
            company="TechCorp Solutions",
            role="Senior Full Stack Engineer",
            defaults={
                "location": "Chennai, India (Hybrid)",
                "employment_type": "full_time",
                "start_date": "2023-01-01",
                "is_current": True,
                "responsibilities": [
                    "Led the migration of legacy monolith to micro-frontend architecture using React 19 and Vite.",
                    "Designed high-performance REST APIs in Django REST Framework servicing over 100k daily active users.",
                    "Implemented Generic CRUD engines reducing backend boilerplate code by 40%."
                ],
                "technologies": ["React", "Django", "PostgreSQL", "Docker", "AWS"],
                "display_order": 1
            }
        )

        Experience.objects.get_or_create(
            company="Innovate Digital",
            role="Full Stack Developer",
            defaults={
                "location": "Remote",
                "employment_type": "full_time",
                "start_date": "2021-06-01",
                "end_date": "2022-12-31",
                "is_current": False,
                "responsibilities": [
                    "Developed responsive web interfaces with Tailwind CSS and React Router.",
                    "Integrated JWT authentication and automated email notification systems.",
                    "Configured GitHub Actions CI/CD workflows for automated testing and zero-downtime deployment."
                ],
                "technologies": ["React", "Python", "Django", "PostgreSQL", "Tailwind CSS"],
                "display_order": 2
            }
        )

        # 6. Certificates
        Certificate.objects.get_or_create(
            title="AWS Certified Solutions Architect",
            organization="Amazon Web Services",
            defaults={
                "issue_date": "2023-08-15",
                "credential_id": "AWS-ASA-994820",
                "credential_url": "https://aws.amazon.com/verification",
                "display_order": 1
            }
        )

        # 7. Blog
        Blog.objects.get_or_create(
            title="Building Scalable Micro-Frontend Architectures with React 19 & Vite",
            defaults={
                "summary": "Learn how to structure scalable React apps using micro-folder strategies, clean architecture, and rapid Vite bundling.",
                "content": """
# Building Scalable Micro-Frontend Architectures

Modern web development demands maintainable, modular codebases. In this article, we explore how to organize your React applications using a feature-based folder structure.

## Key Takeaways
1. **SOLID Principles** in UI engineering.
2. **KISS & DRY**: Avoiding unnecessary abstractions while retaining modularity.
3. **Optimized Asset Bundling** with Vite and Tailwind CSS.
                """,
                "category": "Frontend Engineering",
                "tags": ["React 19", "Vite", "Architecture", "Tailwind CSS"],
                "is_published": True
            }
        )

        self.stdout.write(self.style.SUCCESS("Portfolio database successfully seeded!"))

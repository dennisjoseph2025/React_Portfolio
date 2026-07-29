export const projects = [
    {
        id: 4,
        slug: "pydocai",
        title: "PyDocAi",
        tagline: "AI-powered Python documentation generator",
        problem: "AI-powered Python documentation generator — upload code (files, ZIPs, or GitHub repos) and get AI-generated Markdown docs via Groq's LLaMA API with syntax highlighting, Mermaid diagrams, and export.",
        description: "PyDocAi is a full-stack AI SaaS platform that automates Python documentation generation. Users can upload single .py files, entire ZIP archives, or import GitHub repositories. The backend parses code using Python's AST module, extracts classes, functions, decorators, imports, and cross-references, then sends structured context to Groq's LLaMA API. The AI generates comprehensive Markdown documentation including module overviews, API references, architecture summaries, and Mermaid diagrams. Built with Django REST Framework, Celery for async processing, React 19 with TypeScript, and deployed on AWS with CI/CD.",
        tech: ["Python", "Django", "DRF", "Celery", "React 19", "TypeScript 6", "Tailwind CSS", "PostgreSQL", "Redis", "AWS (EC2, RDS, S3, CloudFront)", "Groq AI (LLaMA)", "Docker", "GitHub Actions"],
        built: [
            "Multi-source code ingestion — .py files, ZIP archives, public & private GitHub repos",
            "Python AST parser extracting classes, functions, decorators, imports, cross-references",
            "AI documentation generation via Groq LLaMA API with Gemini/Claude fallback",
            "Async Celery workers with rate limiting and exponential backoff retries",
            "JWT authentication (60min access + 7-day refresh tokens) + GitHub OAuth",
            "Admin dashboard with platform stats, user/project management, feedback system",
            "Downloadable Markdown export (README, API docs, architecture summary)",
            "CI/CD pipeline — Ruff lint + pytest → Docker build/push to GHCR → SSH deploy to EC2"
        ],
        architecture: [
            "Django REST Framework API with 18+ endpoints across auth, projects, parser, AI, exports, admin",
            "Celery workers for background AI processing with Redis broker and result backend",
            "AWS infrastructure: EC2 (Docker Compose), RDS PostgreSQL, ElastiCache Redis, S3 + CloudFront",
            "Docker Compose orchestration for dev and production environments",
            "PostgreSQL with PgBouncer connection pooling for production scalability"
        ],
        outcome: "Architected and deployed a production-grade AI SaaS handling multi-source code ingestion, async AI processing, and automated Markdown documentation generation — all on AWS with full CI/CD automation.",
        color: "#22C55E",
        github: "https://github.com/dennisjoseph2025/PyDocAI",
        demo: "https://pydocai.vercel.app",
        image: "/projects/pydocai.1.webp",
        screenshots: [
            "/projects/pydocai.1.webp",
            "/projects/pydocai.2.webp",
            "/projects/pydocai.3.webp",
            "/projects/pydocai.4.webp",
            "/projects/pydocai.5.webp",
            "/projects/pydocai.6.webp",
            "/projects/pydocai.7.webp",
            "/projects/pydocai.8.webp",
            "/projects/pydocai.9.webp",
            "/projects/pydocai.10.webp",
            "/projects/pydocai.11.webp",
            "/projects/pydocai.12.webp",
            "/projects/pydocai.13.webp"
        ]
    },
    {
        id: 3,
        slug: "denjo-c",
        title: "Denjo-C",
        tagline: "Full-stack e-commerce platform by Denjo",
        problem: "Full-stack e-commerce platform with product catalog, cart, orders, JWT authentication, admin dashboard, and Docker deployment.",
        description: "Denjo-C (by Denjo) is a production-grade e-commerce platform built with Django REST Framework on the backend and React 19 on the frontend. It features a comprehensive product catalog with search and filters, a full shopping cart and order management system with stock tracking, JWT-based authentication with auto-refresh, and a complete admin dashboard for managing products, orders, users, and analytics. The entire stack is Dockerized for seamless deployment.",
        tech: ["React 19", "Vite", "Tailwind CSS", "Redux Toolkit", "Django REST Framework", "PostgreSQL", "Docker", "JWT", "Nginx"],
        built: [
            "Product catalog with category/subcategory filtering, size/price filters, and search",
            "Shopping cart with add/remove/update quantities and per-item subtotals",
            "Order placement with atomic stock deduction and rollback on failure",
            "JWT authentication with automatic token refresh (5 min before expiry)",
            "Admin dashboard with revenue stats, order/product/user management",
            "Featured products carousel and bestsellers grid on homepage",
            "Role-based access control (user, admin, superadmin)",
            "Docker Compose deployment with Nginx reverse proxy"
        ],
        architecture: [
            "Django REST Framework with 25+ API endpoints",
            "React 19 SPA with Redux Toolkit state management",
            "PostgreSQL database with custom through-models for product sizes and stock",
            "Docker Compose: PostgreSQL, Django API (Gunicorn), Nginx + React frontend",
            "JWT authentication with SimpleJWT and axios interceptors for auto-refresh"
        ],
        outcome: "Built a production-grade full-stack e-commerce platform with Django REST API, React frontend, PostgreSQL, and Docker orchestration — implementing secure authentication, inventory management, and an analytics dashboard.",
        color: "#8B5CF6",
        github: "https://github.com/dennisjoseph2025/Denjo-C_E-Commerce",
        demo: "https://denjo-c.vercel.app/home",
        image: "/projects/denjo-c.1.webp",
        screenshots: [
            "/projects/denjo-c.1.webp",
            "/projects/denjo-c.2.webp",
            "/projects/denjo-c.3.webp",
            "/projects/denjo-c.4.webp",
            "/projects/denjo-c.5.webp",
            "/projects/denjo-c.6.webp",
            "/projects/denjo-c.7.webp",
            "/projects/denjo-c.8.webp",
            "/projects/denjo-c.9.webp",
            "/projects/denjo-c.10.webp",
            "/projects/denjo-c.11.webp",
            "/projects/denjo-c.12.webp",
            "/projects/denjo-c.13.webp"
        ]
    },
    {
        id: 1,
        slug: "educom",
        title: "EduCom.",
        tagline: "Student management system",
        problem: "Robust student management system for educational institutions to track students, courses, and attendance.",
        description: "EduCom is a Django-powered student management system designed for educational institutions. It provides a complete solution for tracking student records, managing courses, recording attendance, and generating reports. Built with Django and Bootstrap, it features user authentication, role-based access, and a responsive dashboard for administrators.",
        tech: ["Django", "Python", "PostgreSQL", "Bootstrap", "JavaScript"],
        built: [
            "User authentication system with role-based access control",
            "Student record management with CRUD operations",
            "Course management with faculty assignment",
            "Attendance tracking with reporting",
            "Responsive dashboard with data summaries",
            "Search and filter capabilities"
        ],
        architecture: [
            "Django MTV architecture with models, views, and templates",
            "PostgreSQL database for relational data storage",
            "Bootstrap-based responsive UI",
            "Django admin interface for backend management"
        ],
        outcome: "Deepened knowledge in full-stack Python development and database management with a practical educational management solution.",
        color: "#06B6D4",
        github: "https://github.com/dennisjoseph2025/student_management_django",
        demo: "https://student-management-django-omega.vercel.app/",
        image: "/projects/student_management.webp",
        screenshots: [
            "/projects/student_management.webp"
        ]
    }
];

export const getProjectBySlug = (slug) => projects.find(p => p.slug === slug);
# TechMart - E-Commerce Platform

A production-ready marketplace for phones and gadgets, built with Django, Inertia.js, and React.

## 🚀 Project Overview

TechMart is a modern e-commerce platform inspired by Jumia, showcasing best software engineering practices:

- **Backend**: Django 5.0 + Inertia.js (Python)
- **Frontend**: React 18 + Vite (JavaScript/JSX)
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Payment**: Stripe (Test Mode)
- **Architecture**: Monolithic with Inertia.js hybrid approach

## 📁 Project Structure

```
techmart/
├── backend/          # Django application
├── frontend/         # React + Vite application
├── docker/           # Docker configurations
└── README.md
```

## 🛠️ Tech Stack

### Backend
- Django 5.0.x
- inertia-django 0.6.x
- PostgreSQL 16.x
- Redis 7.x
- Celery (async tasks)
- Stripe (payments)

### Frontend
- React 18.x
- Vite 5.x
- @inertiajs/react
- Vanilla CSS with modern design system

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Nginx
- Gunicorn

## 🎯 Key Features

✅ User authentication & authorization  
✅ Product catalog with categories & brands  
✅ Advanced search & filtering  
✅ Shopping cart (session-based)  
✅ Checkout & order management  
✅ Stripe payment integration  
✅ Product reviews & ratings  
✅ Admin dashboard  
✅ Responsive design  
✅ Email notifications  

## 🏗️ Setup Instructions

### Prerequisites
- Python 3.12+
- Node.js 22+
- PostgreSQL 16+
- Redis 7+

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements/development.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend Admin: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/docs

## 📝 Development Workflow

1. **Planning** - Architecture & database design ✅
2. **Backend Development** - Django models, views, services
3. **Frontend Development** - React components & pages
4. **Integration** - Connect frontend & backend via Inertia
5. **Testing** - Unit, integration, and E2E tests
6. **Deployment** - Docker, CI/CD, production setup

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest --cov=apps

# Frontend tests
cd frontend
npm run test
npm run test:e2e
```

## 🐳 Docker Deployment

```bash
docker-compose up --build
```

## 📚 Documentation

- [Implementation Plan](./docs/implementation_plan.md)
- [API Documentation](http://localhost:8000/api/docs)
- [Database Schema](./docs/database_schema.md)

## 🔒 Security Features

- Django session authentication
- CSRF protection (automatic with Inertia)
- XSS protection
- SQL injection prevention (Django ORM)
- Rate limiting
- Secure password hashing (PBKDF2)

## 🎨 Design Philosophy

- **Modern UI**: Premium design with vibrant colors and smooth animations
- **Responsive**: Mobile-first approach
- **Performance**: Optimized for speed and efficiency
- **Accessibility**: WCAG 2.1 compliance
- **UX First**: Intuitive navigation and user flows

## 📄 License

MIT License - Feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built with ❤️ by a passionate developer showcasing production-ready software engineering practices.

---

**Note**: This project uses Stripe Test Mode. No real payments will be processed.

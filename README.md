# NutriNav - AI Powered Personalized Nutrition Guide System

A production-ready full-stack application for personalized nutrition guidance using AI.

## Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **SQLite** - Lightweight database
- **JWT** - Authentication using python-jose and passlib

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Project Structure

```
NN/
├── backend/
│   ├── app/
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── database/        # Database configuration
│   │   ├── utils/           # Utilities (auth, etc.)
│   │   └── main.py          # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── routes/          # Route configuration
│   │   ├── contexts/        # React contexts
│   │   └── assets/          # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Database Schema

### Users
- id (Primary Key)
- full_name
- email (Unique)
- password_hash
- created_at

### HealthProfiles
- id (Primary Key)
- user_id (Foreign Key)
- age
- gender
- height (cm)
- weight (kg)
- dietary_preference
- diseases (JSON)
- allergies (JSON)
- lifestyle
- created_at

### MedicalReports
- id (Primary Key)
- user_id (Foreign Key)
- file_name
- file_path
- upload_date

### DeficiencyReports
- id (Primary Key)
- user_id (Foreign Key)
- nutrient_name
- status (normal, deficient, excessive)
- severity (mild, moderate, severe)
- created_at

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the backend server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Features Implemented

### Authentication
- User signup with email validation
- User login with JWT token generation
- Protected routes with JWT authentication
- Password hashing using bcrypt

### Pages
- **Login Page** - User authentication
- **Signup Page** - User registration
- **Dashboard** - Main hub with four module cards:
  - AI Health Assistant
  - Deficiency Analysis
  - Personalized Food Guidance
  - Body-Nutrient Explorer
- **Health Profile** - User health information management
- **Medical Reports** - File upload with drag-and-drop
- **Results** - Analysis results with placeholder data

### UI/UX
- Modern healthcare dashboard design
- Glassmorphism effects
- Smooth animations and transitions
- Responsive design for all screen sizes
- Collapsible sidebar navigation
- Soft gradients and professional color palette

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Health Profile
- `POST /health-profile/` - Create health profile
- `GET /health-profile/` - Get health profile
- `PUT /health-profile/` - Update health profile

### Medical Reports
- `POST /medical-reports/upload` - Upload medical report
- `GET /medical-reports/` - Get all medical reports

### Deficiency Reports
- `POST /deficiency-reports/` - Create deficiency report
- `GET /deficiency-reports/` - Get all deficiency reports

## Future Enhancements

The foundation is ready for the following features:
- OCR for medical report text extraction
- AI models for deficiency detection
- RAG system for medical knowledge
- LLM integration for chat functionality
- Advanced recommendation engine
- Interactive body mapping with nutrient relationships
- Real-time health tracking
- Integration with wearable devices

## Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-change-this-in-production
DATABASE_URL=sqlite:///./nutrinav.db
```

## Development Notes

- The backend uses SQLite by default for simplicity
- Change `SECRET_KEY` in production
- The frontend proxies API requests to the backend
- All database tables are created automatically on first run

## License

This project is for educational and demonstration purposes.

# Consciousness Operating System - Backend API

FastAPI backend for the Consciousness Operating System platform, providing AI-powered consciousness development tracking and insights.

## Features

- **Authentication**: JWT-based auth with secure password hashing
- **Consciousness Profiles**: Personal development metrics and goal tracking
- **Dream Analysis**: AI-powered dream interpretation and symbolic analysis
- **Skill Development**: Philosophy-enhanced skill tracking with AI insights
- **Life Optimization**: Flow state management and productivity optimization
- **Symbol Interpretation**: Deep symbolic reasoning and archetypal analysis

## Tech Stack

- **FastAPI**: High-performance async API framework
- **SQLAlchemy**: Async ORM with PostgreSQL
- **Poetry**: Dependency management
- **Pydantic**: Data validation and serialization
- **JWT**: Secure authentication
- **OpenAI/Anthropic**: AI model integration

## Quick Start

### Prerequisites

- Python 3.12+
- Poetry
- PostgreSQL
- Redis

### Installation

```bash
# Install dependencies
poetry install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
# Set DATABASE_URL, REDIS_URL, API keys, etc.

# Run database migrations
poetry run alembic upgrade head

# Start development server
poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Database Setup

```bash
# Create PostgreSQL database
createdb consciousness_os

# Run migrations
poetry run alembic upgrade head

# Create first superuser (optional)
poetry run python -c "
from app.core.config import settings
from app.services.user_service import UserService
import asyncio

async def create_superuser():
    from app.db.session import AsyncSessionLocal
    async with AsyncSessionLocal() as db:
        service = UserService(db)
        await service.create_superuser(
            email=settings.FIRST_SUPERUSER_EMAIL,
            password=settings.FIRST_SUPERUSER_PASSWORD
        )

asyncio.run(create_superuser())
"
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login  
- `GET /api/v1/auth/me` - Get current user

### Consciousness Development
- `GET /api/v1/consciousness/profile` - Get consciousness profile
- `PATCH /api/v1/consciousness/profile` - Update profile
- `GET /api/v1/consciousness/insights` - Get AI insights

### Dreams & Symbols
- `POST /api/v1/dreams` - Record dream entry
- `GET /api/v1/dreams` - List user's dreams
- `POST /api/v1/symbols/interpret` - Get symbol interpretation

### Skills & Optimization
- `GET /api/v1/skills` - List skill progress
- `POST /api/v1/skills` - Add skill tracking
- `GET /api/v1/optimization` - Get life optimization suggestions

## Development

### Code Quality

```bash
# Format code
poetry run black .

# Lint code  
poetry run ruff check .

# Type checking
poetry run mypy .

# Run tests
poetry run pytest

# Run with coverage
poetry run pytest --cov=app
```

### Database Migrations

```bash
# Create new migration
poetry run alembic revision --autogenerate -m "Description"

# Apply migrations
poetry run alembic upgrade head

# Rollback migration
poetry run alembic downgrade -1
```

## Configuration

Key environment variables in `.env`:

```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/consciousness_os

# Redis
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI APIs
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## Deployment

### Docker

```bash
# Build image
docker build -t consciousness-os-backend .

# Run container
docker run -p 8000:8000 consciousness-os-backend
```

### Production

```bash
# Install production dependencies
poetry install --no-dev

# Run with gunicorn
poetry run gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Architecture

```
app/
├── api/v1/          # API endpoints
├── core/            # Core configuration and security
├── models/          # SQLAlchemy models
├── schemas/         # Pydantic schemas
├── services/        # Business logic
├── utils/           # Utility functions
└── db/              # Database configuration
```

## License

MIT License - see LICENSE file for details.
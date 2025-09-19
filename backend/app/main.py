"""FastAPI application entry point for Consciousness Operating System."""

import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.api.routes import api_router
from app.core.config import settings
from app.db.session import engine, create_db_and_tables


logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan events."""
    # Startup
    logger.info("Starting Consciousness OS Backend...")
    await create_db_and_tables()
    yield
    # Shutdown
    logger.info("Shutting down...")
    await engine.dispose()


def create_application() -> FastAPI:
    """Create and configure FastAPI application."""
    app = FastAPI(
        title="Consciousness Operating System API",
        description="Integrated platform for consciousness development through AI, gamification, and deep symbolism",
        version="1.0.0",
        openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.ENVIRONMENT != "production" else None,
        lifespan=lifespan,
    )

    # Security middleware
    if settings.BACKEND_CORS_ORIGINS:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.ALLOWED_HOSTS)

    # Include API routes
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/")
    async def root() -> dict[str, str]:
        """Root endpoint."""
        return {"message": "Consciousness Operating System API", "version": "1.0.0"}

    @app.get("/health")
    async def health() -> dict[str, str]:
        """Health check endpoint."""
        return {"status": "healthy"}

    return app


app = create_application()


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development",
        log_level=settings.LOG_LEVEL.lower(),
    )
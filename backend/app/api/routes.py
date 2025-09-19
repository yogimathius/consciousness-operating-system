"""API route configuration."""

from fastapi import APIRouter

from app.api.v1 import auth, consciousness, dreams, symbols, skills, optimization


api_router = APIRouter()

# Include all route modules
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(consciousness.router, prefix="/consciousness", tags=["consciousness"])
api_router.include_router(dreams.router, prefix="/dreams", tags=["dreams"])
api_router.include_router(symbols.router, prefix="/symbols", tags=["symbols"])
api_router.include_router(skills.router, prefix="/skills", tags=["skills"])
api_router.include_router(optimization.router, prefix="/optimization", tags=["optimization"])
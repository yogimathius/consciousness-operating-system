"""Consciousness profile and development endpoints."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.v1.auth import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.consciousness import ConsciousnessProfileResponse, ConsciousnessProfileUpdate
from app.services.consciousness_service import ConsciousnessService


router = APIRouter()


@router.get("/profile", response_model=ConsciousnessProfileResponse)
async def get_consciousness_profile(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    """Get user's consciousness development profile."""
    service = ConsciousnessService(db)
    profile = await service.get_or_create_profile(current_user.id)
    return profile


@router.patch("/profile", response_model=ConsciousnessProfileResponse)
async def update_consciousness_profile(
    profile_update: ConsciousnessProfileUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    """Update consciousness development profile."""
    service = ConsciousnessService(db)
    profile = await service.update_profile(current_user.id, profile_update)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile


@router.get("/insights")
async def get_consciousness_insights(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    """Get personalized consciousness development insights."""
    service = ConsciousnessService(db)
    insights = await service.generate_insights(current_user.id)
    return insights
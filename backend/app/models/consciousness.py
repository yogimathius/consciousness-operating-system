"""Consciousness-related models for tracking development and insights."""

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, JSON, String, Text, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.db.session import Base

if TYPE_CHECKING:
    from app.models.user import User


class ConsciousnessProfile(Base):
    """Main consciousness development profile for a user."""
    
    __tablename__ = "consciousness_profiles"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)
    
    # Development metrics
    awareness_level: Mapped[float] = mapped_column(Float, default=0.0)
    integration_score: Mapped[float] = mapped_column(Float, default=0.0)
    growth_velocity: Mapped[float] = mapped_column(Float, default=0.0)
    
    # Personal development data
    core_themes: Mapped[dict] = mapped_column(JSON, default=dict)
    development_goals: Mapped[dict] = mapped_column(JSON, default=dict)
    milestone_achievements: Mapped[dict] = mapped_column(JSON, default=dict)
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    
    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="consciousness_profile")
    dream_entries: Mapped[list["DreamEntry"]] = relationship(
        "DreamEntry", back_populates="profile", cascade="all, delete-orphan"
    )
    symbol_interpretations: Mapped[list["SymbolInterpretation"]] = relationship(
        "SymbolInterpretation", back_populates="profile", cascade="all, delete-orphan"
    )
    skill_progress: Mapped[list["SkillProgress"]] = relationship(
        "SkillProgress", back_populates="profile", cascade="all, delete-orphan"
    )
    life_optimizations: Mapped[list["LifeOptimization"]] = relationship(
        "LifeOptimization", back_populates="profile", cascade="all, delete-orphan"
    )


class DreamEntry(Base):
    """Dream analysis and interpretation entries."""
    
    __tablename__ = "dream_entries"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("consciousness_profiles.id"))
    
    # Dream content
    title: Mapped[str] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(Text)
    emotions: Mapped[list[str]] = mapped_column(JSON, default=list)
    lucidity_level: Mapped[int] = mapped_column(Integer, default=0)  # 0-10 scale
    
    # AI analysis results
    ai_interpretation: Mapped[dict] = mapped_column(JSON, default=dict)
    symbolic_elements: Mapped[dict] = mapped_column(JSON, default=dict)
    psychological_insights: Mapped[dict] = mapped_column(JSON, default=dict)
    consciousness_implications: Mapped[dict] = mapped_column(JSON, default=dict)
    
    # Timestamps
    dream_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    
    # Relationships
    profile: Mapped["ConsciousnessProfile"] = relationship(
        "ConsciousnessProfile", back_populates="dream_entries"
    )


class SymbolInterpretation(Base):
    """Symbolic interpretation and meaning analysis."""
    
    __tablename__ = "symbol_interpretations"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("consciousness_profiles.id"))
    
    # Symbol data
    symbol_content: Mapped[str] = mapped_column(Text)
    symbol_type: Mapped[str] = mapped_column(String(100))  # dream, meditation, life_event, etc.
    context: Mapped[str] = mapped_column(Text)
    
    # Interpretation results
    archetypal_meanings: Mapped[dict] = mapped_column(JSON, default=dict)
    personal_associations: Mapped[dict] = mapped_column(JSON, default=dict)
    developmental_significance: Mapped[dict] = mapped_column(JSON, default=dict)
    integration_suggestions: Mapped[dict] = mapped_column(JSON, default=dict)
    
    # Metadata
    confidence_score: Mapped[float] = mapped_column(Float, default=0.0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    
    # Relationships
    profile: Mapped["ConsciousnessProfile"] = relationship(
        "ConsciousnessProfile", back_populates="symbol_interpretations"
    )


class SkillProgress(Base):
    """Skill development and mastery tracking."""
    
    __tablename__ = "skill_progress"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("consciousness_profiles.id"))
    
    # Skill identification
    skill_name: Mapped[str] = mapped_column(String(255))
    skill_category: Mapped[str] = mapped_column(String(100))
    skill_description: Mapped[str] = mapped_column(Text)
    
    # Progress metrics
    mastery_level: Mapped[float] = mapped_column(Float, default=0.0)  # 0.0-1.0
    practice_hours: Mapped[float] = mapped_column(Float, default=0.0)
    milestone_count: Mapped[int] = mapped_column(Integer, default=0)
    
    # Development data
    learning_path: Mapped[dict] = mapped_column(JSON, default=dict)
    achievements: Mapped[dict] = mapped_column(JSON, default=dict)
    philosophical_insights: Mapped[dict] = mapped_column(JSON, default=dict)
    
    # Timestamps
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    last_practiced: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    
    # Relationships
    profile: Mapped["ConsciousnessProfile"] = relationship(
        "ConsciousnessProfile", back_populates="skill_progress"
    )


class LifeOptimization(Base):
    """Life optimization insights and flow state management."""
    
    __tablename__ = "life_optimizations"
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    profile_id: Mapped[int] = mapped_column(ForeignKey("consciousness_profiles.id"))
    
    # Optimization area
    area: Mapped[str] = mapped_column(String(100))  # productivity, relationships, health, etc.
    focus: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    
    # Data and insights
    baseline_metrics: Mapped[dict] = mapped_column(JSON, default=dict)
    optimization_strategies: Mapped[dict] = mapped_column(JSON, default=dict)
    flow_state_triggers: Mapped[dict] = mapped_column(JSON, default=dict)
    progress_indicators: Mapped[dict] = mapped_column(JSON, default=dict)
    
    # Results
    effectiveness_score: Mapped[float] = mapped_column(Float, default=0.0)
    implementation_status: Mapped[str] = mapped_column(String(50), default="planned")
    
    # Timestamps
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    
    # Relationships
    profile: Mapped["ConsciousnessProfile"] = relationship(
        "ConsciousnessProfile", back_populates="life_optimizations"
    )
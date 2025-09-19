"""Application configuration settings."""

import secrets
from typing import Annotated, Any, Literal

from pydantic import AnyUrl, BeforeValidator, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


def parse_cors(v: Any) -> list[str] | str:
    """Parse CORS origins."""
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, list | str):
        return v
    raise ValueError(v)


class Settings(BaseSettings):
    """Application settings."""
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        extra="ignore",
    )
    
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Environment
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"
    LOG_LEVEL: Literal["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"] = "INFO"
    
    # CORS
    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = []
    
    @computed_field  # type: ignore[misc]
    @property
    def ALLOWED_HOSTS(self) -> list[str]:
        """Compute allowed hosts from CORS origins."""
        return ["localhost", "127.0.0.1"]
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/consciousness_os"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # External APIs
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    
    # First superuser
    FIRST_SUPERUSER_EMAIL: str = "admin@consciousness-os.com"
    FIRST_SUPERUSER_PASSWORD: str = "changethis"


settings = Settings()
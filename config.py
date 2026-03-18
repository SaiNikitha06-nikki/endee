import os
from dotenv import load_dotenv

load_dotenv()

# Endee Vector Database Configuration
ENDEE_HOST = os.getenv("ENDEE_HOST", "localhost")
ENDEE_PORT = int(os.getenv("ENDEE_PORT", 8080))
ENDEE_INDEX_NAME = os.getenv("ENDEE_INDEX_NAME", "documents")

# Embedding Model Configuration
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
EMBEDDING_DIMENSION = int(os.getenv("EMBEDDING_DIMENSION", 384))

# LLM Configuration (using OpenAI API or compatible service)
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
LLM_API_URL = os.getenv("LLM_API_URL", "https://api.openai.com/v1")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-3.5-turbo")

# Application Configuration
DEBUG = os.getenv("DEBUG", "False").lower() == "true"
MAX_RESULTS = int(os.getenv("MAX_RESULTS", 5))
SIMILARITY_THRESHOLD = float(os.getenv("SIMILARITY_THRESHOLD", 0.3))

# CORS Configuration
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

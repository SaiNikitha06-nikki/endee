# Project File Structure and Documentation

## Overview

This is a complete, production-ready **Endee AI Search & RAG System** - a semantic search and question-answering application powered by Endee vector database.

## Directory Tree

```
ai-search-project/
│
├── README.md                      # Main project documentation
├── SETUP_GUIDE.md                 # Detailed setup instructions
├── API_DOCS.md                    # REST API documentation
├── CONTRIBUTING.md                # Contribution guidelines
├── PROJECT_STRUCTURE.md           # This file
│
├── app.py                         # Flask web application (main entry point)
├── config.py                      # Configuration management
├── requirements.txt               # Python dependencies
├── .env.example                   # Example environment variables
├── .env                           # Environment variables (local)
│
├── Core Modules
│   ├── embedding.py               # Text to vector embedding
│   ├── vector_store.py            # Endee database integration
│   ├── search.py                  # Semantic search functionality
│   └── rag.py                     # RAG pipeline with LLM
│
├── Data & Initialization
│   ├── dataset.txt                # Sample documents (20 ML/AI concepts)
│   └── init_data.py               # Data loading and indexing script
│
├── Web Interface
│   ├── templates/
│   │   └── index.html             # HTML5 dashboard
│   └── static/
│       ├── style.css              # Responsive styling
│       ├── script.js              # Frontend JavaScript
│       └── fonts/                 # (if added)
│
├── Docker & Deployment
│   ├── Dockerfile                 # Docker container definition
│   └── docker-compose.yml         # Multi-container orchestration
│
├── Configuration Files
│   ├── .gitignore                 # Git ignore patterns
│   ├── .editorconfig              # Editor code style settings
│
└── Documentation
    ├── docs/                      # Additional documentation (if needed)
    └── CHANGELOG.md               # Version history (optional)
```

## File Descriptions

### Documentation Files

#### README.md (Main Documentation)
- **Purpose**: Complete project overview and guide
- **Contents**:
  - Project overview and features
  - System architecture diagram
  - Quick start instructions
  - API usage examples
  - Configuration reference
  - Use cases and examples
  - Deployment options
  - Troubleshooting guide
  - Resources and links

#### SETUP_GUIDE.md (Installation Guide)
- **Purpose**: Step-by-step setup instructions
- **Contents**:
  - Prerequisites by OS
  - Endee installation steps
  - Project setup process
  - Dependency installation
  - Configuration guide
  - Testing checklist
  - Troubleshooting solutions

#### API_DOCS.md (API Reference)
- **Purpose**: Detailed REST API documentation
- **Contents**:
  - All endpoint descriptions
  - Request/response formats
  - Error codes explanation
  - Code examples for each endpoint
  - Rate limiting info
  - Authentication (future)

#### CONTRIBUTING.md (Developer Guide)
- **Purpose**: Guidelines for contributing
- **Contents**:
  - Ways to contribute
  - Fork and pull request workflow
  - Code style guidelines
  - Testing requirements
  - Documentation standards
  - Community guidelines

#### PROJECT_STRUCTURE.md (This File)
- **Purpose**: Documentation of all files
- **Contents**: File tree, descriptions, and purposes

### Application Files

#### app.py (Main Flask Application)
- **Purpose**: Web server and API endpoints
- **Key Routes**:
  - `GET /` - Web interface
  - `POST /api/search` - Semantic search
  - `POST /api/ask` - Question answering (RAG)
  - `GET /api/health` - Health check
  - `GET /api/status` - System status
  - `POST /api/documents/batch` - Batch indexing
- **Framework**: Flask with CORS support

#### config.py (Configuration Management)
- **Purpose**: Centralized configuration
- **Variables**:
  - Endee connection settings
  - Embedding model configuration
  - LLM/OpenAI settings
  - Application defaults
  - CORS settings
- **Source**: Loads from `.env` file via python-dotenv

#### embedding.py (Text to Vectors)
- **Purpose**: Generate embeddings for documents and queries
- **Functions**:
  - `generate_embedding()` - Single text to vector
  - `generate_embeddings()` - Multiple texts to vectors
  - `get_embedding_dimension()` - Get model's dimension
- **Model**: Sentence Transformers (all-MiniLM-L6-v2 default)
- **Output**: Dense vectors (384-dimensional default)

#### vector_store.py (Endee Integration)
- **Purpose**: Interface with Endee vector database
- **Class**: `EndeeVectorStore`
- **Methods**:
  - `check_connection()` - Test database connection
  - `create_index()` - Create new index
  - `insert_document()` - Add single document
  - `insert_batch()` - Add multiple documents
  - `search()` - Vector similarity search
  - `delete_document()` - Remove document
  - `get_statistics()` - Index statistics
- **API**: HTTP-based Endee API (port 8080)

#### search.py (Semantic Search)
- **Purpose**: Query processing and search logic
- **Functions**:
  - `semantic_search()` - Main search function
  - `get_context_for_rag()` - Retrieve context for RAG
- **Features**:
  - Query embedding generation
  - Vector similarity search
  - Result filtering by threshold
  - Context compilation for RAG

#### rag.py (RAG Pipeline)
- **Purpose**: Retrieval Augmented Generation with LLM
- **Class**: `RAGPipeline`
- **Methods**:
  - `query()` - Answer questions with context
  - `_generate_answer()` - LLM integration
  - `_fallback_answer()` - Non-LLM answers
  - `_extract_sources()` - Source extraction
- **Features**:
  - Context retrieval via semantic search
  - LLM integration (OpenAI compatible)
  - Fallback to context-only mode
  - Source citation

#### init_data.py (Data Initialization)
- **Purpose**: Load and index documents
- **Functions**:
  - `load_documents_from_file()` - Read txt files
  - `load_documents_from_json()` - Read JSON
  - `initialize_index()` - Setup Endee index
  - `index_documents()` - Generate embeddings and index
  - `load_and_index_default_dataset()` - Quick setup
- **Usage**: Run once to initialize with sample data

### Data Files

#### dataset.txt (Sample Documents)
- **Purpose**: Sample documents for indexing
- **Content**: 20 ML/AI/DL concepts
- **Format**: Documents separated by blank lines
- **Size**: ~2KB
- **Usage**: Indexed during initialization

### Web Interface Files

#### templates/index.html (Web Dashboard)
- **Purpose**: Interactive user interface
- **Features**:
  - Semantic search tab
  - Question answering tab
  - System info tab
  - Responsive design
  - Error handling
- **Framework**: Vanilla JavaScript, HTML5

#### static/style.css (Styling)
- **Purpose**: Visual design and layout
- **Features**:
  - CSS Grid and Flexbox
  - Dark/light theme support
  - Responsive breakpoints
  - Animations and transitions
  - Accessibility considerations
- **Size**: ~8KB

#### static/script.js (Frontend Logic)
- **Purpose**: Client-side interactivity
- **Features**:
  - Tab switching
  - API communication
  - Form handling
  - Result rendering
  - Status monitoring
- **Size**: ~6KB

### Configuration Files

#### requirements.txt (Python Dependencies)
- **Purpose**: Specify Python packages
- **Packages**:
  - Flask 3.0.0 - Web framework
  - Flask-CORS 4.0.0 - CORS support
  - requests 2.31.0 - HTTP library
  - sentence-transformers 2.2.2 - Embeddings
  - numpy 1.24.3 - Numerical computing
  - python-dotenv 1.0.0 - Environment variables
- **Installation**: `pip install -r requirements.txt`

#### .env.example (Example Configuration)
- **Purpose**: Template for environment variables
- **Variables**:
  - Endee host/port
  - Embedding model selection
  - LLM API configuration (optional)
  - Application settings
- **Usage**: Copy to `.env` and customize

#### .env (Local Configuration)
- **Purpose**: Local environment settings
- **Status**: Not in version control
- **Usage**: Overrides defaults in config.py

#### .gitignore (Git Ignore Rules)
- **Purpose**: Exclude files from version control
- **Ignores**:
  - Python cache (__pycache__)
  - Virtual environments (venv/)
  - Environment files (.env)
  - IDE directories (.vscode, .idea)
  - Log files
  - Database files

#### .editorconfig (Editor Settings)
- **Purpose**: Consistent code style across editors
- **Defines**:
  - Indentation (spaces/tabs)
  - Line endings (LF)
  - Charset (UTF-8)
  - File-specific rules

### Docker Files

#### Dockerfile (Container Definition)
- **Purpose**: Build Docker image
- **Contents**:
  - Python 3.11-slim base
  - Dependency installation
  - Model pre-download
  - Port exposure (5000)
  - Health checks
- **Build**: `docker build -t endee-search .`

#### docker-compose.yml (Orchestration)
- **Purpose**: Multi-container setup
- **Services**:
  - **endee**: Vector database (port 8080)
  - **app**: Flask application (port 5000)
- **Features**:
  - Service dependencies
  - Health checks
  - Environment variables
  - Volume management
- **Usage**: `docker-compose up`

## Key Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Database | Endee | Vector storage and search |
| Embeddings | Sentence Transformers | Text to vectors |
| Web Framework | Flask | API and web server |
| Frontend | HTML/CSS/JavaScript | User interface |
| LLM Integration | OpenAI API | Question answering |
| Container | Docker | Deployment |

## Architecture Layers

```
┌─────────────────────────────────────────┐
│        Web Browser                      │
│  (HTML/CSS/JavaScript Interface)        │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│        Flask Application                │
│  (REST API Routes & Request Handling)   │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
    ┌───▼─┐   ┌───▼──┐   ┌──▼──┐
    │Search │   │ RAG │   │Stats│
    └───┬──┘   └──┬───┘   └─────┘
        │         │
    ┌───▼─────────▼──────────┐
    │  Embedding Generation  │
    │ (Sentence Transformers)│
    └───┬────────────────────┘
        │
    ┌───▼─────────────────────┐
    │ Endee Vector Database   │
    │    (Locking/Search)     │
    └───────────────────────┘
```

## Data Flow

### Indexing Flow
```
Documents → Embeddings → Endee DB
   ↓            ↓           ↓
dataset.txt    384-d     Indexed
          vectors     & Searchable
```

### Search Flow
```
Query → Embeddings → Similarity Search → Results
 ↓          ↓             ↓              ↓
User    384-d        Top-K            Ranked
Input   Vector      Results           by Score
```

### RAG Flow
```
Question → Search → Context → LLM → Answer
   ↓        ↓         ↓       ↓      ↓
User    Find Top  Retrieved Generate  With
 Q&A    Documents  Docs      Answer   Sources
```

## Development Workflow

1. **Local Development**
   - Edit files in `/ai-search-project`
   - Run `python app.py` to start server
   - Access at `http://localhost:5000`

2. **Testing Changes**
   - Use web interface at `/`
   - Use API endpoints via curl/Postman
   - Check logs for errors

3. **Adding Documents**
   - Edit `dataset.txt`
   - Run `init_data.py`
   - Verify via API `/documents` endpoint

4. **Deployment**
   - Use Docker: `docker build -t app .`
   - Or Docker Compose: `docker-compose up`
   - Or traditional: Setup venv and run

## Performance Considerations

### File Sizes
- Python files: ~18 KB total
- CSS: ~8 KB
- JavaScript: ~6 KB
- Embedding model: ~80 MB (cached locally)
- Index: ~5-50 MB (depending on documents)

### Loading Times
- App startup: 2-5 seconds
- First search: 3-5 seconds (model loading)
- Subsequent searches: 100-500 ms
- RAG with LLM: 2-10 seconds (API latency)

### Memory Usage
- Base app: ~150 MB
- Embedding model loaded: +80 MB
- Endee database: ~100 MB* (depends on index size)

## Extension Points

### Add New Features
1. **New Search Method**: Add to `search.py`
2. **New API Endpoint**: Add route to `app.py`
3. **Custom RAG Logic**: Extend `RAGPipeline` in `rag.py`
4. **Different Embeddings**: Change `embedding.py` model
5. **Frontend Components**: Modify `index.html` and `script.js`

### Integrate External Services
- Different LLMs: Modify `rag.py` `_generate_answer()`
- Alternative MDEmbedding: Change `embedding.py` model
- Different database: Replace `vector_store.py`

## Testing Checklist

- [ ] Endee running on correct port
- [ ] Python environment activated
- [ ] All dependencies installed
- [ ] .env file configured
- [ ] Dataset indexed (init_data.py)
- [ ] Flask app starts without errors
- [ ] Web interface loads (port 5000)
- [ ] Search returns results
- [ ] API endpoints respond
- [ ] Health check passes

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Connection refused | Endee not running | Start: `./run.sh` |
| Module not found | Missing dependencies | Run: `pip install -r requirements.txt` |
| No results | No data indexed | Run: `python init_data.py` |
| Slow search | Large dataset | Use filters or add index |
| Memory errors | Model too large | Use smaller model |

## Summary

This is a fully-featured, production-ready application demonstrating:
- ✅ Endee vector database integration
- ✅ Semantic search with vector similarity
- ✅ RAG (Retrieval Augmented Generation)
- ✅ Modern web interface
- ✅ REST API
- ✅ Docker deployment
- ✅ Comprehensive documentation
- ✅ Ready for GitHub hosting

All files are included and documented. Ready to host on GitHub!

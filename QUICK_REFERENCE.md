# Quick Reference Guide

Quick reference for common tasks and commands.

## 📦 Installation

```bash
# Clone and setup
git clone <repo>
cd ai-search-project
python -m venv venv
source venv/bin/activate  # Linux/Mac: or venv\Scripts\activate on Windows
pip install -r requirements.txt

# Download embedding model
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# Initialize data
python init_data.py

# Start app
python app.py
```

## 🚀 Running the System

### Local Development
```bash
# Terminal 1: Start Endee
cd ../endee
./run.sh

# Terminal 2: Start Flask app
cd ai-search-project
source venv/bin/activate
python app.py
```

### Docker
```bash
# Start everything with Docker Compose
docker-compose up

# Or build and run individually
docker build -t endee-search .
docker run -p 5000:5000 -e ENDEE_HOST=localhost endee-search
```

## 🔍 Quick API Tests

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Semantic Search
```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"machine learning","top_k":5}'
```

### Question Answering
```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"What is AI?","num_contexts":5}'
```

### Index Statistics
```bash
curl http://localhost:5000/api/documents
```

## 📝 Configuration

### Create .env file
```bash
cp .env.example .env
nano .env
```

### Key Settings
```ini
ENDEE_HOST=localhost
ENDEE_PORT=8080
LLM_API_KEY=your_key_here
DEBUG=False
```

## 🗂️ File Management

### Load New Dataset
```python
# Edit dataset.txt with your documents
# Documents separated by blank lines

# Then reinitialize
python init_data.py
```

### Index Programmatically
```python
from embedding import generate_embeddings
from vector_store import db

docs = ["Document 1", "Document 2"]
embeddings = generate_embeddings(docs)

batch = [{"id": i, "vector": emb, "text": doc}
         for i, (emb, doc) in enumerate(zip(embeddings, docs))]
db.insert_batch(batch)
```

## 🧪 Development

### Code Formatting
```bash
# Format code
black .

# Check style
flake8 app.py

# Sort imports
isort .
```

### Run Tests
```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest

# With coverage
pytest --cov=.
```

### Debug Mode
```python
# In .env
DEBUG=True

# Then start app
python app.py
```

## 🐛 Troubleshooting

### Endee Not Responding
```bash
# Check if running
lsof -i :8080

# Start Endee
cd endee && ./run.sh
```

### Module Not Found
```bash
# Make sure venv is activated
source venv/bin/activate

# Reinstall
pip install -r requirements.txt
```

### Clear Data
```python
# Connect and clear index
from vector_store import db
db.create_index()  # Creates fresh index
```

### View Logs
```bash
# Flask logs appear in terminal where app.py started
# For persistent logs, add to app.py:

import logging
logging.basicConfig(filename='app.log', level=logging.DEBUG)
```

## 📚 Documentation Map

| Document | Purpose |
|----------|---------|
| README.md | Complete overview |
| SETUP_GUIDE.md | Installation steps |
| API_DOCS.md | API reference |
| CONTRIBUTING.md | Developer guide |
| PROJECT_STRUCTURE.md | File structure |
| QUICK_REFERENCE.md | This file |

## 🔗 Useful Links

- **Endee Docs**: https://docs.endee.io
- **Endee GitHub**: https://github.com/endee-io/endee
- **Sentence Transformers**: https://www.sbert.net
- **Flask Docs**: https://flask.palletsprojects.com

## 💻 Environment Variables

```ini
# Database
ENDEE_HOST=localhost          # Endee host
ENDEE_PORT=8080               # Endee port
ENDEE_INDEX_NAME=documents    # Index name

# Embeddings
EMBEDDING_MODEL=all-MiniLM-L6-v2  # Model name
EMBEDDING_DIMENSION=384            # Vector size

# LLM (Optional)
LLM_API_KEY=sk-...                 # OpenAI key
LLM_API_URL=https://api.openai.com/v1  # API URL
LLM_MODEL=gpt-3.5-turbo            # Model

# App Config
DEBUG=False                    # Debug mode
MAX_RESULTS=5                  # Default results
SIMILARITY_THRESHOLD=0.3       # Min similarity
CORS_ORIGINS=*                 # CORS origins
```

## 📦 Dependencies

```
Flask==3.0.0                      # Web framework
Flask-CORS==4.0.0                 # CORS support
requests==2.31.0                  # HTTP requests
sentence-transformers==2.2.2      # Embeddings
numpy==1.24.3                     # Math operations
python-dotenv==1.0.0              # Environment config
```

## 🎯 Common Tasks

### Add Documents
1. Edit `dataset.txt`
2. Run `python init_data.py`
3. Test with search

### Change Embedding Model
1. Edit `.env`: `EMBEDDING_MODEL=<model>`
2. Run: `python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('<model>')"`
3. Restart app

### Enable LLM Features
1. Get OpenAI API key
2. Add to `.env`: `LLM_API_KEY=sk-...`
3. Use `/api/ask` endpoint

### Deploy to Production
```bash
# With Docker
docker-compose up -d

# With Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# With systemd (Linux)
# Create /etc/systemd/system/endee-app.service
[Unit]
Description=Endee Search App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/app
ExecStart=/app/venv/bin/python /app/app.py

[Install]
WantedBy=multi-user.target

# Then: sudo systemctl start endee-app
```

## 🔄 Workflow Examples

### Example 1: Index and Search
```bash
# 1. Edit documents
nano dataset.txt

# 2. Initialize
python init_data.py

# 3. Test search
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query":"your query"}'
```

### Example 2: Setup with LLM
```bash
# 1. Update .env with API key
echo "LLM_API_KEY=sk-..." >> .env

# 2. Start app
python app.py

# 3. Ask questions
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Your question here"}'
```

### Example 3: Docker Deployment
```bash
# 1. Build image
docker build -t my-app .

# 2. Run container
docker run -p 5000:5000 my-app

# 3. Or use compose
docker-compose up
```

## 🎓 Learning Resources

### Understanding the System
1. Read README.md (overview)
2. Check PROJECT_STRUCTURE.md (file organization)
3. Review API_DOCS.md (endpoints)
4. Study code in `app.py` (Flask routes)

### Contributing Code
1. Read CONTRIBUTING.md
2. Fork repository
3. Create feature branch
4. Make changes
5. Submit pull request

### Deploying
1. Review production checklist
2. Use docker-compose.yml
3. Set up reverse proxy (Nginx)
4. Configure SSL/HTTPS
5. Setup monitoring

## 📞 Getting Help

### Debug Issues
1. Check logs
2. Review SETUP_GUIDE.md troubleshooting
3. Test with curl/Postman
4. Check GitHub issues

### Contact
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Discord: Community chat (coming soon)

---

**Last Updated**: March 2024
**Version**: 1.0.0

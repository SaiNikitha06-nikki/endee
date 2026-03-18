# SETUP_GUIDE.md - Complete Setup Instructions

This comprehensive guide will walk you through setting up the Endee AI Search & RAG System from scratch.

## Prerequisites

### System Requirements
- **OS**: Linux, macOS, or Windows 10+
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for Endee + models
- **Python**: 3.8 or higher
- **Internet**: Required for downloading models

### Required Software
1. **Git** - Version control
2. **Python** - Programming language
3. **pip** - Python package manager
4. **curl** or **Postman** - Testing API (optional)

### Installation by OS

<details>
<summary><b>Linux (Ubuntu/Debian)</b></summary>

```bash
# Update package manager
sudo apt update && sudo apt upgrade

# Install Python and pip
sudo apt install python3 python3-pip python3-venv

# Install build tools (needed for some packages)
sudo apt install build-essential

# Verify installation
python3 --version
pip3 --version
```

</details>

<details>
<summary><b>macOS</b></summary>

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python

# Verify installation
python3 --version
pip3 --version
```

</details>

<details>
<summary><b>Windows 10/11</b></summary>

1. Download Python installer from https://www.python.org/downloads/
2. Run installer with "Add Python to PATH" checked
3. Verify in Command Prompt:
```cmd
python --version
pip --version
```

</details>

---

## Step 1: Setup Endee Vector Database

### 1.1 Clone the Endee Repository

```bash
# Create a directory for projects
mkdir -p ~/projects
cd ~/projects

# Clone Endee
git clone https://github.com/endee-io/endee.git
cd endee
```

### 1.2 Install Endee

```bash
# Make scripts executable (Linux/macOS)
chmod +x ./install.sh ./run.sh

# Install Endee with optimization
# Choose one based on your CPU:

# For AVX2 (Most modern CPUs)
./install.sh --release --avx2

# For AVX512 (Newer Intel/AMD)
./install.sh --release --avx512

# For ARM (Apple Silicon, Raspberry Pi)
./install.sh --release --neon

# For basic compatibility
./install.sh --release
```

This will compile Endee and create necessary files. Takes 2-5 minutes.

### 1.3 Start Endee Server

```bash
# In the endee directory
./run.sh

# You should see:
# Server listening on 0.0.0.0:8080
# Ready to accept connections
```

**Leave this terminal running** - Endee server stays in foreground.

### 1.4 Verify Endee is Running

In a new terminal:
```bash
# Test Endee health endpoint
curl http://localhost:8080/health

# Should return success (200 status)
```

---

## Step 2: Setup AI Search Project

### 2.1 Clone/Navigate to Project

```bash
# Open a second terminal (keep Endee running in first)
cd ~/projects/endee
cd ai-search-project

# Or if following from repo structure:
cd ~/path/to/ai-search-project
```

### 2.2 Create Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

### 2.3 Install Python Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install required packages
pip install -r requirements.txt

# Verify installations
pip list | grep -E "Flask|sentence|requests"
```

This downloads and installs:
- Flask (web framework)
- Flask-CORS (cross-origin support)
- Sentence Transformers (embeddings)
- NumPy (numerical computing)
- Python-dotenv (configuration)

**Duration**: 3-5 minutes (first time is slower)

### 2.4 Download Embedding Model

The first use of embedding generation trigger model download:

```bash
# Pre-download the embedding model (~80MB)
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

# This creates ~/.cache/huggingface/hub/ with the model
# Only needs to run once
```

---

## Step 3: Configure Application

### 3.1 Create Environment File

```bash
# Copy example to actual env file
cp .env.example .env

# Edit with your settings
nano .env  # Linux/macOS
# or
notepad .env  # Windows
```

### 3.2 Basic Configuration

For first-time setup, default `.env` settings work:

```ini
ENDEE_HOST=localhost
ENDEE_PORT=8080
ENDEE_INDEX_NAME=documents

EMBEDDING_MODEL=all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384

DEBUG=False
MAX_RESULTS=5
SIMILARITY_THRESHOLD=0.3
```

### 3.3 Optional: Configure LLM Integration

To enable question answering (RAG) features with OpenAI:

1. Get API key from https://platform.openai.com
2. Edit `.env` and add:

```ini
LLM_API_KEY=sk-your-key-here
LLM_API_URL=https://api.openai.com/v1
LLM_MODEL=gpt-3.5-turbo
```

---

## Step 4: Initialize Database

### 4.1 Index Sample Data

```bash
# Make sure virtual environment is activated (venv)
# and Endee is running in another terminal

python init_data.py

# You should see:
# Initializing Endee index...
# ✓ Connected to Endee at localhost:8080
# ✓ Index 'documents' ready
# Generating embeddings for 20 documents...
# Indexing documents in Endee...
# ✓ Successfully indexed 20 documents
# Index now contains 20 documents
```

### 4.2 Verify Data Indexed

```bash
# Check API status
curl http://localhost:5000/api/status

# Or test search:
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning", "top_k": 3}'
```

---

## Step 5: Start the Application

### 5.1 Run Flask Server

```bash
# In project directory with (venv) activated
python app.py

# Output:
# Starting AI Search & RAG Application...
# Endee Vector Database: localhost:8080
# ✓ Connected to Endee
# * Running on http://0.0.0.0:5000
```

### 5.2 Access Web Interface

Open your browser and go to:
```
http://localhost:5000
```

You should see the Endee AI Search dashboard!

---

## Step 6: Test the System

### 6.1 Using Web Interface

1. Go to "Semantic Search" tab
2. Enter query: "machine learning"
3. Click Search
4. See relevant documents!

### 6.2 Using API

```bash
# In a new terminal (keep app running)

# Test search endpoint
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "neural networks",
    "top_k": 3
  }' | python -m json.tool

# Test question answering (if LLM configured)
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is deep learning?",
    "num_contexts": 3
  }' | python -m json.tool
```

### 6.3 Using Python Client

```python
# In project directory
python

# In Python shell:
from search import semantic_search
from rag import RAGPipeline

# Test search
results = semantic_search("artificial intelligence")
print(f"Found {len(results)} results")
for r in results:
    print(f"  - {r['text'][:50]}... (Score: {r['score']:.2f})")

# Test RAG (if LLM configured)
rag = RAGPipeline()
response = rag.query("What is artificial intelligence?")
print(response['answer'])
```

---

## Directory Structure After Setup

```
~/projects/
├── endee/                          # Endee source (step 1)
│   ├── run.sh                      # Start Endee
│   ├── ai-search-project/          # This project (step 2)
│   │   ├── venv/                   # Virtual environment (step 3)
│   │   ├── app.py                  # Main Flask app
│   │   ├── config.py               # Configuration
│   │   ├── .env                    # Environment variables (step 4)
│   │   ├── dataset.txt             # Sample documents
│   │   ├── templates/              # HTML templates
│   │   │   └── index.html
│   │   ├── static/                 # CSS/JavaScript
│   │   │   ├── style.css
│   │   │   └── script.js
│   │   ├── init_data.py            # Setup script
│   │   └── (other Python files)

~/.cache/huggingface/               # Embedding model cache (step 3)
```

---

## Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Reinstall packages
pip install -r requirements.txt
```

### Issue: "Connection refused" to Endee

**Solution:**
```bash
# Make sure Endee is running in separate terminal
cd ~/projects/endee
./run.sh

# Verify port 8080 is available
# On Windows: netstat -ano | findstr 8080
# On Linux: lsof -i :8080
```

### Issue: Model download fails

**Solution:**
```bash
# Check internet connection
# Try downloading manually with a proxy or VPN

# Or use different model:
# Edit .env: EMBEDDING_MODEL=sentence-transformers/paraphrase-MiniLM-L6-v2

# Then in Python:
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('sentence-transformers/paraphrase-MiniLM-L6-v2')"
```

### Issue: Port 5000 already in use

**Solution:**
```python
# Edit app.py, change to different port:
app.run(debug=DEBUG, host="0.0.0.0", port=5001)

# Or kill the process using port 5000:
# On Linux: lsof -i :5000 | kill -9 <PID>
# On macOS: lsof -i :5000 | kill -9 <PID>
# On Windows: netstat -ano | findstr :5000
```

---

## Next Steps After Setup

### 1. Add Your Own Documents

```bash
# Edit dataset.txt with your documents:
nano dataset.txt

# Clear database and reinitialize:
python init_data.py
```

### 2. Configure LLM

Get OpenAI API key and update `.env`:
```ini
LLM_API_KEY=sk-...
LLM_API_URL=https://api.openai.com/v1
LLM_MODEL=gpt-4
```

### 3. Deploy to Production

See main [README.md](./README.md#deployment) for Docker and cloud deployment options.

### 4. Integrate with Your Application

Use the REST API endpoints documented in [API_DOCS.md](./API_DOCS.md).

---

## System Requirements Summary

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 cores | 4+ cores |
| RAM | 4GB | 8GB+ |
| Disk | 2GB | 10GB+ |
| Python | 3.8 | 3.10+ |
| Internet | For setup | For LLM features |

---

## Support Resources

- **Main README**: [README.md](./README.md)
- **API Documentation**: [API_DOCS.md](./API_DOCS.md)
- **Endee Docs**: https://docs.endee.io
- **Issues**: GitHub issues section
- **Discord**: Endee community Discord

---

**Congratulations!** Your Endee AI Search & RAG System is ready! 🎉

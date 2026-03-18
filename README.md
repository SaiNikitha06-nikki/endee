# Endee AI Search & RAG System

A production-ready **Retrieval Augmented Generation (RAG)** application powered by **Endee** - a high-performance open-source vector database.

## 🎯 Overview

This project demonstrates a complete AI/ML system that combines semantic search with language models for intelligent question answering. It showcases how to build modern retrieval-augmented applications using Endee's efficient vector database.

### Key Features

- **Semantic Search**: Find documents using vector similarity rather than keyword matching
- **RAG (Retrieval Augmented Generation)**: Answer questions by retrieving relevant context and feeding it to an LLM
- **Metadata Filtering**: Filter results based on document metadata
- **Batch Indexing**: Efficiently index large document collections
- **Modern Web UI**: Interactive dashboard for search and Q&A
- **REST API**: Full API for integration with other applications
- **Fine-tuned Embeddings**: Uses Sentence Transformers for high-quality embeddings

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Web Interface                          │
│  (HTML/CSS/JavaScript - Interactive Dashboard)             │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/JSON
┌──────────────────────▼──────────────────────────────────────┐
│                   Flask API Server                          │
│  ┌────────────────┬──────────────┬──────────────┐          │
│  │  /api/search   │  /api/ask    │  /api/status │          │
│  │  (Semantic)    │  (RAG Q&A)   │  (Health)    │          │
│  └────────────┬───┴──────┬───────┴───────┬──────┘          │
└───────────────┼──────────┼────────────────┼─────────────────┘
                │          │                │
        ┌───────▼──────┐  │  ┌─────────────▼─────┐
        │   Search     │  │  │  RAG Pipeline     │
        │   Module     │  │  │  (LLM Integration)│
        └───────┬──────┘  │  └────────────┬──────┘
                │         │               │
        ┌───────▼─────────▼───────────────▼──────────┐
        │   Embedding Generation                     │
        │   (Sentence Transformers)                  │
        └───────┬────────────────────────────────────┘
                │
        ┌───────▼───────────────────────────────────┐
        │  Endee Vector Database                    │
        │  (High-Performance Vector Search)         │
        │  - Dense Vector Storage                   │
        │  - Similarity Search                      │
        │  - Metadata Filtering                     │
        └───────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Endee vector database running on `localhost:8080` (or configured endpoint)
- pip (Python package manager)

### 1. Install Endee

Follow the [official Endee getting started guide](https://docs.endee.io/quick-start):

```bash
# Clone the Endee repository
git clone https://github.com/endee-io/endee.git
cd endee

# Install and build
chmod +x ./install.sh ./run.sh
./install.sh --release --avx2

# Run Endee server (in a separate terminal)
./run.sh
```

Endee will start on `http://localhost:8080`.

### 2. Setup AI Search Project

```bash
# Navigate to the ai-search-project directory
cd ai-search-project

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Download embedding model (first run only, ~80MB)
python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"
```

### 3. Configure the Application

```bash
# Copy and edit the example configuration
cp .env.example .env

# Edit .env with your settings (optional)
nano .env
```

Key configuration variables:
- `ENDEE_HOST`: Vector database host (default: localhost)
- `ENDEE_PORT`: Vector database port (default: 8080)
- `LLM_API_KEY`: OpenAI API key (optional, for RAG features)
- `LLM_MODEL`: Model to use (default: gpt-3.5-turbo)

### 4. Initialize with Sample Data

```bash
# Load and index the sample dataset
python init_data.py
```

This will:
- Connect to Endee
- Create the documents index
- Generate embeddings for sample documents
- Index them in Endee

### 5. Start the Application

```bash
# Start Flask development server
python app.py
```

The application will be available at `http://localhost:5000`

## 📚 Usage

### Web Interface

Navigate to `http://localhost:5000` and use the interactive dashboard:

**1. Semantic Search Tab**
- Enter a search query
- Adjust the number of results (top_k)
- View documents ranked by relevance score
- Expand full text with "View Full Text"

**2. Question Answering Tab**
- Ask a question about your documents
- System retrieves relevant context
- LLM generates an answer (if configured)
- View source documents used for the answer

**3. System Info Tab**
- Check database connection status
- View document statistics
- Learn about the system architecture

### REST API

#### 1. Semantic Search

```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning",
    "top_k": 5
  }'
```

**Response:**
```json
{
  "query": "machine learning",
  "count": 2,
  "results": [
    {
      "id": 0,
      "score": 0.89,
      "text": "Machine learning is a field of artificial intelligence",
      "metadata": {}
    }
  ],
  "timestamp": "2024-03-17T10:30:00.000000"
}
```

#### 2. Question Answering (RAG)

```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is machine learning?",
    "num_contexts": 3
  }'
```

**Response:**
```json
{
  "question": "What is machine learning?",
  "answer": "Based on the retrieved documents: Machine learning is a field of artificial intelligence...",
  "sources": [
    "Machine learning is a field of artificial intelligence...",
    "Deep learning uses neural networks..."
  ],
  "timestamp": "2024-03-17T10:30:00.000000"
}
```

#### 3. System Status

```bash
curl http://localhost:5000/api/health
```

#### 4. Index Statistics

```bash
curl http://localhost:5000/api/documents
```

#### 5. Batch Index Documents

```bash
curl -X POST http://localhost:5000/api/documents/batch \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "id": 100,
        "text": "Your document text here",
        "metadata": {
          "source": "docs",
          "category": "tutorial"
        }
      }
    ]
  }'
```

## 📁 Project Structure

```
ai-search-project/
├── app.py                 # Flask application entry point
├── config.py             # Configuration management
├── embedding.py          # Embedding generation module
├── vector_store.py       # Endee integration & vector operations
├── search.py             # Semantic search functionality
├── rag.py               # RAG pipeline with LLM integration
├── init_data.py         # Data initialization script
├── requirements.txt     # Python dependencies
├── .env.example         # Example environment variables
├── dataset.txt          # Sample documents
├── templates/
│   └── index.html       # Web interface
└── static/
    ├── style.css        # Styling
    └── script.js        # Frontend JavaScript
```

## 🔧 Configuration

### Environment Variables (.env)

```ini
# Endee Configuration
ENDEE_HOST=localhost
ENDEE_PORT=8080
ENDEE_INDEX_NAME=documents

# Embedding Model
EMBEDDING_MODEL=all-MiniLM-L6-v2
EMBEDDING_DIMENSION=384

# LLM Configuration (Optional)
LLM_API_KEY=your_openai_key
LLM_API_URL=https://api.openai.com/v1
LLM_MODEL=gpt-3.5-turbo

# Application
DEBUG=False
MAX_RESULTS=5
SIMILARITY_THRESHOLD=0.3
CORS_ORIGINS=*
```

### Available Embedding Models

The system uses Sentence Transformers. Some popular models:

| Model | Dimension | Speed | Quality |
|-------|-----------|-------|---------|
| all-MiniLM-L6-v2 | 384 | Fast | Good |
| all-mpnet-base-v2 | 768 | Medium | Excellent |
| multi-qa-mpnet-base-dot-v1 | 768 | Medium | Great for Q&A |
| paraphrase-MiniLM-L6-v2 | 384 | Fast | Good |

Change in `.env`:
```ini
EMBEDDING_MODEL=all-mpnet-base-v2
EMBEDDING_DIMENSION=768
```

## 📖 Use Cases

### 1. Documentation Search
Index your product documentation or API docs for instant semantic search:
```python
# Load docs from markdown files
docs = load_documentation()
index_documents(docs, metadata={"type": "documentation"})
```

### 2. Customer Support Knowledge Base
Build an intelligent help system:
```python
# Load support articles
articles = load_support_articles()
index_documents(articles, metadata={"category": "support"})

# Users ask questions, system finds relevant articles
response = rag_pipeline.query("How do I reset my password?")
```

### 3. Research Paper Search
Index academic papers for intelligent discovery:
```python
# Load papers with metadata
papers = load_papers_with_metadata()
index_documents(papers, metadata={"journal": "Nature", "year": 2023})

# Find relevant papers by semantic similarity
results = semantic_search("attention mechanisms in deep learning")
```

### 4. E-commerce Product Recommendations
Recommend products based on semantic similarity:
```python
# Index product descriptions
products = load_product_catalog()
index_documents(products, metadata={"category": "electronics", "price": 299})

# Find similar products
similar = semantic_search(user_query, filter_by_category="electronics")
```

## 🔌 Integrating with External LLMs

### OpenAI (GPT-3.5/GPT-4)

```python
# Set environment variables
export LLM_API_KEY="sk-..."
export LLM_MODEL="gpt-4"

# The RAG pipeline automatically uses it
response = rag_pipeline.query("Your question here")
```

### Local LLMs (Ollama)

```python
# In .env:
LLM_API_URL=http://localhost:11434/v1
LLM_MODEL=llama2
LLM_API_KEY=not-needed
```

### Custom LLM Implementation

```python
# Extend RAGPipeline in rag.py
class CustomRAGPipeline(RAGPipeline):
    def _generate_answer(self, question, context):
        # Your custom LLM integration
        return your_llm_call(question, context)
```

## 🧪 Development

### Running Tests

```bash
# Coming soon - add test suite
pytest tests/
```

### Debugging

Enable debug mode in `.env`:
```ini
DEBUG=True
```

Enable verbose logging:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Performance Tips

1. **Batch Indexing**: Index documents in batches for better performance
2. **Embedding Dimension**: Smaller dimensions (384) = faster search, larger (768) = better quality
3. **Filter Early**: Use metadata filters to reduce search space
4. **Cache Embeddings**: Pre-compute embeddings if documents don't change frequently

## 📊 Example Workflows

### Workflow 1: Index and Search Documents

```python
from init_data import load_documents_from_file, index_documents
from search import semantic_search

# 1. Load documents
docs = load_documents_from_file("my_documents.txt")

# 2. Index them
index_documents(docs)

# 3. Search
results = semantic_search("find documents about AI")

# 4. Use results
for result in results:
    print(f"Score: {result['score']}")
    print(f"Text: {result['text']}")
```

### Workflow 2: Question Answering Pipeline

```python
from rag import RAGPipeline

# Initialize RAG
rag = RAGPipeline()

# Ask a question
response = rag.query("What are the benefits of machine learning?")

print("Answer:", response['answer'])
print("Sources:", response['sources'])
```

### Workflow 3: Batch Indexing with Metadata

```python
import json
from embedding import generate_embeddings
from vector_store import db

# Load documents with metadata
with open('documents.json') as f:
    docs = json.load(f)

# Prepare batch
batch = []
for i, doc in enumerate(docs):
    batch.append({
        "id": i,
        "vector": None,  # Will be generated
        "text": doc['text'],
        "metadata": {
            "source": doc['source'],
            "date": doc['date'],
            "category": doc['category']
        }
    })

# Generate embeddings
texts = [d['text'] for d in batch]
embeddings = generate_embeddings(texts)

# Set embeddings
for batch_item, embedding in zip(batch, embeddings):
    batch_item['vector'] = embedding

# Index
db.insert_batch(batch)
```

## 🚀 Deployment

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"

CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t endee-search .
docker run -p 5000:5000 -e ENDEE_HOST=host.docker.internal endee-search
```

### Docker Compose

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  endee:
    image: endeehq/endee:latest
    ports:
      - "8080:8080"
    volumes:
      - endee_data:/data

  app:
    build: ./ai-search-project
    ports:
      - "5000:5000"
    environment:
      ENDEE_HOST: endee
      ENDEE_PORT: 8080
    depends_on:
      - endee
    volumes:
      - ./ai-search-project:/app

volumes:
  endee_data:
```

Run with:
```bash
docker-compose up
```

### Production Deployment

For production, consider:
1. Use a production WSGI server (Gunicorn, uWSGI)
2. Add reverse proxy (Nginx)
3. Enable HTTPS/SSL
4. Setup proper logging and monitoring
5. Use environment variables for secrets
6. Enable database backups

Example Gunicorn command:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🔗 Resources

- **Endee Documentation**: https://docs.endee.io
- **Endee GitHub**: https://github.com/endee-io/endee
- **Sentence Transformers**: https://www.sbert.net
- **OpenAI API**: https://platform.openai.com/docs

## 🆘 Troubleshooting

### Connection Error to Endee

```
Error: Could not connect to Endee at localhost:8080
```

**Solution:**
1. Make sure Endee is running: `./run.sh` in the endee directory
2. Check the configured host and port in `.env`
3. Verify firewall allows connections on port 8080

### Embedding Model Download Fails

```
Error downloading model from huggingface
```

**Solution:**
1. Check internet connection
2. Try again - HuggingFace servers may be temporarily unavailable
3. Cache the model manually: `python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"`

### LLM API Errors

```
401 Unauthorized from OpenAI API
```

**Solution:**
1. Verify `LLM_API_KEY` is set correctly in `.env`
2. Check account has quota/credits
3. Try disabling LLM (remove `LLM_API_KEY`) for fallback mode

### Out of Memory Errors

**Solution:**
1. Reduce batch size in `init_data.py`
2. Use smaller embedding model (384 dimension instead of 768)
3. Index documents in smaller batches
4. Increase available system memory

## 📧 Support

For questions and support:
- GitHub Issues: [Create an issue](https://github.com/yourusername/endee-search/issues)
- Endee Discord: https://discord.gg/5HFGqDZQE3

## ⭐ Show Your Support

If you find this project helpful, please star it on GitHub!

---

**Made with ❤️ using Endee Vector Database**

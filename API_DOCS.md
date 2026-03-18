# API Documentation

This document provides detailed information about the REST API endpoints for the Endee AI Search & RAG System.

## Base URL

```
http://localhost:5000/api
```

All requests should include the header:
```
Content-Type: application/json
```

## Endpoints

### 1. Health Check

Get the current health status of the system.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-17T10:30:00.123456",
  "services": {
    "flask": "running",
    "endee": "healthy"
  }
}
```

**Status Codes:**
- `200`: System is healthy
- `503`: Endee database offline

---

### 2. System Status

Get detailed system information and database statistics.

**Endpoint:** `GET /status`

**Response:**
```json
{
  "status": "online",
  "database": {
    "name": "documents",
    "host": "localhost",
    "port": 8080,
    "stats": {
      "points_count": 150,
      "vector_size": 384
    }
  }
}
```

**Status Codes:**
- `200`: Status retrieved successfully
- `500`: Error retrieving status

---

### 3. Semantic Search

Search for documents using vector similarity based on semantic meaning.

**Endpoint:** `POST /search`

**Request Body:**
```json
{
  "query": "machine learning algorithms",
  "top_k": 5,
  "filter": null
}
```

**Parameters:**
- `query` (string, required): Search query text
- `top_k` (integer, optional): Number of results to return (default: 5, max: 100)
- `filter` (object, optional): Metadata filter conditions

**Response:**
```json
{
  "query": "machine learning algorithms",
  "count": 3,
  "results": [
    {
      "id": 5,
      "score": 0.92,
      "text": "Machine learning is a subset of artificial intelligence...",
      "metadata": {
        "source": "wikipedia",
        "category": "ml"
      }
    },
    {
      "id": 12,
      "score": 0.87,
      "text": "Supervised learning is a machine learning approach...",
      "metadata": {
        "source": "textbook",
        "category": "ml"
      }
    }
  ],
  "timestamp": "2024-03-17T10:30:00.123456"
}
```

**Status Codes:**
- `200`: Search successful
- `400`: Invalid request
- `500`: Server error

**Notes:**
- Score range: 0.0 to 1.0 (higher = more relevant)
- Results are sorted by relevance (descending)
- Empty results indicate no documents met the similarity threshold

---

### 4. Question Answering (RAG)

Answer questions using the RAG pipeline with semantic search and LLM integration.

**Endpoint:** `POST /ask`

**Request Body:**
```json
{
  "question": "What is machine learning?",
  "num_contexts": 5
}
```

**Parameters:**
- `question` (string, required): User question
- `num_contexts` (integer, optional): Number of context documents to retrieve (default: 5)

**Response:**
```json
{
  "question": "What is machine learning?",
  "answer": "Machine learning is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. Based on the retrieved documents, it focuses on developing algorithms that can improve their performance through experience.",
  "sources": [
    "Machine learning is a subset of artificial intelligence...",
    "Deep learning is a specialized branch of machine learning..."
  ],
  "timestamp": "2024-03-17T10:30:00.123456"
}
```

**Status Codes:**
- `200`: Answer generated successfully
- `400`: Invalid request
- `500`: Server error

**Notes:**
- If LLM is not configured, returns context-only answer
- Sources are ranked by relevance
- Fallback to semantic search if no LLM is available

---

### 5. List Documents

Get statistics about indexed documents.

**Endpoint:** `GET /documents`

**Response:**
```json
{
  "total_documents": 150,
  "index_name": "documents",
  "stats": {
    "points_count": 150,
    "vector_size": 384,
    "memory_usage": "15.2 MB"
  }
}
```

**Status Codes:**
- `200`: Statistics retrieved
- `500`: Error retrieving statistics

---

### 6. Batch Index Documents

Index multiple documents in a single request.

**Endpoint:** `POST /documents/batch`

**Request Body:**
```json
{
  "documents": [
    {
      "id": 100,
      "text": "First document about machine learning",
      "metadata": {
        "source": "blog",
        "date": "2024-03-01",
        "category": "AI"
      }
    },
    {
      "id": 101,
      "text": "Second document about neural networks",
      "metadata": {
        "source": "paper",
        "date": "2024-03-02",
        "category": "Deep Learning"
      }
    }
  ]
}
```

**Parameters:**
- `documents` (array, required): List of documents to index
  - `id` (integer): Unique document identifier
  - `text` (string): Document content
  - `metadata` (object, optional): Key-value metadata for filtering

**Response:**
```json
{
  "success": true,
  "documents_indexed": 2
}
```

**Status Codes:**
- `200`: Batch indexed successfully
- `400`: Invalid request
- `500`: Server error

**Notes:**
- Each document ID must be unique
- Maximum batch size: 1000 documents
- Embeddings are generated automatically
- Returns immediately (embeddings generated server-side)

---

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error description"
}
```

### Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 400 | Bad Request | Check request body format |
| 404 | Not Found | Check endpoint URL |
| 500 | Server Error | Check server logs |
| 503 | Service Unavailable | Ensure Endee is running |

---

## Rate Limiting

No rate limiting is currently implemented. For production use, add rate limiting:

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route("/api/search", methods=["POST"])
@limiter.limit("10/minute")
def search_endpoint():
    ...
```

---

## Examples

### Example 1: Search for Documents

```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "deep neural networks",
    "top_k": 3
  }'
```

### Example 2: Ask a Question

```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How do neural networks work?",
    "num_contexts": 5
  }'
```

### Example 3: Check System Status

```bash
curl http://localhost:5000/api/health
```

### Example 4: Batch Index Documents

```bash
curl -X POST http://localhost:5000/api/documents/batch \
  -H "Content-Type: application/json" \
  -d '{
    "documents": [
      {
        "id": 1,
        "text": "Artificial intelligence is transforming technology",
        "metadata": {"category": "AI", "type": "news"}
      },
      {
        "id": 2,
        "text": "Machine learning enables predictive analytics",
        "metadata": {"category": "ML", "type": "article"}
      }
    ]
  }'
```

### Example 5: Search with Filter

Future implementation - filtering by metadata:

```bash
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "neural networks",
    "top_k": 5,
    "filter": {
      "category": "Deep Learning"
    }
  }'
```

---

## Authentication

Currently no authentication is implemented. For production:

```python
from functools import wraps
from flask import request

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if not api_key or not verify_api_key(api_key):
            return jsonify({"error": "Invalid API key"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route("/api/search", methods=["POST"])
@require_api_key
def search_endpoint():
    ...
```

---

## Response Time Guidelines

Expected response times (on modern hardware):

| Operation | Time |
|-----------|------|
| Health check | < 10ms |
| Single search | 50-200ms |
| Search + RAG | 1-5 seconds |
| Batch index 100 docs | 2-10 seconds |

---

## Pagination

Currently, pagination is not implemented. Use `top_k` parameter to limit results.

---

## Versioning

API Version: 1.0.0

Future versions may introduce breaking changes. Current API is stable for migration to async endpoints and additional features.

---

## Support

For API issues and questions:
1. Check error message in response
2. Review logs: `tail -f logs/app.log`
3. Verify Endee is running on configured host/port
4. Check GitHub issues: https://github.com/yourusername/endee-search/issues

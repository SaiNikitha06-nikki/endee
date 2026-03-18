

# init_data.py
from vector_store import db
from embedding import generate_embedding

def load_data():
    """
    Loads initial documents into in-memory vector DB.
    """
    documents = [
        {"id": "1", "text": "Machine learning is a branch of AI that allows computers to learn from data."},
        {"id": "2", "text": "Deep learning is a subset of machine learning using neural networks."},
        {"id": "3", "text": "AI is a field of computer science focused on creating intelligent machines."},
        {"id": "4", "text": "Python is a popular programming language used for AI and data science."},
        {"id": "5", "text": "Semantic search finds documents based on meaning rather than exact keywords."}
    ]

    # Generate embeddings for all texts
    texts = [doc["text"] for doc in documents]
    embeddings = generate_embedding(texts)

    # Insert into DB
    for doc, emb in zip(documents, embeddings):
        db.insert(
            id=doc["id"],
            vector=emb,
            metadata={"text": doc["text"]}
        )

    print(f"✅ Loaded {len(documents)} documents into vector DB")
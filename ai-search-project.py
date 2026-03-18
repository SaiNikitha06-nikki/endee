# search.py

from endee_client import endee_db

def semantic_search(query, top_k=3):
    return endee_db.search(query)

def get_context_for_rag(query):
    results = semantic_search(query)
    return " ".join([r["text"] for r in results])
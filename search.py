# search.py

from endee_client import endee_db

def semantic_search(query, top_k=3):
    results = endee_db.search(query)
    return results[:top_k]

def get_context_for_rag(query):
    results = semantic_search(query)
    return " ".join([r.get("text", "") for r in results])

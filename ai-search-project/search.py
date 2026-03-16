from embeddings import generate_embedding
from vector_store import search_vector

def semantic_search(query):

    query_embedding = generate_embedding(query)

    results = search_vector(query_embedding)

    if results:
        return results[0]["text"]

    return "No relevant document found"
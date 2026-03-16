from endee import VectorDB

db = VectorDB("documents")

def store_documents(docs, embeddings):

    for i, doc in enumerate(docs):

        db.insert({
            "id": i,
            "vector": embeddings[i],
            "text": doc
        })

def search_vector(query_embedding):

    results = db.search(
        vector=query_embedding,
        top_k=1
    )

    return results
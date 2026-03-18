

# embedding.py
import numpy as np
from sentence_transformers import SentenceTransformer

# Load a pre-trained sentence transformer
model = SentenceTransformer('all-MiniLM-L6-v2')  # small and fast

def generate_embedding(texts):
    """
    Generates embeddings for a list of texts
    """
    if isinstance(texts, str):
        texts = [texts]
    embeddings = model.encode(texts, convert_to_numpy=True)
    return embeddings.tolist()


# rag.py
from search import get_context_for_rag

class RAGPipeline:
    def __init__(self, model=None):
        self.model = model  # optional LLM

    def answer_query(self, query):
        context = get_context_for_rag(query)
        # If no model, just return context
        answer = context
        return answer
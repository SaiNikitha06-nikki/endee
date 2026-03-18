# vector_store.py

from endee_client import endee_db

def add_to_db(text):
    endee_db.insert(text)

def get_db():
    return endee_db.storage
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from search import semantic_search, get_context_for_rag
from vector_store import add_to_db

app = Flask(__name__)
CORS(app)

# 🔹 Store search history
history = []

# 🔹 Load initial data
docs = [
    "Python is a programming language.",
    "Flask is a web framework.",
    "Machine learning is used in AI.",
    "RAG stands for Retrieval-Augmented Generation.",
    "Semantic search improves search accuracy."
]

for doc in docs:
    add_to_db(doc)

@app.route("/")
def home():
    return render_template("index.html")

# 🔍 SEARCH
@app.route("/search", methods=["POST"])
def search():
    query = request.json.get("query")

    results = semantic_search(query)
    context = get_context_for_rag(query)

    history.append(query)

    return jsonify({
        "results": results,
        "context": context,
        "history": history[-5:]
    })

# 📁 FILE UPLOAD
@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    content = file.read().decode("utf-8")

    add_to_db(content)

    return jsonify({"message": "File uploaded successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
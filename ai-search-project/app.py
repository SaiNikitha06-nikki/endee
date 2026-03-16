from flask import Flask, request, jsonify

app = Flask(__name__)

documents = [
    "Machine learning is a field of artificial intelligence",
    "Data science extracts insights from data",
    "Deep learning uses neural networks",
    "Natural language processing helps machines understand language"
]

@app.route("/")
def home():
    return "Endee Semantic Search Project Running"

@app.route("/search", methods=["POST"])
def search():
    data = request.json
    query = data["query"]

    for doc in documents:
        if query.lower() in doc.lower():
            return jsonify({"result": doc})

    return jsonify({"result": "No result found"})

if __name__ == "__main__":
    app.run(debug=True)
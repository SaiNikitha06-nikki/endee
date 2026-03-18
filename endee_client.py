# endee_client.py

class Endee:
    def __init__(self):
        self.storage = []

    def insert(self, text):
        self.storage.append({"text": text})

    def search(self, query):
        results = []
        query = query.lower().split()

        for item in self.storage:
            text = item["text"].lower()
            score = sum(1 for word in query if word in text)
            total = len(query)
            percentage = (score / total) * 100 if total > 0 else 0

            results.append((item["text"], round(percentage, 2)))

        results.sort(key=lambda x: x[1], reverse=True)

        return [{"text": r[0], "score": r[1]} for r in results[:3]]


# Create global Endee instance
endee_db = Endee()
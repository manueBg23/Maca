from flask import Flask, request, jsonify, render_template
from model import RecommenderSystem
from chatbot.bot import get_response

app = Flask(__name__)

recommender = RecommenderSystem()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    response = get_response(user_message)
    return jsonify({"response": response})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json

    tipo = data.get("tipo")
    precio = data.get("precio")
    producto = data.get("producto")

    if producto:
        resultados = recommender.recommend_by_product(producto)
    elif tipo and precio:
        resultados = recommender.recommend_by_type(tipo)
        resultados = [r for r in resultados if r["precio"] <= precio]
    elif tipo:
        resultados = recommender.recommend_by_type(tipo)
    elif precio:
        resultados = recommender.recommend_by_price(precio)
    else:
        resultados = recommender.df.sample(5).to_dict(orient="records")

    return jsonify({"recommendations": resultados})

if __name__ == "__main__":
    app.run(debug=True)
import random
import pandas as pd
from chatbot.intents import responses

df = pd.read_csv("data.csv")

def get_random_response(intent):
    return random.choice(responses.get(intent, ["No tengo respuesta 😅"]))

def buscar_por_tipo(tipo, limite=5):
    resultados = df[df['tipo'].str.contains(tipo, case=False, na=False)]
    if resultados.empty:
        return "No encontré productos de ese tipo 😢"
    resultados = resultados.sort_values(by="precio")
    respuesta = f"Te encontré estos {tipo} 💎:\n"
    for _, row in resultados.head(limite).iterrows():
        respuesta += f"- {row['nombre_producto']} | {row['modelo']} | ${row['precio']}\n"
    return respuesta

def buscar_por_precio(max_precio, limite=5):
    resultados = df[df['precio'] <= max_precio]
    if resultados.empty:
        return "No encontré productos en ese rango 😢"
    resultados = resultados.sort_values(by="precio")
    respuesta = f"Opciones por debajo de ${max_precio} 💰:\n"
    for _, row in resultados.head(limite).iterrows():
        respuesta += f"- {row['nombre_producto']} ({row['tipo']}) | ${row['precio']}\n"
    return respuesta

def recomendar_filtrado(tipo=None, max_precio=None, limite=5):
    resultados = df.copy()
    if tipo:
        resultados = resultados[resultados['tipo'].str.contains(tipo, case=False, na=False)]
    if max_precio:
        resultados = resultados[resultados['precio'] <= max_precio]
    if resultados.empty:
        return "No encontré recomendaciones con esos criterios 😢"
    resultados = resultados.sort_values(by="precio")
    respuesta = "Te recomiendo estas joyas 💎:\n"
    for _, row in resultados.head(limite).iterrows():
        respuesta += f"- {row['nombre_producto']} ({row['tipo']}) | ${row['precio']}\n"
    return respuesta

def extraer_precio(message):
    numeros = [int(s) for s in message.split() if s.isdigit()]
    return numeros[0] if numeros else None

def detectar_tipo(message):
    if "anillo" in message:
        return "anillo"
    if "earcuff" in message or "miniearcuff" in message:
        return "miniearcuff"
    if "earcof" in message:
        return "earcof"
    if "aretes san agustin" in message:
        return "aretes san agustin"
    if "aretes" in message:
        return "aretes"
    if "manilla" in message:
        return "manillas"
    return None

def get_response(message):
    message = message.lower()

    if any(word in message for word in ["hola", "buenas", "hey"]):
        return get_random_response("saludo")

    if any(word in message for word in ["adios", "chao", "gracias"]):
        return get_random_response("despedida")

    if "producto" in message or "joya" in message:
        return get_random_response("productos")

    tipo_detectado = detectar_tipo(message)
    precio_detectado = extraer_precio(message)

    if "recomienda" in message or "recomendacion" in message:
        return recomendar_filtrado(tipo_detectado, precio_detectado)

    if tipo_detectado and precio_detectado:
        return recomendar_filtrado(tipo_detectado, precio_detectado)

    if tipo_detectado:
        return buscar_por_tipo(tipo_detectado)

    if precio_detectado:
        return buscar_por_precio(precio_detectado)

    if "barato" in message or "económico" in message:
        return buscar_por_precio(80000)

    if "caro" in message or "premium" in message:
        return buscar_por_precio(300000)

    if "precio" in message:
        return get_random_response("precio")

    if "modelo" in message or "estilo" in message:
        return get_random_response("modelo")

    if "comprar" in message:
        return get_random_response("comprar")

    if "envio" in message:
        return get_random_response("envio")

    sample = df.sample(3)
    respuesta = "No entendí exactamente, pero mira estas opciones 💎:\n"
    for _, row in sample.iterrows():
        respuesta += f"- {row['nombre_producto']} ({row['tipo']}) | ${row['precio']}\n"
    return respuesta
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity


class RecommenderSystem:

    def __init__(self):
        self.df = pd.read_csv("data.csv") 
        self.prepare_data()

    def prepare_data(self):
        self.df_model = self.df[['tipo', 'modelo', 'precio']].copy()

        self.le_tipo = LabelEncoder()
        self.le_modelo = LabelEncoder()

        self.df_model['tipo'] = self.le_tipo.fit_transform(self.df_model['tipo'])
        self.df_model['modelo'] = self.le_modelo.fit_transform(self.df_model['modelo'])

        self.features = self.df_model.values

        self.similarity_matrix = cosine_similarity(self.features)

    def recommend_by_product(self, product_name, top_n=5):
        try:
            idx = self.df[self.df['nombre_producto'].str.lower() == product_name.lower()].index[0]
        except:
            return "No encontré ese producto 😢"

        sim_scores = list(enumerate(self.similarity_matrix[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        top_products = sim_scores[1:top_n+1]

        resultados = []
        for i, score in top_products:
            producto = self.df.iloc[i]
            resultados.append({
                "nombre": producto['nombre_producto'],
                "tipo": producto['tipo'],
                "modelo": producto['modelo'],
                "precio": producto['precio']
            })

        return resultados

    def recommend_by_price(self, max_price, top_n=5):
        resultados = self.df[self.df['precio'] <= max_price].head(top_n)

        return resultados.to_dict(orient="records")

    def recommend_by_type(self, tipo, top_n=5):
        resultados = self.df[self.df['tipo'].str.contains(tipo, case=False, na=False)].head(top_n)

        return resultados.to_dict(orient="records")
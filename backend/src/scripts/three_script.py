
import sys
import joblib
import numpy as np
import pandas as pd

# Cargar el modelo entrenado
model_path = './tree_model.pkl'
model = joblib.load(model_path)
feature_names = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']
# Obtener los argumentos de entrada
args = sys.argv[1:]
input_data = np.array([float(arg) for arg in args]).reshape(1, -1)

input_df = pd.DataFrame(input_data, columns=feature_names)

predictions = model.predict(input_df)

print(predictions[0])
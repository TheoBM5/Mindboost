# Mindboost
Este proyecto tiene como objetivo acercar y difundir métodos de estudio efectivos entre los estudiantes.

# IA
Los árboles de decisión permiten personalizar las recomendaciones basándose en las respuestas individuales de los usuarios. Al evaluar diferentes combinaciones de hábitos, el árbol puede identificar patrones y sugerir el método de estudio más eficaz para cada tipo de usuario.

El desarrollo del algoritmo se llevó a cabo utilizando el lenguaje Python, aprovechando la potente librería scikit-learn (sklearn) para la creación y entrenamiento del modelo. Una vez
entrenado, el modelo fue guardado y se integró en la aplicación para su uso en tiempo real.
Los usuarios tienen la posibilidad de realizar un test dentro de la aplicación, donde se les formularán preguntas relacionadas con
su gestión del tiempo, sus hábitos de estudio, y sus preferencias al tomar apuntes y estudiar. Basado en las respuestas proporcionadas, el modelo de árbol de decisiones analiza los datos y genera una recomendación personalizada, incluyendo un plan de tiempo optimizado y una metodología de estudio que se ajuste a sus necesidades específicas.
Este sistema no solo mejora la experiencia de estudio del usuario, sino que también garantiza que cada recomendación esté fundamentada en sus propias circunstancias y preferencias, aumentando así la efectividad del proceso de aprendizaje.

# Sistemas distruibuidos
En la implementación de un sistema distribuido, la tolerancia a fallos es una característica esencial para garantizar la disponibilidad, confiabilidad y robustez del sistema ante posibles
fallos en componentes individuales. En este contexto, el uso de Docker y Kubernetes juega un papel crucial en la creación de un entorno distribuido y tolerante a fallos.
Docker permite empaquetar las aplicaciones y sus dependencias en contenedores ligeros y portátiles que pueden ejecutarse de manera consistente en cualquier entorno. En este proyecto, se utilizaron tres imágenes de Docker:


● Frontend: Encapsula la interfaz de usuario, aislando cualquier fallo potencial que pueda ocurrir en la capa de presentación.

● Backend: Contiene la lógica de la aplicación y la gestión de datos, asegurando que cualquier error en la lógica de negocio no afecte a otros componentes.

● IA/Python: Alberga los modelos de inteligencia artificial y las bibliotecas necesarias, permitiendo que los cálculos y predicciones se realicen de manera independient

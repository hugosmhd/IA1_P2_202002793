# 📘 Manual Técnico

## 📝 Introducción

-   **🎯 Objetivo del Proyecto**: Practicar conceptos de Machine Learning utilizando la biblioteca [Tytus.js](https://github.com/tytusdb/tytusjs) en una página web desarrollada con JavaScript y HTML.
-   **📈 Modelos Utilizados**: Se emplean modelos de regresión lineal y regresión polinomial para análisis de tendencias y patrones en los datos.

## 📋 Requisitos

-   **💻 Lenguajes y Bibliotecas**: JavaScript, HTML, Tytus.js.
-   **🌐 Navegador Compatible**: Navegadores recomendados (Chrome, Firefox, Safari).
-   **📂 Datos de Entrada**: Archivos de tipo .CSV o datasets compatibles con Tytus.js.

## 🗂️ Estructura del Proyecto

-   **Archivos Principales**:
    -   `index.html` – Interfaz de usuario.
    -   `script.js` – Código para los modelos de ML.
    -   `styles.css` - Hoja de estilos para darle formato a la página. 
-   **Componentes de la Aplicación**:
    -   **📄 Selección de archivo**: Para cargar datasets en formato .CSV.
    -   **⚙️ Configuración de parámetros**: Incluye el porcentaje de datos de entrenamiento y prueba, variables de entrada y salida, entre otros.
    -   **🔘 Botones de acción**:
        -   **Entrenamiento**.
        -   **Predicción**.
        -   **Mostrar gráficas**.

## ⚙️ Configuración y Uso de Tytus.js

1.  **📥 Instalación**:
    -   Se debera de ingresar al repositorio de GitHub proporcionado y descargar el archivo `/dist/tytus.js` que es el que contiene la libreria a utilizar para entrenar los modelos.
2.  **Modelos de Machine Learning**:
    -   **📊 Regresión Lineal**:
        -   Parámetros necesarios, cómo se instancia y resultados esperados.
    -   **📈 Regresión Polinomial**:
        -   Parámetros adicionales específicos para este modelo.
3.  **Operaciones**:
    -   **🛠️ Entrenamiento**: Cómo se entrenan los modelos con los datos cargados.
    -   **🔍 Predicción**: Cómo realizar predicciones utilizando los modelos entrenados.

## 🛠️ Gestión de Errores

-   **❌ Errores Comunes**: Ejemplo de errores como archivos no válidos y datos fuera de rango, con posibles soluciones.
-   **💬 Mensajes de Error**: Descripción de los mensajes que se muestran al usuario y cómo interpretarlos.

## 🔄 Mantenimiento y Actualización

-   **📦 Actualización de la Biblioteca**: Procedimiento para actualizar Tytus.js y realizar pruebas para verificar el correcto funcionamiento tras cambios.


## 📦 Dependencias

-   **📊 Google Charts**: Utilizado para renderizar gráficos de los resultados.
    
-   **🔗 Funciones de Modelos Externos**:
    
    -   **`performLinearRegression`** de `./linear.js`
    -   **`performRegressionPolynomial`** de `./poli.js`
    
    Estas funciones contienen las implementaciones específicas de los modelos de aprendizaje automático.


## 🔘 Botones con Eventos

Cada botón está enlazado a un evento específico, que desencadena una acción en el modelo seleccionado:

-   **Entrenamiento**: Inicia el entrenamiento del modelo seleccionado con los datos proporcionados.
-   **Predicción**: Realiza predicciones basadas en el modelo entrenado.
-   **Visualización de Gráficas**: Muestra gráficos generados de los resultados

![image](https://github.com/user-attachments/assets/90cb47ad-aef2-4a1f-9e11-9265342fd2b5)

## 📂 Carga del Archivo CSV

Para este proceso se uso una función que se encarga de leer línea por línea el archivo y guarda toda la información leída en un arreglo para que luego esa información se procesada por cada uno de los modelos.

### Ejemplo del CSV:

![image](https://github.com/user-attachments/assets/dcd2365d-993a-4ab3-98e3-5b84386b3137)

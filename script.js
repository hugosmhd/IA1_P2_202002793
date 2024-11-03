let data = [];
let graphDataSet = [];
let id = ''

document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        processCSV(text);
    };

    reader.readAsText(file);
});

document.getElementById('btnRegresion').onclick = function (event) {
    event.preventDefault(); 
    regresionLineal();
};

document.getElementById('btnRegresionPol').onclick = function (event) {
    event.preventDefault(); 
    regresionPolinomial();
};

document.getElementById('btnRegresionPolIndividual').onclick = function (event) {
    event.preventDefault(); 
    regresionPolinomialIndividual();
};

document.getElementById('bntPredict').onclick = function (event) {
    event.preventDefault(); 
    predict();
};

document.getElementById('bntCurrentModel').onclick = function (event) {
    event.preventDefault(); 
    currentModel();
};

document.getElementById('btnPredictSeparado').onclick = function (event) {
    event.preventDefault();
    const independentVar = document.getElementById("independentVar").value;
    const dependentVar = document.getElementById("dependentVar").value;
    const predictData = document.getElementById('predictData').value;

    const xValues = []
    const yValues = []
    const linearRegresion = new LinearRegression()

    data.forEach(row => {
        xValues.push(Number(row[independentVar]));
        yValues.push(Number(row[dependentVar]))
    });
    linearRegresion.fit(xValues, yValues);

    const result = linearRegresion.predict(predictData.split(',').map(Number));
    
    document.getElementById('predictionResultado').innerHTML = `<strong>Valores Predichos:</strong> ${result}`;
};

function processCSV(text) {
    const rows = text.trim().split("\n");
    const headers = rows[0].split(",");

    populateSelectOptions(headers);

    data = [];
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(",");
        const rowObject = {};

        headers.forEach((header, index) => {
            rowObject[header] = values[index];
        });

        data.push(rowObject);
    }
}

function populateSelectOptions(headers) {
    const independentSelect = document.getElementById("independentVar");
    const dependentSelect = document.getElementById("dependentVar");
    const independentSelect2 = document.getElementById("independentVar2");
    const dependentSelect2 = document.getElementById("dependentVar2");

    independentSelect.innerHTML = "";
    dependentSelect.innerHTML = "";
    independentSelect2.innerHTML = "";
    dependentSelect2.innerHTML = "";

    headers.forEach(header => {
        const option = document.createElement("option");
        option.value = header;
        option.textContent = header;

        independentSelect.appendChild(option.cloneNode(true));
        dependentSelect.appendChild(option.cloneNode(true));
        independentSelect2.appendChild(option.cloneNode(true));
        dependentSelect2.appendChild(option.cloneNode(true));
    });
}

function currentModel() {
    const independentVar = document.getElementById("independentVar").value;
    const dependentVar = document.getElementById("dependentVar").value;

    const xTrain2 = []
    const yTrain2 = []

    data.forEach(row => {
        xTrain2.push(Number(row[independentVar]));
        yTrain2.push(Number(row[dependentVar]))
    });

    const tabla = document.getElementById("miTabla").getElementsByTagName('tbody')[0];

    // Limpia el contenido previo
    tabla.innerHTML = '';

    // Recorre el arreglo de datos
    for (let i = 0; i < xTrain2.length; i++) {
        // Crea una nueva fila
        const nuevaFila = tabla.insertRow();

        // Crea celdas y les asigna valores del arreglo
        const celdaX = nuevaFila.insertCell(0);
        const celdaY = nuevaFila.insertCell(1);

        celdaX.innerText = xTrain2[i];
        celdaY.innerText = yTrain2[i];
    }
}

function regresionLineal() {
    // Obtener las variables seleccionadas
    const independentVar = document.getElementById("independentVar").value;
    const dependentVar = document.getElementById("dependentVar").value;

    // Imprimir los encabezados seleccionados
    console.log("Variable independiente (header):", independentVar);
    console.log("Variable dependiente (header):", dependentVar);

    // Imprimir los valores de las columnas seleccionadas
    const xTrain2 = []
    const yTrain2 = []
    const linear2 = new LinearRegression()


    data.forEach(row => {
        // console.log(`Independiente: ${row[independentVar]}, Dependiente: ${row[dependentVar]}`);
        xTrain2.push(Number(row[independentVar]));
        yTrain2.push(Number(row[dependentVar]))
    });
    console.log(xTrain2);
    console.log(yTrain2);

    linear2.fit(xTrain2, yTrain2)
    yPredict2 = linear2.predict(xTrain2)
    document.getElementById("logRS").innerHTML += '<br>X Train:   ' + xTrain2 + '<br>Y Train:   ' + yTrain2 + '<br>Y Predict: ' + yPredict2
    graphDataSet = joinArrays('x', xTrain2, 'yTrain', yTrain2, 'yPredict', yPredict2)

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

}

function drawChart() {
    const data2 = google.visualization.arrayToDataTable(graphDataSet);
    const options2 = {
        seriesType: 'scatter',
        series: { 1: { type: 'line' } }
    };
    const chart2 = new google.visualization.ComboChart(document.getElementById('chart_divRS'));
    chart2.draw(data2, options2);
}

function predict() {
    const independentVar = document.getElementById("independentVar").value;
    const dependentVar = document.getElementById("dependentVar").value;

    const xValues = []
    const yValues = []
    const linearRegresion = new LinearRegression()
    
    data.forEach(row => {
        // console.log(`Independiente: ${row[independentVar]}, Dependiente: ${row[dependentVar]}`);
        xValues.push(Number(row[independentVar]));
        yValues.push(Number(row[dependentVar]))
    });
    linearRegresion.fit(xValues, yValues);
    const result = linearRegresion.predict(xValues);
    const displayTable = document.getElementById("displayTable");
    for (let i = 0; i < xValues.length; i++) {
        const x = xValues[i];
        const y = result[i];
        let row = document.createElement("tr");
        let xCol = document.createElement("td");
        xCol.innerText = x.toString();
        let yCol = document.createElement("td");
        yCol.innerText = y.toString();
        let errCol = document.createElement("td");
        errCol.innerHTML =
            (Math.abs(parseFloat(yValues[i]) - parseFloat(result[i])) /
                parseFloat(yValues[i]) ===
                Infinity
                ? 1.0
                : Math.abs(parseFloat(yValues[i]) - parseFloat(result[i])) /
                parseFloat(yValues[i])) * 100.0;
        row.appendChild(xCol);
        row.appendChild(yCol);
        row.appendChild(errCol);
        displayTable.appendChild(row);
    }

    graphDataSet = [];
    graphDataSet.push(["X", "Y", "Predicted"]);
    for (let i = 0; i < xValues.length; i++) {
        const x = xValues[i];
        graphDataSet.push([x.toString(), yValues[i], result[i]]);
    }

    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart2);
}

function drawChart2() {
    const data = google.visualization.arrayToDataTable(graphDataSet);

    const options = {
        title: "Linear Regression",
        legend: { position: "bottom" },
    };

    const chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
    );

    chart.draw(data, options);
}

function mostrarContenido() {
    // Oculta todos los contenidos
    const contenidos = document.getElementsByClassName("contenido");
    for (let i = 0; i < contenidos.length; i++) {
        contenidos[i].style.display = "none";
    }

    // Obtiene el valor seleccionado
    const seleccion = document.getElementById("opciones").value;

    // Muestra el contenido correspondiente
    if (seleccion) {
        const contenido = document.getElementById(`contenido${seleccion.slice(-1)}`);
        contenido.style.display = "block";
    }
}

function regresionPolinomial() {

    const independentVar = document.getElementById("independentVar2").value;
    const dependentVar = document.getElementById("dependentVar2").value;

    const xTrain = [];
    const yTrain = [];

    data.forEach(row => {
        // console.log(`Independiente: ${row[independentVar]}, Dependiente: ${row[dependentVar]}`);
        xTrain.push(Number(row[independentVar]));
        yTrain.push(Number(row[dependentVar]))
    });

    const polynomial = new PolynomialRegression();
    const predictArray = xTrain

    polynomial.fit(xTrain, yTrain, 2);
    yPredict = polynomial.predict(predictArray);
    r2 = polynomial.getError();

    polynomial.fit(xTrain, yTrain, 3);
    yPredict2 = polynomial.predict(predictArray);
    r22 = polynomial.getError();

    polynomial.fit(xTrain, yTrain, 4);
    yPredict3 = polynomial.predict(predictArray);
    r23 = polynomial.getError();

    for (let i = 0; i < predictArray.length; i++) {
        yPredict[i] = Number(yPredict[i].toFixed(2));
        yPredict2[i] = Number(yPredict2[i].toFixed(2));
        yPredict3[i] = Number(yPredict3[i].toFixed(2));
    }

    document.getElementById("log1").innerHTML = 'X Train: [' + xTrain + ']';
    document.getElementById("log2").innerHTML = 'Y Train: [' + yTrain + ']';
    document.getElementById("log3").innerHTML = 'X To Predict: [' + predictArray + ']';
    document.getElementById("log4").innerHTML = 'Y Prediction Degree 2: [' + yPredict + ']';
    document.getElementById("log5").innerHTML = 'Y Prediction Degree 3: [' + yPredict2 + ']';
    document.getElementById("log6").innerHTML = 'Y Prediction Degree 4: [' + yPredict3 + ']';
    document.getElementById("log7").innerHTML = 'R^2 for Degree 2: ' + Number(r2.toFixed(2));
    document.getElementById("log8").innerHTML = 'R^2 for Degree 3: ' + Number(r22.toFixed(2));
    document.getElementById("log9").innerHTML = 'R^2 for Degree 4: ' + Number(r23.toFixed(2));

    graphDataSet = joinArrays2('x', xTrain, 'Training', yTrain, 'Prediction Degree 2', yPredict, 'Prediction Degree 3', yPredict2, 'Prediction Degree 4', yPredict3);

    google.charts.load('current', { 'packages': ['corechart'] });
    id = 'chart_div';
    google.charts.setOnLoadCallback(drawChart3);
}

function joinArrays2() {
    var a = []
    if (arguments.length == 10) {
        a.push([arguments[0], arguments[2], arguments[4], arguments[6], arguments[8]]);
        for (var i = 0; i < arguments[1].length; i++) {
            a.push([arguments[1][i], arguments[3][i], arguments[5][i], arguments[7][i], arguments[9][i]]);
        }
    }
    return a;
}

function drawChart3() {
    var data = google.visualization.arrayToDataTable(graphDataSet);
    var options = {
        seriesType: 'scatter',
        series: {
            1: { type: 'line' },
            2: { type: 'line' },
            3: { type: 'line' }
        }
    };
    var chart = new google.visualization.ComboChart(document.getElementById(id));
    chart.draw(data, options);
}

function regresionPolinomialIndividual() {

    const independentVar = document.getElementById("independentVar2").value;
    const dependentVar = document.getElementById("dependentVar2").value;
    const gradoPolinomio = document.getElementById('gradoPolinomio').value;
    const predictData2 = document.getElementById('predictData2').value;
    

    const xTrain = [];
    const yTrain = [];

    data.forEach(row => {
        // console.log(`Independiente: ${row[independentVar]}, Dependiente: ${row[dependentVar]}`);
        xTrain.push(Number(row[independentVar]));
        yTrain.push(Number(row[dependentVar]))
    });

    const polynomial = new PolynomialRegression();
    const predictArray = predictData2.split(',').map(Number)

    polynomial.fit(xTrain, yTrain, Number(gradoPolinomio));
    yPredict = polynomial.predict(predictArray);
    r2 = polynomial.getError();

    for (let i = 0; i < predictArray.length; i++) {
        yPredict[i] = Number(yPredict[i].toFixed(2));
    }

    document.getElementById("log_1").innerHTML = 'X Train: [' + xTrain + ']';
    document.getElementById("log_2").innerHTML = 'Y Train: [' + yTrain + ']';
    document.getElementById("log_3").innerHTML = 'X To Predict: [' + predictArray + ']';
    document.getElementById("log_4").innerHTML = 'Y Prediction Degree ' + gradoPolinomio + ': [' + yPredict + ']';
    document.getElementById("log_5").innerHTML = 'R^2 for Degree ' + gradoPolinomio + ': ' + Number(r2.toFixed(2));

    graphDataSet = joinArrays('x', xTrain, 'Training', yTrain, 'Prediction Degree 2', yPredict);

    google.charts.load('current', { 'packages': ['corechart'] });
    id = 'chart_div_2'
    google.charts.setOnLoadCallback(drawChart3);
}
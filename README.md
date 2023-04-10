# BackEndTienda

El comando a ejecutar en consola para test con artillery será:

artillery run config.yml --output testPerformance.json

Testing por endpoint:

artillery-plugin-metrics-by-endpoint

Para ver el resultado en grafica: 

artillery report testPerformance.json -o testResults.html

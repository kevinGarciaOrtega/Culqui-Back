src/: Esta es la carpeta principal de tu código fuente.

handlers/: Aquí colocarás los manejadores de tus funciones Lambda. Estos archivos deben contener la lógica específica para cada función Lambda.

tokenization.handler.ts: Maneja la función Lambda relacionada con la creación de tokens.
cardData.handler.ts: Maneja la función Lambda relacionada con la obtención de datos de tarjeta.
services/: Esta carpeta contendrá los servicios que encapsulan la lógica de negocio y la interacción con bases de datos u otros servicios externos.

tokenization.service.ts: Contiene la lógica de negocio relacionada con la tokenización de tarjetas.
database.service.ts: Se encarga de la interacción con la base de datos (PostgreSQL y Redis).
models/: Aquí definirás los modelos de datos que se utilizan en tu aplicación. Por ejemplo, puedes tener un modelo card.model.ts para representar la información de una tarjeta.

utils/: Carpeta para funciones y utilidades compartidas en toda la aplicación.

luhnAlgorithm.ts: Implementa el algoritmo de Luhn para validar números de tarjeta de crédito.
tests/: Esta carpeta contendrá las pruebas unitarias para tus funciones y servicios.

tokenization.test.ts: Pruebas relacionadas con la función de tokenización.
cardData.test.ts: Pruebas relacionadas con la obtención de datos de tarjeta.
package.json: Aquí definirás las dependencias y scripts de tu proyecto, incluyendo los comandos para compilar TypeScript y ejecutar pruebas.
# Pokédex Challenge

Aplicación React Native (Expo + TypeScript) que consume [PokéAPI](https://pokeapi.co/) para mostrar un listado de Pokémon y su detalle.

## Instalación y ejecución

Requisitos: Node.js LTS y Expo Go, o un emulador Android / simulador iOS.

```bash
git clone https://github.com/rocarlos1585/pokedex.git
cd pokedex
npm install
npx expo start
```

Pruebas y verificaciones:
 
```bash
npm test            # pruebas unitarias y de componentes
npm run typecheck   # verificación de tipos
npm run lint        # ESLint
```
 
Las tres verificaciones se ejecutan automáticamente en GitHub Actions en cada push a `main`.
 
Cubren formatters, mappers, casos de uso (con repositorio simulado), la estrategia de caché del repositorio, los reducers de estado y componentes de UI.

## Arquitectura y decisiones técnicas

- Expo con template `blank-typescript`.
- TypeScript en modo `strict`.
- Clean Architecture con la siguiente estructura:
```
src/
├── components/, hooks/, navigation/, screens/, theme/, utils/   # Presentación
├── domain/       # Modelos, enums, tipos, interfaces, errores y casos de uso
├── data/         # DTOs, mappers, fuentes de datos y repositorios
└── core/         # Cliente HTTP, almacenamiento e inyección de dependencias
```

### Decisiones principales
 
- **Uso de librerías:** el documento del reto indica en la sección 7 no usar librerías externas, pero la sección 8 permite seleccionarlas si se justifican. Se siguió la sección 8, limitando las librerías a infraestructura (navegación, almacenamiento y pruebas) y accediendo a ellas a través de abstracciones propias.
- **Inyección de dependencias manual:** las dependencias se crean en un único punto (`core/di/container.ts`) y se exponen a la UI mediante un Context. Los casos de uso reciben el repositorio por constructor, lo que permite probarlos con implementaciones simuladas.
- **DTOs y mappers:** las respuestas de la API se tipan como DTOs y se convierten a modelos de dominio, donde también se convierten las unidades (decímetros a metros, hectogramos a kilogramos).
- **Manejo centralizado de errores:** toda falla se normaliza a `AppError` con un `ErrorCode`; la UI traduce cada código a un mensaje en un solo lugar (`utils/errorMessages.ts`).
- **Estado con `useReducer` y *discriminated unions*:** cada pantalla modela sus estados (carga, error, vacío, éxito) como variantes exclusivas, evitando combinaciones imposibles.
- **Paginación:** carga incremental de 20 en 20 con `onEndReached`, *pull-to-refresh* y manejo de errores por página sin perder los datos ya cargados.
- **Diseño sin librerías de UI:** estilo con bordes y sombras sólidas desplazadas, y escenas de fondo por tipo de Pokémon construidas solo con `View`. Las sombras se dibujan con una vista adicional para verse igual en Android e iOS.
- **Accesibilidad:** roles, etiquetas y áreas táctiles de al menos 44 pt; elementos decorativos ocultos para lectores de pantalla.

### Persistencia
 
Se decidio una estrategia *network-first* con caché local por encima de *cache-first* para la parsistencia de datos ya que el listado es pequeño y la api es rapida:

1. el primer paso es consultar a la API, si responde correctamente el resultado se guarda en cache y se muestra.
2. si la API fall se consulta el dato que exista en cache indicando que proviene de ahi.
3. Si no hay red ni caché, se muestra el estado de error.
Se guardan las páginas del listado y los detalles consultados, como modelos de dominio, junto con la fecha en que se guardaron.

## Librerías utilizadas
 
| Librería | Justificación |
|---|---|
| `@react-native-async-storage/async-storage` | Persistencia local clave-valor; suficiente para el volumen de datos de la app. Se accede a través de la interfaz `KeyValueStorage`. |
| `@react-navigation/native`, `@react-navigation/native-stack` | Navegación entre listado y detalle con rutas y parámetros tipados; usa la navegación nativa de cada plataforma. |
| `react-native-screens`, `react-native-safe-area-context` | Dependencias requeridas por `native-stack`; la segunda también gestiona las áreas seguras de la pantalla. |
| `jest`, `jest-expo`, `@types/jest` (desarrollo) | Ejecución de pruebas unitarias; `jest-expo` provee la configuración para el entorno de Expo. |
| `@testing-library/react-native` (desarrollo) | Pruebas de componentes desde la perspectiva del usuario (texto, roles y etiquetas de accesibilidad). |
| `eslint`, `eslint-config-expo` (desarrollo) | Linting con la configuración recomendada para proyectos Expo. |

## Trade-offs, pendientes y mejoras futuras
 
**Trade-offs**
 
- El listado no muestra los tipos de cada Pokémon: el endpoint del listado no los incluye y obtenerlos requeriría una petición adicional por cada elemento. Por la misma razón, las escenas por tipo solo aparecen en el detalle.
- Con *network-first*, en una red lenta la caché se muestra hasta que la petición falla o alcanza el tiempo límite (10 s).
**Mejoras futuras**
 
- Caché de imágenes en disco (por ejemplo, `expo-image`) para mostrar el artwork sin conexión; actualmente depende de la caché HTTP del sistema.
- Validación en tiempo de ejecución de las respuestas de la API.
- Tiempo de expiración (TTL) de la caché usando la fecha ya guardada en cada entrada.
- Búsqueda y filtros por tipo.
 


# Pokédex Challenge

Aplicación React Native (Expo + TypeScript) que consume [PokéAPI](https://pokeapi.co/) para mostrar un listado de Pokémon y su detalle.

## Instalación y ejecución

Requisitos: Node.js LTS y Expo Go, o un emulador Android / simulador iOS.

```bash
git clone https://github.com/rocarlos1585/pokedex.git
cd PokedexChallenge
npm install
npx expo start
```

## Arquitectura y decisiones técnicas

- Expo con template `blank-typescript`.
- TypeScript en modo `strict`.
- Clean Architecture con la siguiente estructura:
```
src/
├── components/, hooks/, navigation/, screens/, theme/   # Presentación
├── domain/       # Modelos, enums, tipos, interfaces, errores y casos de uso
├── data/         # DTOs, mappers, fuentes de datos y repositorios
└── core/         # Cliente HTTP, almacenamiento e inyección de dependencias
```

## Librerías utilizadas
 
| Librería | Justificación |
|---|---|
| `@react-native-async-storage/async-storage` | Persistencia local clave-valor; suficiente para el volumen de datos de la app. Se accede a través de la interfaz `KeyValueStorage`. |
| `@react-navigation/native`, `@react-navigation/native-stack` | Navegación entre listado y detalle con rutas y parámetros tipados; usa la navegación nativa de cada plataforma. |
| `react-native-screens`, `react-native-safe-area-context` | Dependencias requeridas por `native-stack`; la segunda también gestiona las áreas seguras de la pantalla. |
 

### Persistencia
 
Se decidio una estrategia *network-first* con caché local por encima de *cache-first* para la parsistencia de datos ya que el listado es pequeño y la api es rapida:

1. el primer paso es consultar a la API, si responde correctamente el resultado se guarda en cache y se muestra.
2. si la API fall se consulta el dato que exista en cache indicando que proviene de ahi.
3. Si no hay red ni caché, se muestra el estado de error.
Se guardan las páginas del listado y los detalles consultados, como modelos de dominio, junto con la fecha en que se guardaron.
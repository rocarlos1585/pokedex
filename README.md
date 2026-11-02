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

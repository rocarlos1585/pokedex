export function formatPokemonName(name: string): string {
    return name
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
  
  export function formatPokemonNumber(id: number): string {
    return `#${String(id).padStart(3, '0')}`;
  }

  export function formatHeight(meters: number): string {
    return `${meters.toFixed(1)} m`;
  }
  
  export function formatWeight(kilograms: number): string {
    return `${kilograms.toFixed(1)} kg`;
  }
  
  export function formatOptionalNumber(value: number | null): string {
    return value === null ? '—' : String(value);
  }
import { ErrorCode } from '../../domain/enums/ErrorCode';
import { AppError } from '../../domain/errors/AppError';

const ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  if (!match) {
    throw new AppError(ErrorCode.Unknown, `Could not extract id from url: ${url}`);
  }
  return Number(match[1]);
}

export function buildArtworkUrl(id: number): string {
  return `${ARTWORK_BASE_URL}/${id}.png`;
}
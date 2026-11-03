import { StatName } from '../domain/enums/StatName';

export const statLabels: Record<StatName, string> = {
  [StatName.Hp]: 'PS',
  [StatName.Attack]: 'Ataque',
  [StatName.Defense]: 'Defensa',
  [StatName.SpecialAttack]: 'At. Esp.',
  [StatName.SpecialDefense]: 'Def. Esp.',
  [StatName.Speed]: 'Velocidad',
};

export const MAX_BASE_STAT = 255;
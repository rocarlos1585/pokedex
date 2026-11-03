import { fireEvent, render, screen } from '@testing-library/react-native';
import { PokemonCard } from '../../components/PokemonCard';
import { buildPokemonSummary } from '../fixtures/pokemonModelFixtures';

describe('PokemonCard', () => {
  it('shows the formatted name and number', async () => {
    await render(<PokemonCard pokemon={buildPokemonSummary({ id: 25, name: 'pikachu' })} onPress={jest.fn()} />);

    expect(screen.getByText('Pikachu')).toBeTruthy();
    expect(screen.getByText('#025')).toBeTruthy();
  });

  it('exposes an accessible label for screen readers', async () => {
    await render(<PokemonCard pokemon={buildPokemonSummary({ id: 25, name: 'pikachu' })} onPress={jest.fn()} />);

    expect(screen.getByLabelText('Pikachu, número 25')).toBeTruthy();
  });

  it('calls onPress with the pokemon when pressed', async () => {
    const pokemon = buildPokemonSummary();
    const onPress = jest.fn();
    await render(<PokemonCard pokemon={pokemon} onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledWith(pokemon);
  });
});
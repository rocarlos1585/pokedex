import { fireEvent, render, screen } from '@testing-library/react-native';
import { ErrorView } from '../../components/ErrorView';

describe('ErrorView', () => {
  it('shows the error message', async () => {
    await render(<ErrorView message="No hay conexión" onRetry={jest.fn()} />);

    expect(screen.getByText('No hay conexión')).toBeTruthy();
  });

  it('calls onRetry when the retry button is pressed', async () => {
    const onRetry = jest.fn();
    await render(<ErrorView message="No hay conexión" onRetry={onRetry} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Reintentar' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
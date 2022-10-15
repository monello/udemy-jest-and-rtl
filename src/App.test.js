import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('button has correct initial color', () => {
    render(<App />);

    // find an element with the role of button and the test (a11y-label for buttons) of 'Change to blue'
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    // Possible custom matchers are listed here: https://github.com/testing-library/jest-dom
    // We wan to test the initial background color for the button and expect it to be red
    expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
  });

  test('button turns blue when clicked', () => {
    render(<App />);
    // Seeing as the app has only 1 button atm we could technically leave out the 'name' option, but it's good practice to be more specific
    // const colorButton = screen.getByRole('button');
    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    fireEvent.click(colorButton);
    expect(colorButton).toHaveStyle({ backgroundColor: 'blue' });
    expect(colorButton).toHaveTextContent('Change to red');
  });

  test('initially button is enable and checkbox unchecked', () => {
    render(<App />);

    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    const stateCheckbox = screen.getByRole('checkbox', { name: /disable button/i });

    // check that the button enabled
    expect(colorButton).toBeEnabled();

    // check that the checkbox is unchecked
    expect(stateCheckbox).not.toBeChecked();
  });

  test('button status changes as checkbox is toggled', () => {
    render(<App />);

    const colorButton = screen.getByRole('button', { name: 'Change to blue' });
    const stateCheckbox = screen.getByRole('checkbox', { name: 'Disable Button' });

    fireEvent.click(stateCheckbox);

    // check that the button is disabled
    expect(colorButton).toBeDisabled();

    // check that the checkbox is checked
    expect(stateCheckbox).toBeChecked();

    fireEvent.click(stateCheckbox);

    // check that the button is enabled
    expect(colorButton).toBeEnabled();

    // check that the checkbox is unchecked
    expect(stateCheckbox).not.toBeChecked();

  });

})





import { render, screen } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render('App/>');
  // find an element with the role of button and the test (a11y-label for buttons) of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  // Possible custom matchers are listed here: https://github.com/testing-library/jest-dom
  // We wan to test the initial background color for the button and expect it to be red
  expect(colorButton).toHaveStyle({ backgoundColor: 'red' });
});

test.skip('button turns blue when clicked', () => {

});

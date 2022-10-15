import { render, screen, logRoles } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  // If you don't know what the available roles are that you can query for RTL comes with a handy debugging tool to help you determine the available roles
  // logRoles() - imported from @testing-library/react (in the tutorial it still uses the deprecated import from @testing-library/dom)

  // Destructure the render response into a container object
  const { container } = render(<App />);

  // now take a peek at the available roles on this container
  logRoles(container);

  // find an element with the role of button and the test (a11y-label for buttons) of 'Change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' });
  // Possible custom matchers are listed here: https://github.com/testing-library/jest-dom
  // We wan to test the initial background color for the button and expect it to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' });
});

test.skip('button turns blue when clicked', () => {

});

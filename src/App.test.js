import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // the render() method will render whatever JSX you pass it into a Virtual DOM
  render(<App />);
  // You have access to this Virtual DOM vie the global "screen" object
  // Here we use the debug() method on the screen object to pritn out the Vritual DOM so we can see whet the test sees
  screen.debug();
  // Here the test is using the getByText() method provided by screen, to find an element that contains the given text.
  // Here the text is provided as a REGEX as can be seen by the use of the forward slashes, you could try to just use single quotes
  //    but that is much stricter as it has to be that EXACT text with the exact casing. Regex allows more flexibility.
  // For example the 'i' means do a case-INSENSITIVE match, so this example will match and element with this text (if it was on the page):
  //    "blah BLAH LeArn ReacT foo Bar"
  const linkElement = screen.getByText(/learn react/i);
  // For all tests you need an Assertion: You need to assert (positively affirm) that an expected result is true
  // Read in plain English the following line is: Assert (confirm that) the linkElement (searched for in the previousline) exists in the Virtual DOM, else throw an error
  // In reality the test won't even get to this line if it couldn't find it on the previous line and would already throw an error on line 15
  expect(linkElement).toBeInTheDocument();
});

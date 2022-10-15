import { useState } from 'react';
import './App.css';

export function replaceCamelCaseWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}


function App() {
  const [buttonColor, setButtonColor] = useState('MediumVioletRed');
  const [isDisabled, setIsDisabled] = useState(false);

  const altButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
  const handleClick = () => {
    setButtonColor(altButtonColor);
  };

  const handleCheckboxClick = (e) => {
    setIsDisabled(e.target.checked);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isDisabled}
        style={{
          color: 'white',
          backgroundColor: isDisabled ? 'gray' : buttonColor
        }}>Change to {replaceCamelCaseWithSpaces(altButtonColor)}</button>
      <input
        type='checkbox'
        id="disable-button"
        defaultChecked={isDisabled}
        onClick={handleCheckboxClick}
      />
      <label htmlFor='disable-button'>Disable Button</label>
    </div>
  );
}

export default App;

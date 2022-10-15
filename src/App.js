import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [isDisabled, setIsDisabled] = useState(false);

  const altButtonColor = buttonColor === 'red' ? 'blue' : 'red';
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
        style={{ color: 'white', backgroundColor: buttonColor }}>Change to {altButtonColor}</button>
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

import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const altButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  const handleClick = () => {
    setButtonColor(altButtonColor);
  };

  return (
    <div>
      <button onClick={handleClick} style={{ color: 'white', backgroundColor: buttonColor }}>Change to {altButtonColor}</button>
    </div>
  );
}

export default App;

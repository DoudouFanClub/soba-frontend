// src/App.tsx
import { useState } from 'react';
import TextBox from './components/TextBox';
import Button_Label from './components/Button_Label'
import './App.css';

const AlertOnClick = (userInput: string) => {
  alert('Text box contains: ' + userInput);
};

function App() {
  const [text, setText] = useState('');

  return (
    <div className="App">
      <h1>Local LLM</h1>
      <TextBox
        placeholder="Type something..."
        value={text}
        onChange={(value) => setText(value)}
      />
      <Button_Label label = "Enter" onClick={() => AlertOnClick(text)}/>
      <p>You typed: {text}</p>
    </div>
  );
}

export default App;

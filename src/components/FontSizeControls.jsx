import { useState, useEffect } from 'react';
import '../styles/FontSizeControls.css';

function FontSizeControls() {
  const [fontSize, setFontSize] = useState(17);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const decreaseFont = () => setFontSize(size => Math.max(12, size - 2));
  const increaseFont = () => setFontSize(size => Math.min(32, size + 2));

  return (
    <div className="font-size-controls">
      <button className="font-button" onClick={decreaseFont} aria-label="Decrease font size">A-</button>
      <button className="font-button" onClick={increaseFont} aria-label="Increase font size">A+</button>
    </div>
  );
}

export default FontSizeControls;

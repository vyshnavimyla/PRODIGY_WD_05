import React, { useEffect, useState } from 'react';
import Weather from './components/weather';
import './App.css';
import './index.css';

function App() {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generateClouds = () => {
      const cloudElements = [];
      for (let i = 0; i < 10; i++) {  // Increase number of clouds for more effect
        const top = Math.random() * 80 + 'vh';
        const duration = Math.random() * 10 + 5 + 's'; // Faster animation duration
        cloudElements.push(
          <div
            key={i}
            className="cloud"
            style={{
              top: top,
              animationDuration: duration,
            }}
          ></div>
        );
      }
      setClouds(cloudElements);
    };

    generateClouds();
  }, []);

  const raindrops = Array.from({ length: 50 }, (_, i) => <div key={i} className="raindrop"></div>);

  return (
    <div className="App">
      {clouds}
      {raindrops}
      <Weather />
    </div>
  );
}

export default App;

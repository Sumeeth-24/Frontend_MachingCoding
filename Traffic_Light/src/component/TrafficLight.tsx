import { useEffect, useState } from 'react';

import '../App.css';
import { trafficLightsValue } from '../config';

const TrafficLight = () => {
  const [currentColor, setCurrentColor] = useState('green');

  useEffect(() => {
    const { duration, next } = trafficLightsValue[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div className="trafficContent">
      {Object.keys(trafficLightsValue).map((color) => (
        <div
          key={color}
          className="circle"
          style={{
            backgroundColor: color === currentColor ? color : 'gray',
          }}
        />
      ))}
    </div>
  );
};

export default TrafficLight;


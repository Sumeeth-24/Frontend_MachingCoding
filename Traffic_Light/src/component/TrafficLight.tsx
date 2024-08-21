import { useEffect, useState } from 'react';
import '../App.css';
import { trafficLightsValue } from '../config';

const TrafficLight = () => {
    const [currentColor, setCurrentColor] = useState('green');

    useEffect(() => {
      const {duration, next} = trafficLightsValue[currentColor];

    const id =  setTimeout(() => {
        setCurrentColor(next);
      }, duration);
    
      return () => {
        clearTimeout(id);
      }
    }, [currentColor])
    
  return (
    <div className='trafficContent'>
        {Object.keys(trafficLightsValue).map(ele => (
          <div 
          className="circle" 
          style={{
            backgroundColor: ele === currentColor ? ele : 'gray'
          }}
        ></div>
        
        ))}
    </div>
  )
}

export default TrafficLight
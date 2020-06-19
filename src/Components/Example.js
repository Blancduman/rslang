import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Example = () => {
  const [state, setState] = useState('Hello World');

  useEffect(() => {
    setState('Hello "React" World');
  }, []);

  return (
    <div>
      <h1>{state}</h1>
      <ul>
        <li><Link to="/dictionary">dictionary</Link></li>
        <li><Link to="/speakit">speakit</Link></li>
        <li><Link to="/savannah">savannah</Link></li>
        <li><Link to="/sprint">sprint</Link></li>
        <li><Link to="/english_puzzle">english_puzzle</Link></li>
        <li><Link to="/promo">promo</Link></li>
        <li><Link to="/about">about</Link></li>
      </ul>
    </div>
  );
};

export default Example;

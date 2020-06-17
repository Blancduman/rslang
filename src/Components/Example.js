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
      <Link to="/dictionary">dictionary</Link>
    </div>
  );
};

export default Example;

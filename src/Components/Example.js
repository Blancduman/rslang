import React, { useState, useEffect } from 'react';

const Example = () => {
  const [state, setState] = useState('Hello World');

  useEffect(() => {
    setState('Hello "React" World');
  }, []);

  return <h1>{state}</h1>;
};

export default Example;

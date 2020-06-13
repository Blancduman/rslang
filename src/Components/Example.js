import React, { useState } from 'react';

const Example = () => {
    const [state, setState] = useState('Hello World');

    return <h1>{state}</h1>;
}

export default Example;
import React, { useEffect } from 'react';
import './savanna.css';
import PropTypes from 'prop-types';

const Word = (props) => {
  const { word } = props;
  // const [transform, setTransform] = useState('');
  // const div = useRef();
  // const assignRef = useCallback(node => {
  //   div.current = node;
  //   console.log('assignRef');
  // });
  // useEffect(() => {
  //   setTimeout(() => setTransform(214), 10);
  // }, []);
  // useEffect(() => {
  //   const timerId = setTimeout(() => props.fail(), 3000);
  //   return () => clearTimeout(timerId);
  // });
  return (
    <div
      className="savanna-game-field__question"
      // style={{
      //   transform: `translateY(${transform}px)`,
      //   transition: 'all 3s linear',
      // }}
    >
      <h1>{word}</h1>
    </div>
  );
};
Word.propTypes = {
  word: PropTypes.string.isRequired,
  fail: PropTypes.func.isRequired,
};

export default Word;

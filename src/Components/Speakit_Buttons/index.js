import React from 'react';

const Control = () => (
  <div className="speakit__controll">
    <div tabIndex="0" role="button" title="Restart the game" className="speakit__controll_restart"><span>Restart</span></div>
    <div tabIndex="0" role="button" title="Enable speech recognition" className="speakit__controll_speak"><span>Speak</span></div>
    <div tabIndex="0" role="button" title="Show result" className="speakit__controll_result"><span>Result</span></div>
  </div>
);

export default Control;

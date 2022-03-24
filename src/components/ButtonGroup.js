import React, { useState } from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ buttons, setSelected }) => {
    return (
      <>
        {buttons.map((button, i) => (
          <button 
            className="move"    
            key={i}
            name={button.label} 
            onClick={() => {
                setSelected(i);
            }}
          >
            {button.content}
          </button>
        ))}
      </>
    );
  };  

export default ButtonGroup;
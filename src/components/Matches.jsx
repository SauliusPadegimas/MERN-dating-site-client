import React, { useState } from 'react';

function Matches() {
  const [leftTabOn, setLeftTabOn] = useState(true);
  return (
    <div>
      <div className='matches__tabs'>
        <label
          htmlFor='regForm'
          className='radio-label matches__tabs--left'
          style={leftTabOn ? { zIndex: 1 } : { zIndex: 0 }}
          onClick={() => setLeftTabOn(true)}
        >
          I Liked
        </label>
        <label
          htmlFor='logForm'
          className='radio-label matches__tabs--right'
          style={leftTabOn ? { zIndex: 0 } : { zIndex: 1 }}
          onClick={() => setLeftTabOn(false)}
        >
          Liked Me
        </label>
      </div>
      <div className='radio-content'>
        <input
          type='radio'
          name='formSelector'
          id='regForm'
          className='radio-toggle'
          defaultChecked
        />
        <div className='radio-body matches__body matches__body--left'>KAires turinys</div>
      </div>
      <div className='radio-content'>
        <input type='radio' name='formSelector' id='logForm' className='radio-toggle' />
        <div className='radio-body matches__body matches__body--right'>Desines turinys</div>
      </div>
    </div>
  );
}

export default Matches;

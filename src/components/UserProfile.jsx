import React, { useContext, useRef, useState } from 'react';
import { MainContext } from './MainContext';

function UserProfile() {
  const [seeInput, setSeeInput] = useState(false);
  const { user, socket } = useContext(MainContext);
  const photoRef = useRef();
  return (
    <div>
      {seeInput && (
        <>
          <input type='url' ref={photoRef} />
          <button className='btn btn--transparent'>SAVE</button>
        </>
      )}

      <button className='btn btn--blue' onClick={() => setSeeInput(!seeInput)}>
        ADD PHOTOS
      </button>
    </div>
  );
}

export default UserProfile;

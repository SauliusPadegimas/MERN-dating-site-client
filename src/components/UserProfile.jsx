import React, { useContext, useRef, useState } from 'react';
import GetAge from './DateToAge';
import getSecret from './getSecret';
import { MainContext } from './MainContext';
import PhotoSwiper from './PhotoSwiper';

function UserProfile() {
  const [seeInput, setSeeInput] = useState(false);
  const { user, socket, completeUser } = useContext(MainContext);
  const photoRef = useRef();

  function saveImage() {
    const secret = getSecret();
    socket.emit('addImage', secret, photoRef.current.value);
    photoRef.current.value = '';
  }
  return (
    <div className='profile'>
      <div className='profile__photos'>
        <PhotoSwiper photoArr={user.photos} />
      </div>
      <div className='profile__info'>
        <div className='profile__stats'>
          <h4>Name: {user.username}</h4>
          <h4>City: {user.city}</h4>
          <h4>
            Age: <GetAge dateString={user.date} />
          </h4>
          <h4>Photos: {user.photos.length}</h4>
        </div>
        {!completeUser && (
          <h5 className='profile__disclaimer'>
            You need to have at least 2 photos, to start browsing other users
          </h5>
        )}
        {seeInput && (
          <>
            <input type='url' ref={photoRef} placeholder='Img url: http://...' />
            <button className='btn btn--light' style={{ margin: '1rem 0' }} onClick={saveImage}>
              SAVE
            </button>
          </>
        )}

        <button className='btn btn--blue' onClick={() => setSeeInput(!seeInput)}>
          ADD PHOTOS
        </button>
      </div>
    </div>
  );
}

export default UserProfile;

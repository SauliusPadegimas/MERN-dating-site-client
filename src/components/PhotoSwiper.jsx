import { useEffect, useState } from 'react';
import defaultPhoto from '../images/no-image-found.png';

function PhotoSwiper({ photoArr }) {
  const [index, setIndex] = useState(null);
  function swipeLeft() {
    if (index === photoArr.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  function swipeRight() {
    if (index === 0) {
      setIndex(photoArr.length - 1);
    } else {
      setIndex(index - 1);
    }
  }

  useEffect(() => {
    setIndex(photoArr.length - 1);
  }, [photoArr]);

  return (
    <>
      <div className='arrow arrow--left' onClick={swipeLeft}>
        &#10092;
      </div>
      <img
        src={photoArr.length ? photoArr[index] : defaultPhoto}
        className='profile__image'
        alt='user profile'
      />
      <div className='arrow arrow--right' onClick={swipeRight}>
        &#10093;
      </div>
    </>
  );
}

export default PhotoSwiper;

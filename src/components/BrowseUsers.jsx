import { useContext, useEffect, useState } from 'react';
import GetAge from './DateToAge';
import { MainContext } from './MainContext';
import PhotoSwiper from './PhotoSwiper';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import getSecret from './getSecret';

function BrowseUsers() {
  const { user, users, socket } = useContext(MainContext);
  const [userToShow, setUserToShow] = useState({
    username: '',
    photos: [],
    city: '',
    age: '1900-01-01',
  });
  const [showEfect, setShowEfect] = useState(null);

  function handleLike() {
    setShowEfect('like');
    setTimeout(() => {
      const secret = getSecret();
      socket.emit('like', userToShow._id, secret);
      setShowEfect(null);
    }, 1000);
  }

  function handleDislike(params) {
    setShowEfect('dislike');
    setTimeout(() => {
      const secret = getSecret();
      socket.emit('dislike', userToShow._id, secret);
      setShowEfect(null);
    }, 1000);
  }

  useEffect(() => {
    if (users.length > 0) {
      const usersArr = users.filter((x) => {
        if (user.liked.includes(x._id) || user.disliked.includes(x._id)) {
          return false;
        } else {
          return true;
        }
      });
      if (usersArr.length > 0) {
        setUserToShow(usersArr[usersArr.length - 1]);
      } else {
        setUserToShow({
          username: '',
          photos: [],
          city: '',
          age: '1900-01-01',
        });
      }
    }
  }, [user, users]);

  if (users.lenght < 1) return <h1>Loading</h1>;

  return (
    <div className='profile'>
      {userToShow.username === '' ? (
        'No new users to show'
      ) : (
        <>
          <div className='profile__photos'>
            <PhotoSwiper photoArr={userToShow.photos} />

            <div
              className='effect effect__like'
              style={showEfect === 'like' ? { opacity: '0.7' } : {}}
            >
              <AiFillLike />
            </div>

            <div
              className='effect effect__dislike'
              style={showEfect === 'dislike' ? { opacity: '0.7' } : {}}
            >
              <AiFillDislike />
            </div>
          </div>
          <div className='profile__info'>
            <div className='profile__stats'>
              <h4>Name: {userToShow.username}</h4>
              <h4>City: {userToShow.city}</h4>
              <h4>
                Age: <GetAge dateString={userToShow.date} />
              </h4>
              <h4>Photos: {userToShow.photos.length}</h4>
            </div>
            <div className='like'>
              <AiFillLike className='like__icon' onClick={handleLike} />
              <AiFillDislike className='like__icon' onClick={handleDislike} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BrowseUsers;

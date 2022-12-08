import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from './MainContext';
import { BsEnvelope } from 'react-icons/bs';
import PhotoSwiper from './PhotoSwiper';

function Matches() {
  const [leftTabOn, setLeftTabOn] = useState(true);
  const { user, socket, users } = useContext(MainContext);
  const [likedArr, setLikedArr] = useState([]);
  const [likedByArr, setLikedByArr] = useState([]);

  useEffect(() => {
    const liked = users.filter((x) => user.liked.includes(x._id));
    const likedby = users.filter((x) => user.likedBy.includes(x._id));
    setLikedArr(liked);
    console.log('liked ===', liked);
    setLikedByArr(likedby);
    console.log('likedby ===', likedby);
  }, [user, users]);

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
        <div className='radio-body'>
          <div className=' matches__body matches__body--left'>
            {!!likedArr.length
              ? likedArr.map((x) => (
                  <div key={x.secret} className='matches__photo'>
                    <PhotoSwiper photoArr={x.photos} />
                    <div className='matches__info'>
                      <h4>{x.username}</h4>
                      {user.likedBy.includes(x._id) && (
                        <>
                          <h4>MATCH!</h4> <BsEnvelope />
                        </>
                      )}
                    </div>
                  </div>
                ))
              : "You don't like no-one, you choosy prick"}
          </div>
        </div>
      </div>
      <div className='radio-content'>
        <input type='radio' name='formSelector' id='logForm' className='radio-toggle' />
        <div className='radio-body'>
          <div className='matches__body matches__body--right'>
            {!!likedByArr.length
              ? likedByArr.map((x) => (
                  <div key={x.secret} className='matches__photo'>
                    <PhotoSwiper photoArr={x.photos} />
                    <h4 className='matches__info'>{x.username}</h4>
                  </div>
                ))
              : 'Nobody likes you :('}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;

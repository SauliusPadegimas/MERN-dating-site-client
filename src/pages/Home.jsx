import React, { useContext, useEffect } from 'react';
import { MainContext } from '../components/MainContext';
import { useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5';
import {
  BsFillPersonFill,
  BsFilter,
  BsFillPeopleFill,
  BsFillEmojiHeartEyesFill,
} from 'react-icons/bs';
import UserProfile from '../components/UserProfile';

function Home() {
  const { user, setUser } = useContext(MainContext);

  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    nav('/login');
  }

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    if (!data.error) {
      console.log('resp from server ===', data);
      setUser(data.user);
    } else {
      console.log('resp from server ===', data);
      nav('/login');
    }
  }

  useEffect(() => {
    const secret = localStorage.getItem('secret');
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
  }, []);

  return (
    <div className='home-page'>
      <header className='home-header'>
        <div className='home-header__left'></div>
        <div className='home-header__text'>Hello, {user.username}</div>
        <div className='home-header__logout'>
          <div className='btn btn--transparent' onClick={logoutUser}>
            <IoExitOutline className='icon icon--logout' style={{ marginRight: '1rem' }} /> logout
          </div>
        </div>
      </header>
      <div className='hero'>
        <div className='hero__tab'>
          <input type='checkbox' id='profile' className='checkbox-hack__input' />
          <label htmlFor='profile' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFillPersonFill style={{ marginRight: '1rem' }} /> User Profile
            </div>
          </label>
          <div className='checkbox-hack__body'>
            <UserProfile />
          </div>
        </div>
        <div className='hero__tab'>
          <input type='checkbox' id='filter' className='checkbox-hack__input' />
          <label htmlFor='filter' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFilter style={{ marginRight: '1rem' }} /> Users Filter
            </div>
          </label>
          <div className='checkbox-hack__body'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, unde facere odio aut,
            explicabo dolor in libero non assumenda consectetur aspernatur animi eos soluta corporis
            veniam, est tempore. Nostrum et accusantium facere perspiciatis inventore dolore saepe,
            laudantium soluta non amet! Delectus in fugit earum. Doloremque reprehenderit vero
            voluptatum modi rerum.
          </div>
        </div>
        <div className='hero__tab'>
          <input type='checkbox' id='likes' className='checkbox-hack__input' />
          <label htmlFor='likes' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFillPeopleFill style={{ marginRight: '1rem' }} /> Browse Users
            </div>
          </label>
          <div className='checkbox-hack__body'>CONTENT OF LIKE DISLIKE</div>
        </div>
        <div className='hero__tab'>
          <input type='checkbox' id='history' className='checkbox-hack__input' />
          <label htmlFor='history' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFillEmojiHeartEyesFill style={{ marginRight: '1rem' }} /> Matched Users
            </div>
          </label>
          <div className='checkbox-hack__body'>CONTENT OF HISTORY</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
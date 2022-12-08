import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../components/MainContext';
import { useNavigate } from 'react-router-dom';
import { IoExitOutline } from 'react-icons/io5';
import { MdNewReleases } from 'react-icons/md';
import {
  BsFillPersonFill,
  BsFilter,
  BsFillPeopleFill,
  BsFillEmojiHeartEyesFill,
} from 'react-icons/bs';
import UserProfile from '../components/UserProfile';
import BrowseUsers from '../components/BrowseUsers';
import Loading from '../components/Loading';
import getSecret from '../components/getSecret';
import Matches from '../components/Matches';
import Filter from '../components/Filter';

function Home() {
  const { user, setUser, completeUser, socket, newLike } = useContext(MainContext);
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();

  function logoutUser() {
    localStorage.removeItem('secret');
    sessionStorage.removeItem('secret');
    window.location.reload(false);
  }

  async function fetchUser(secret) {
    const resp = await fetch(`http://localhost:4000/api/users/${secret}`);
    const data = await resp.json();
    if (!data.error) {
      console.log('resp from server ===', data);
      setUser(data.user);
      setLoading(false);
      socket.emit('join', secret);
    } else {
      console.log('resp from server ===', data);
      nav('/login');
    }
  }

  useEffect(() => {
    const secret = getSecret();
    if (!secret) {
      return nav('/login');
    }
    fetchUser(secret);
  }, []);

  if (loading) return <Loading />;

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
          <input type='checkbox' id='profile' className='checkbox-hack__input' defaultChecked />
          <label htmlFor='profile' className='hero__label checkbox-hack__label'>
            <div className='center-V'>
              <BsFillPersonFill style={{ marginRight: '1rem' }} /> User Profile
            </div>
          </label>
          <div className='checkbox-hack__body'>
            <UserProfile />
          </div>
        </div>
        {completeUser && (
          <>
            <div className='hero__tab'>
              <input type='checkbox' id='filter' className='checkbox-hack__input' />
              <label htmlFor='filter' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFilter style={{ marginRight: '1rem' }} /> Users Filter
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <Filter />
              </div>
            </div>
            <div className='hero__tab'>
              <input type='checkbox' id='likes' className='checkbox-hack__input' />
              <label htmlFor='likes' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFillPeopleFill style={{ marginRight: '1rem' }} /> Browse Users
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <BrowseUsers />
              </div>
            </div>
            <div className='hero__tab'>
              <input type='checkbox' id='history' className='checkbox-hack__input' />
              <label htmlFor='history' className='hero__label checkbox-hack__label'>
                <div className='center-V'>
                  <BsFillEmojiHeartEyesFill style={{ marginRight: '1rem' }} /> Matched Users
                  {newLike && <MdNewReleases style={{ color: 'red', marginLeft: '1rem' }} />}
                </div>
              </label>
              <div className='checkbox-hack__body'>
                <Matches />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MainContext } from './components/MainContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Unauthorized from './pages/Unauthorized';
import getSecret from './components/getSecret';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState({ username: null, photos: [] });
  const [users, setUsers] = useState([]);
  const [completeUser, setCompleteUser] = useState(false);
  const [room, setRoom] = useState('');
  const states = {
    socket,
    user,
    setUser,
    users,
    setUsers,
    room,
    setRoom,
    completeUser,
    setCompleteUser,
  };

  const nav = useNavigate();

  useEffect(() => {
    if (user.photos.length > 1) {
      setCompleteUser(true);
    }
    socket.emit('users');
  }, [user]);

  useEffect(() => {
    socket.on('unauthorized', () => {
      nav('/unauthorized');
    });

    socket.on('user', (user) => {
      setUser(user);
    });

    socket.on('users', (data) => {
      const secret = getSecret();
      const usersArr = data.filter((x) => x.secret !== secret);
      setUsers(usersArr);
    });
  }, []);

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/unauthorized' element={<Unauthorized />} />
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;

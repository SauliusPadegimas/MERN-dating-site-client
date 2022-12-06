import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MainContext } from './components/MainContext';
import Login from './pages/Login';
import Home from './pages/Home';

const socket = io.connect('http://localhost:4000');

function App() {
  const [user, setUser] = useState({ username: null, photos: [] });
  const [completeUser, setCompleteUser] = useState(false);
  const [room, setRoom] = useState('');
  const states = {
    socket,
    user,
    setUser,
    room,
    setRoom,
  };

  useEffect(() => {
    if (user.photos.length > 1) {
      setCompleteUser(true);
    }
  }, [user]);

  return (
    <MainContext.Provider value={states}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route exact path='/' element={<Home />} />
        {/* 👇️ veikia tik, jeigu kitu route'ai nesutampa */}
        <Route path='*' element={<h1>Oops. 404 - page not found</h1>} />
      </Routes>
    </MainContext.Provider>
  );
}

export default App;

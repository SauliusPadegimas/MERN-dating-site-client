import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { MainContext } from './components/MainContext';
import Login from './pages/Login';
import Dating from './pages/Dating';

function App() {
  return (
    <div className='App'>
      <Login />
    </div>
  );
}

export default App;

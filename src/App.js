import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <header className="header">
        <h1 className="h-12 text-3xl">J-Words</h1>
      </header>
      <div className="app">
        <Outlet />
      </div>
    </>
  );
}

export default App;

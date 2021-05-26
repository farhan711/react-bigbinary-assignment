/* eslint-disable react/react-in-jsx-scope */
import logo from './logo.svg';
import './App.css';
import React from 'react';

import PageHeader from '../src/components/PageHeader/Header';

function App() {
  return (
    <div className="App">
      <div className="Header">
        <PageHeader />
      </div>
    </div>
  );
}

export default App;

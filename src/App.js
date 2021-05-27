/* eslint-disable react/react-in-jsx-scope */
import logo from './logo.svg';
import './App.scss';
import React from 'react';

import PageHeader from '../src/components/PageHeader/Header';
import TableComponent from '../src/components/PageTable/PageTable';

function App() {
  const array = [
    {
      key: 1,
      flight_number: 201,
      launch_date_utc: '2020-10-06T11:29:00.000Z',
      mission_name: 'Start',
      upcoming: 'success',
      rocket: { second_stage: { payloads: [{ orbit: 'dasdsad' }] }, rocket_name: 'Falcon 9' },
    },
    {
      key: 2,
      flight_number: 201,
      launch_date_utc: '2020-10-06T11:29:00.000Z',
      mission_name: 'Start',
      upcoming: 'success',
      rocket: { second_stage: { payloads: [{ orbit: 'dasdsad' }] }, rocket_name: 'Falcon 9' },
    },
  ];
  const titles = ['No', 'Launched', 'Mission', 'Orbit', 'Launch Status', 'Rocket'];

  return (
    <div className="app">
      <div className="Header">
        <PageHeader />
      </div>
      <div>
        <TableComponent data={array} titles={titles} />
      </div>
    </div>
  );
}

export default App;

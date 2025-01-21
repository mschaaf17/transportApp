 import React, {useState} from 'react';
 import ReactDOM from 'react-dom';

import {TransportForm} from '../components/form'

function Home() {
  return (
    <div className="header-container">
    <h1 className="main-title">B&C Logistics</h1>
    <div className="slogan">We are ready to transport.</div>
    <p className="message-user">Fill out the information below and someone will reach out shortly.</p>
    <TransportForm />
  </div>
  
  );
}

export default Home;

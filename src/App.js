import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../../my-react-app/src/pages/Home'
import './App.css';


function App() {
  return (
    <Router>
    {/* <Header /> */}
    <Routes>
      <Route path ="/" element = {<Home/>} />
      {/* <Route path="*" element={<NoMatch />} />
      <Route path="/Loading" element={<LoadingPage/>} /> */}
    </Routes>
    {/* <Footer /> */}
  </Router>
  );
}

export default App;

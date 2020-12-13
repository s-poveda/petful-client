import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import Header from '../Components/Header/Header';

function Root() {
  return (
    <div>
			<Route path='/' component={Header} />
      <Route exact path='/' component={LandingPage} />
    </div>
  );
}

export default Root;

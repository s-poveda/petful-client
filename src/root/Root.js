import React from 'react';
import { Route } from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import AdoptionPage from '../Components/AdoptionPage/AdoptionPage';
import Header from '../Components/Header/Header';

function Root() {
  return (
    <div className=''>
			<Route path='/' component={Header} />
      <Route exact path='/' component={LandingPage} />
			<Route path="/adopt" component={AdoptionPage}/>
    </div>
  );
}

export default Root;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './landingpage.css';

export default class LandingPage extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    if (this.state.loading) return (
      <main className='ui center aligned container grid'>
        <div className='ui active trasition visible inverted dimmer twelve wide column' style={{height: '300px'}}>
          <div className='ui huge inverted loader'></div>
        </div>
      </main>
      );
    return (
      <main className='ui container grid'>
        <h2 className='ui container center aligned sixteen wide column'>
          Adopt Your Dream Pet!
        </h2>
        {/*Carrousel here maybe*/}
        <div className='ui container center aligned sixteen wide column'>
          <h3 className=''>Not Sure How it Works? It{"'"}s Simple!</h3>
          <ol>
            <li>Submit your name to be put on the queue</li>
            <li>Read the details on the available pets</li>
            <li>Adopt!</li>
          </ol>
        </div>
        <div className=' ui container center aligned sixteen wide column'>
          <h3 className=''>Ready to Adopt?</h3>
          <p>
            Reserve your place in line <Link to='/adopt'>here</Link>
          </p>
        </div>
      </main>
    );
  }
}

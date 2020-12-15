import React, { Component } from 'react';
import petsService from '../../Services/petsService';
import './adoptionpage.css';

export default class AdoptionPage extends Component {
  state = {
    loading: true,
		pets: {},
  };

	petTypes = ['dog', 'cat'];

  async componentDidMount() {
		const pets = await petsService.get();
    this.setState({
      loading: false,
			pets,
    });
  }

	renderPetCards() {
		return this.petTypes.map( (type, i) =>
			<article
			key={i}
			id={`${type}-card`}
			className={`ui card ${i === 0? 'left' : 'right'} floated seven wide column`}>
				<img src={this.state.pets[type].imageURL} alt={type} className='image'/>
				<div className='content'>

				</div>
			</article>
		);
	}

  render() {
    if (this.state.loading) return (
      <main className='ui center aligned container grid'>
        <div
        className='ui active trasition visible inverted dimmer twelve wide column'
        style={{ height: '300px' }}>
          <div className='ui huge inverted loader'/>
        </div>
      </main>
    );

    return (
      <main id='adoption-page-main' className='ui grid container'>
        <div className='ui segment row center aligned container'>
          <h2 className='ui header sixteen wide column'>Next Pets in Line: </h2>
					{this.renderPetCards()}
        </div>
      </main>
    );
  }
}

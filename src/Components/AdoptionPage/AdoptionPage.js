import React, { Component } from 'react';
import petsService from '../../Services/petsService';
import peopleService from '../../Services/peopleService';
import PopUp from '../Utils/PopUp/PopUp';
import userStorage from '../../Services/userStorage';
import './adoptionpage.css';

export default class AdoptionPage extends Component {
	#popUpTimer;
	#popUpTiming = () => {
		setTimeout( () => {
			this.setState({
				lastAdopted: '',
			});
		}, 4 * 1000);
	};

  #timer;
  #dropPerson = () => {
    const people = [...this.state.people];
		people.shift();
    this.setState({ people, canAdopt: false });
    if (people[0] === userStorage.getItem('name')) {
      this.setState({ canAdopt: true });
      userStorage.deleteItem('name');
      clearInterval(this.#timer);
    }
		if (people.length == 0) {
				clearInterval(this.#timer);
		}
  };

  state = {
    canAdopt: false,
		lastAdopted: '',
    loading: true,
    pets: {},
    name: {
      value: '',
      touched: false,
    },
    error: null,
  };

  petTypes = ['dog', 'cat'];

  updateName = e => {
    this.setState({
      name: {
        value: e.target.value,
        touched: true,
      },
    });
  };

  onAdoptClick = async type => {
    try {
			const adopted = this.state.pets[type].name;
      await petsService.del(type);
      const pets = await petsService.get();
			const [ _ , ...people] = [...this.state.people]
      this.setState({
        pets,
				people,
				canAdopt: false,
				lastAdopted: adopted,
      });
			this.#popUpTiming();
    } catch (error) {
			console.log(error);
      this.setState({ error });
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    try {
      const { name } = await peopleService.post(e.target.name.value);
      this.setState({
        name: {
          value: '',
          touched: false,
        },
        people: [...this.state.people, name],
      });
      userStorage.setItem('name', name);
      this.#timer = setInterval(() => this.#dropPerson(), 1000);
    } catch (error) {
      this.setState({ error });
    }
  };

  async componentDidMount() {
    const [pets, people] = await Promise.all([
      petsService.get(),
      peopleService.get(),
    ]);
    this.setState({
      loading: false,
      pets,
      people,
    });
  }

	renderAdoptedMessagePopUp() {
		if (this.state.lastAdopted) return (
			<PopUp>
				<aside className='ui green huge label'>
				{`You adopted ${this.state.lastAdopted}`}
				</aside>
			</PopUp>
		);
	}

  renderPetCards() {
    return this.petTypes.map((type, i) => {
      const pet = this.state.pets[type];
      return (
        <section
          key={i}
          id={`${type}-card`}
          className={`${type} ui centered card`}>
          <img src={pet.imageURL} alt={type} className='image' />
          <section className='content'>
            <h3 className='header'>{pet.name}</h3>
            <aside className='meta'>
              {`${pet.breed} ${pet.gender}, ${pet.age}`}
            </aside>
            <p className='description'>{pet.description}</p>
          </section>
          <section className='extra content'>{pet.story}</section>
          {this.state.canAdopt && (
            <button
              className='ui button'
              onClick={() => this.onAdoptClick(type)}>
              Adopt me
            </button>
          )}
        </section>
      );
    });
  }

  renderPeopleInLine() {
    return (
      <article className='ui segment'>
        <h2 className='ui huge header'>Next People in Line:</h2>
        <ul className='ui huge divided middle aligned list'>
          {this.state.people.map((name, i) => (
            <li key={i} className='item'>
              {name}
            </li>
          ))}
        </ul>
      </article>
    );
  }

  renderForm() {
    if (!this.state.canAdopt && !userStorage.getItem('name'))
      return (
        <form className='ui large form' onSubmit={this.onSubmit}>
          <h3>Submit your name to get in line</h3>
          <div className='required inline field'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              id='name-input'
              className='ui input'
              value={this.state.name.value}
              onChange={this.updateName}
            />
          </div>
          <button
            className={`ui button ${!this.state.name.value || !this.state.name.touched? 'disabled' : ''}`}>
            Submit
          </button>
        </form>
      );
  }
  render() {
    if (this.state.loading)
      return (
        <main className='ui center aligned'>
          <div className='ui active trasition visible inverted dimmer seven wide column'>
            <div className='ui huge inverted loader' />
          </div>
        </main>
      );

    return (
      <main id='adoption-page-main' className='ui center aligned container'>
        <article className='ui segment center aligned' id='next-in-line'>
          <h2 className='ui header'>Next Pets in Line:</h2>
          <div className='ui centered cards' id='next-in-line-cards'>
            {this.renderPetCards()}
          </div>
        </article>
        {this.renderPeopleInLine()}
        {this.renderForm()}
				{this.renderAdoptedMessagePopUp()}
      </main>
    );
  }
}

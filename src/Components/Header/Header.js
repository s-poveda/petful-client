import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header(props){
    return (
			<header className='ui grid container'>
			<div className='row'>
        <Link to='/' className='ui huge header left floated six wide column'>Petful</Link>
				{
					props.location.pathname === '/' &&
					<Link to='/adopt' className='ui button right floated three wide column'>Adopt a Pet</Link>
				}
			</div>
			</header>
    );
};

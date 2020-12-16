import React from 'react';
import './popup.css';

export default function PopUp(props) {
    return (
      <aside className='PopUp'>
				{props.children}
			</aside>
    );
};

import React from 'react';
import ReactDOM from 'react-dom';
import AdoptionPage from './AdoptionPage';

describe('AdoptionPage', function () {

	it('renders without crashing', () => {
			const div = document.createElement('div');
			ReactDOM.render(<AdoptionPage />, div);
			ReactDOM.unmountComponentAtNode(div);
	});
});

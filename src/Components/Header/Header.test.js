import React from 'react';
import Header from './Header';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
describe('Header', function () {

	it('renders without crashing', () => {
			const history = createMemoryHistory({ initialEntries: ['/adfs']});
			render(<Router history={history}>
				<Header location={{pathname: '/'}} />
				</Router>
			);
	});
});

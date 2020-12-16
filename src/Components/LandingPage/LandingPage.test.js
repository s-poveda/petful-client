import React from 'react';
import LandingPage from './LandingPage';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
describe('LandingPage', function () {

	it('renders without crashing', () => {
			render(<Router history={ createMemoryHistory({ initialEntries: ['/adoption']}) }>
				<LandingPage />
				</Router>
			);
	});
});

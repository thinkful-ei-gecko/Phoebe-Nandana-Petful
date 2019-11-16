import React from 'react';
import { Link } from 'react-router-dom';
import './HomeMain.css'

export default function HomeMain () {
	return (
		<div className='HomeMain__div'>
			<body>
				<h2>Your Local Adoption Shelter</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur.
				</p>
				<div className='LinkContainer'>
					<Link to='/signup'>
						<span className='overlay'>
							<div className='HomeMain__div photoLink cat'>
								<h3>Adopt a Cat</h3>
							</div>
						</span>
					</Link>{' '}
					<Link to='/signup'>
						<span className='overlay'>
							<div className='HomeMain__div photoLink dog'>
							<h3>Adopt a Dog</h3>
						</div>
						</span>
					</Link>
				</div>
			</body>
		</div>
	);
};
import React from "react";
import { Link } from "react-router-dom";
import "./HomeMain.css";

export default function HomeMain() {
	return (
		<div className='HomeMain__div'>
			<h2>Your Local Adoption Shelter</h2>
			<p>
				At FIDO & FIFO, we believe that all pets deserve to find a forever home.
				We hope you will look into your heart and find space for a new family
				member! Click on the links below to get started.
			</p>
			<h3>The Adoption Process</h3>
			<p>
				To ensure that all of our cats and dogs find their forever family, we
				implement a FIFO (first-in, first-out) policy for your future Fido. This
				means that the pet that is first in line has also been with us for the
				longest. Be aware that we (thankfully) often have a queue of others
				waiting to adopt. If you join the queue, the others that have joined
				before you will take the available pet home, and when it's your turn,
				the available cat or dog will be yours!{" "}
			</p>
			<div className='LinkContainer'>
				<Link to='/signup'>
					<div className='HomeMain__div photoLink cat'>
						<h3>Adopt a Cat</h3>
					</div>
				</Link>{" "}
				<Link to='/signup'>
					<div className='HomeMain__div photoLink dog'>
						<h3>Adopt a Dog</h3>
					</div>
				</Link>
			</div>
		</div>
	);
}

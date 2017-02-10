import React from 'react';
import Styles from '../styles/PlaceStyles';

// const Place = ({ name, rating }) => {
// 	return (
// 		<div className="c-place">
// 			<div className="c-place__name">{ name }</div>
// 			<div className="c-place__rating">{ rating }</div>
// 		</div>
// 	)
// };

const Place = ({ places } ) => {
	console.log('The places recieved: ', places);
	return (
		<div>
			{places.map((place, index) => {
				console.log('Iterating: ', place, 'and ', index);
				return (
					<div className="c-place" style={Styles.place} key={index}>
						<div className="c-place__title">{place.name}</div>
						<div className="c-place__rating">{place.rating}</div>
					</div>
				)
			})}
		</div>
	)
}

export default Place;
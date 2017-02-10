import React from 'react';
import Styles from '../styles/PlaceStyles';

const Place = ({ places } ) => {
	// return (
	// 	<div>
	// 		{places.map((place, index) => {
	// 			return (
	// 				<div className="c-place" style={Styles.place} key={index}>
	// 					<div className="c-place__title">{place.name}</div>
	// 					<div className="c-place__rating">{place.rating}</div>
	// 				</div>
	// 			)
	// 		})}
	// 	</div>
	// )
	return (
		<div className="c-place__container" style={Styles.placeContainer}>
			{places.map((place, index) => {
				return (
					<div className="card" style={Styles.place} key={index}>
						<div className="card-content">
							<article className="media">
								<figure className="media-left">
									<p className="image is-64x64">
										<img src="https://phorcys-static.ewg.org/food/food_database_stylesheet/dd-9a8885c396c3063f55835e95fa6d7076.jpg" alt=""/>
									</p>
								</figure>
								<div className="media-content">
									<div className="content">
										<p className="c-place__title title is-4">{place.name}</p>
										<p className="c-place__rating subtitle-is-6">{place.rating}</p>
									</div>
								</div>
							</article>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Place;
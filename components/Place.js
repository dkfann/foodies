import React from 'react';
import Styles from '../styles/PlaceStyles';

const Place = ({ places, handleEditPlace, handleDeletePlace } ) => {
	return (
		<div className="c-place__container" style={Styles.placeContainer}>
			{places.map((place, index) => {
				const ratingValue = (place.rating/5)*100;
				return (
					<div className="card" style={Styles.place} key={index}>
						<div className="card-content" style={Styles.flexFullColumn}>
							<article className="media">
								<figure className="media-left">
									<p className="image is-64x64">
										<img src="https://phorcys-static.ewg.org/food/food_database_stylesheet/dd-9a8885c396c3063f55835e95fa6d7076.jpg" alt=""/>
									</p>
								</figure>
								<div className="media-content" style={Styles.flexAutoColumn}>
									<div className="content" style={Styles.flexAutoRowColumn}>
										<p className="c-place__title title is-4" style={Styles.noBottomMargin}>{place.name}</p>
										<p className="c-place__category is-4" style={Styles.noBottomMargin}>{place.category}</p>
										<p className="c-place__rating subtitle-is-6" style={Styles.noBottomMargin}>{place.rating}</p>
										<progress className="progress is-primary is-small c-place__rating-line" style={Styles.placeRatingLine} value={ratingValue} max="100"></progress>
									</div>
								</div>
							</article>
						</div>
						<div className="c-buttons control" style={Styles.placeButtons}>
							<button className="button is-primary" onClick={handleEditPlace}>Edit Place</button>
							<button className="button is-warning" onClick={() => { handleDeletePlace(index) }}>Delete Place</button>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Place;
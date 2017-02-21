import React from 'react';
import City from './City';

const Base = (props) => {
	const {
		cities, 
		triggerReload, 
		updateCurrentLocationIndex,
	} = props;
	const cityList = cities.map((cityName, index) => {
		return (
			<City 
				cityName={cityName} 
				key={index} 
				index={index}
				triggerReload={triggerReload}
				updateCurrentLocationIndex={ updateCurrentLocationIndex }
			/>
		)
	});
	return (
		<div className="c-base-container">
			<div className="c-base__choose-city">
				<div className="c-base__choose-city__title">
					Choose a City
				</div>

				<div className="c-base__city-list columns">
					{cityList}
				</div>
			</div>
		</div>
	)
};

export default Base;
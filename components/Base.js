import React from 'react';
import City from './City';

const Base = ({ cities, triggerReload, triggerBaseReload }) => {
	const cityList = cities.map((cityName, index) => {
		return (
			<City 
				cityName={cityName} 
				key={index} 
				triggerReload={triggerReload}
				triggerBaseReload={triggerBaseReload}
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
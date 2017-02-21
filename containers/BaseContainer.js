import React from 'react';
import ReactDOM from 'react-dom';
import Match from 'react-router';
import Rebase from 're-base';
import Base from '../components/Base';
import PlaceContainer from './PlaceContainer';
import AddEntryContainer from './AddEntryContainer';

const rebase = Rebase.createClass({
	apiKey: "AIzaSyDy3OhEau5-KKAKqgjpWK_QWydYVYly0gY",
	authDomain: "foodies-6a657.firebaseapp.com",
	databaseURL: "https://foodies-6a657.firebaseio.com",
	storageBucket: "foodies-6a657.appspot.com",
	messagingSenderId: "657964196568"
});

class BaseContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cities: [],
			display: this.props.params.location,
			location: [],
			isLoading: true,
			places: [],
			allData: [],
			allLocations: [],
			selectedCity: [],
			modalAction: null,
			currentLocationIndex: '',
		};

		this.updatePlacesWithLocation = this.updatePlacesWithLocation.bind(this);
		this.addPlaceToLocation = this.addPlaceToLocation.bind(this);
		this.findCurrentCityLocationData = this.findCurrentCityLocationData.bind(this);
		this.deletePlaceFromLocation = this.deletePlaceFromLocation.bind(this);

		this.getCityListFromAllLocationData = this.getCityListFromAllLocationData.bind(this);
		this.getPlacesFromCityIndex = this.getPlacesFromCityIndex.bind(this);
		this.updateCurrentLocationIndex = this.updateCurrentLocationIndex.bind(this);
		this.getCityDataByCityName = this.getCityDataByCityName.bind(this);
		this.updatePlacesWithLocation = this.updatePlacesWithLocation.bind(this);
	}
	componentWillMount() {
		// // First grab the current locations data and populate the allLocations state.
		// rebase.fetch('locations', {
		// 	context: this,
		// 	asArray: true,
		// 	then(data) {
		// 		const cities = data.map(location => {
		// 			return location.city;
		// 		});
		// 		this.setState({
		// 			allLocations: data,
		// 			cities,
		// 			isLoading: false,
		// 		});

		// 		this.updatePlacesWithLocation();
		// 	}
		// });
		
		// // Syncs the allLocations state to the locations endpoint of the Firebase db
		// rebase.syncState('locations', {
		// 	context: this,
		// 	state: 'allLocations',
		// 	asArray: true,
		// 	then(data) {
		// 	}
		// });
	}
	componentDidUpdate(props, state) {

	}
	componentWillReceiveProps(newProps) {
		if (!newProps.isLoading) {
			// We're not loading anymore - we've gotten the updated data from Firebase
			const city = this.getCityDataByCityName(this.props.routeParams.location);
			const places = city[0].places;

			this.setState({
				places
			}, () => {
				console.log('Finished calling set state');
				console.log('The updated state: ', this.state);
			});
		}
	}
	getCityListFromAllLocationData() {
		// Gets the location data from the Main container's get function,
		// then maps the city name to an array to return.
		const allLocations = this.props.getAllLocationData();
		const cities = allLocations.map(location => location.city);

		return cities;
	}
	getCityDataByCityName(cityName) {
		const allLocations = this.props.getAllLocationData();
		const selectedCity = allLocations.filter(city => city.city === cityName);

		return selectedCity;
	}
	getPlacesFromCityIndex(cityIndex) {
		// Gets the places from the city that matches the city index that's passed in
		const allLocations = this.props.getAllLocationData();
		const selectedCity = allLocations.filter(location => location.key === cityIndex.toString());
		
		return selectedCity[0].places;
	}
	updateCurrentLocationIndex(locationIndex) {
		this.setState({
			currentLocationIndex: locationIndex,
		},() => {
			this.updateDisplayWithNewPlaces();
		});
	}
	updatePlacesWithLocation() {
		if (!this.state.display) return;
		const city = this.state.allLocations.filter(location => {
			return location.city === this.state.display;
		});

		const cityPlaces = city[0].places;

		this.setState({
			places: cityPlaces,
		});
	}
	findCurrentCityLocationData() {
		const currentLocation = this.state.display;
		const currentLocationData = this.state.allLocations.filter(location => {
			return location.city === currentLocation;
		});
		return currentLocationData[0];
	}
	updateDisplayWithNewPlaces() {
		// This is run after updating the city index.
		// Get the data based on the current city index and update the places state.
		const places = this.getPlacesFromCityIndex(this.state.currentLocationIndex);

		this.setState({
			places
		});

		// const city = this.state.allLocations.filter(location => {
		// 	return location.city === name;
		// });
		// let cityPlaces = city[0].places;

		// this.setState({
		// 	places: cityPlaces,
		// });
	}
	addPlaceToLocation(placeData) {
		const currentLocationData = this.findCurrentCityLocationData();
		event.preventDefault();
		event.stopPropagation();
		
		let updatedLocationData = this.state.allLocations;
		let updatedPlaceData = this.state.allLocations[parseInt(currentLocationData.key)].places;
		updatedPlaceData = updatedPlaceData.concat([{
			name: placeData.placeName,
			rating: placeData.placeRating,
		}]);
		updatedLocationData[parseInt(currentLocationData.key)].places = updatedPlaceData;
		
		this.setState({
			allLocations: updatedLocationData,
		});

		this.triggerBaseReload(this.state.display);
	}
	deletePlaceFromLocation() {
		console.log('Going to delete a place.');
	}
	getPlaceFromIndex(indexData) {
		// We need the index of the location and the place to find the data.

	}
	render() {
		// The main container will send down a variable to indicate if it's loading the location data
		// Render this component based on that variable.
		if (this.props.isLoading) {
			return (
				<div>LOADING!</div>
			)
		}
		else {
			const cities = this.getCityListFromAllLocationData();
			return (
				<div>
					<Base 
						cities={cities}
						triggerReload={this.props.triggerReload}
						updateCurrentLocationIndex={ this.updateCurrentLocationIndex }
					/>
					<PlaceContainer
						places={ this.state.places }
						triggerModalState={ this.props.triggerModalState }
						triggerDeletePlace={ this.deletePlaceFromLocation }
						updatePlaceState={ this.props.updatePlaceState }
					/>
					<AddEntryContainer
						addPlaceToLocation={ this.addPlaceToLocation }/>
				</div>
			)
		}
	}
}

export default BaseContainer;
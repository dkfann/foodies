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
			selectedCity: []
		};

		this.triggerBaseReload = this.triggerBaseReload.bind(this);
		this.updatePlacesWithLocation = this.updatePlacesWithLocation.bind(this);
		this.addPlaceToLocation = this.addPlaceToLocation.bind(this);
		this.findCurrentCityLocationData = this.findCurrentCityLocationData.bind(this);
		this.deletePlaceFromLocation = this.deletePlaceFromLocation.bind(this);
	}
	componentWillMount() {
		// First grab the current locations data and populate the allLocations state.
		rebase.fetch('locations', {
			context: this,
			asArray: true,
			then(data) {
				const cities = data.map(location => {
					return location.city;
				});
				this.setState({
					allLocations: data,
					cities,
					isLoading: false,
				});

				this.updatePlacesWithLocation();
			}
		});
		
		// Syncs the allLocations state to the locations endpoint of the Firebase db
		rebase.syncState('locations', {
			context: this,
			state: 'allLocations',
			asArray: true,
			then(data) {
			}
		});
	}
	updatePlacesWithLocation() {
		console.log(this.state.display);
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
	triggerBaseReload(name) {
		const city = this.state.allLocations.filter(location => {
			return location.city === name;
		});
		let cityPlaces = city[0].places;

		this.setState({
			places: cityPlaces,
		});
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
	render() {
		if (this.state.isLoading) {
			return (
				<div>LOADING!</div>
			)
		}
		else {
			return (
				<div>
					<Base 
						cities={this.state.cities}
						triggerReload={this.props.triggerReload}
						triggerBaseReload={this.triggerBaseReload}
					/>
					<PlaceContainer
						places={ this.state.places }
						triggerModalState={ this.props.triggerModalState }
						triggerDeletePlace={ this.deletePlaceFromLocation }
					/>
					<AddEntryContainer
						addPlaceToLocation={ this.addPlaceToLocation }/>
				</div>
			)
		}
	}
}

export default BaseContainer;
import React from 'react';
import ReactDOM from 'react-dom';
import Match from 'react-router';
import Rebase from 're-base';
import Base from '../components/Base';
import Test from '../components/Test';
import PlaceContainer from './PlaceContainer';

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
	}
	componentWillMount() {
		// rebase.fetch('locations', {
		// 	context: this,
		// 	asArray: true,
		// 	then(data) {
		// 		const cities = data.map(city => {
		// 			return city.name;
		// 		});
		// 		this.setState({
		// 			cities,
		// 			allData: data,
		// 		});
		// 	}
		// });
		
		// let loc;
		// // Grabs all the locations and their data
		// rebase.fetch('locations', {
		// 	context: this,
		// 	asArray: true,
		// 	then(data) {
		// 		console.log('LOCATIONS: ', data);
		// 		loc = data;
				
		// 		// Set target to be the object containing the data for
		// 		// Fountain Valley
		// 		let target = loc.filter(location => {
		// 			return location.city === "Fountain Valley"
		// 		});

		// 		// Fetches data from the target key. This will make it
		// 		// easier to transition to a fetch query that isn't
		// 		// dependent on the data being stored in the location object.
		// 		rebase.fetch(`locations/${target[0].key}/places`, {
		// 			context: this,
		// 			asArray: true,
		// 			then(data) {
		// 				console.log('The places in FV: ', data);
		// 				let places = data;
		// 			}
		// 		});
		// 	}
		// });

		// First grab the current locations data and populate the allLocations state.
		rebase.fetch('locations', {
			context: this,
			asArray: true,
			then(data) {
				console.log('IN LOCATIONS FETCH');
				const cities = data.map(location => {
					return location.city;
				});
				console.log('The cities: ', cities);
				this.setState({
					allLocations: data,
					cities,
					isLoading: false,
				});
			}
		});
		
		// Syncs the allLocations state to the locations endpoint of the Firebase db
		rebase.syncState('locations', {
			context: this,
			state: 'allLocations',
			asArray: true,
			then(data) {
				console.log('IN THE SYNC STATE');
				console.log(this.state);
			}
		});
	}
	triggerBaseReload(name) {
		console.log('The name in the base reload is: ', name);
		const city = this.state.allLocations.filter(location => {
			return location.city === name;
		});
		console.log('The city data: ', city);
		let cityPlaces = city[0].places;
		
		// let cityPlaces = this.state.allLocations.filter(location => {
		// 	if (location.city === name) {
		// 		return true;
		// 	}
		// }).map(location => {
		// 	return location.places;
		// });

		// console.log('The cityPlaces is: ', cityPlaces.forEach(place => ));
		this.setState({
			places: cityPlaces,
		});

		// this.setState({
		// 	display: name,
		// 	places: cityPlaces,
		// 	allLocations: this.state.allLocations.concat({
		// 		city: 'Fountain Valley',
		// 		state: 'CA',
		// 		key: this.state.allLocations.length.toString(),
		// 		places: [
		// 			{
		// 				name: 'G Burger',
		// 				rating: 4
		// 			}
		// 		],
		// 	})
		// });
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
					/>
				</div>
			)
		}
	}
}

export default BaseContainer;
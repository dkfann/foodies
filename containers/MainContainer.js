import React from 'react';
import Main from '../components/Main';
import { rebase } from '../config/rebase';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.params.location || 'Foodies',
			shownModal: null,
			modalAction: null,
			currentLocation: null,
			currentPlace: null,
			allLocations: [],
			cities: [],
			isLoading: true,
		};

		this.triggerReload = this.triggerReload.bind(this);
		this.triggerModalState = this.triggerModalState.bind(this);
		this.triggerModalAction = this.triggerModalAction.bind(this);
		this.updateLocationState = this.updateLocationState.bind(this);
		this.updatePlaceState = this.updatePlaceState.bind(this);
		this.currentData = this.currentData.bind(this);
		this.getAllLocationData = this.getAllLocationData.bind(this);
	}
	componentWillMount() {
		console.log('Main container mounted');
		
		// First we fetch the data from locations and update the state with this.
		// We also need to do this before calling syncState
		rebase.fetch('locations', {
			context: this,
			asArray: true,
			then(data) {
				const cities = data.map(location => {
					return location.city;
				});
				console.log('The cities ', cities);
				this.setState({
					allLocations: data,
					cities,
					isLoading: false,
				});
			}
		});

		// Syncs the allLocations state to the locations endpoint of the Firebase db
		// Now when we update the state locally it will update the firebase endpoint.
		rebase.syncState('locations', {
			context: this,
			state: 'allLocations',
			asArray: true,
			then(data) {
				console.log('Successfully synced state!');
			}
		});
	}
	getAllLocationData() {
		return this.state.allLocations;
	}
	updateLocationData(indexData) {
		// We need the index data for the location and the place
		const {
			locationIndex,
			placeIndex,
		} = indexData;
		
		// If a place index is specified, we're updating a specific place
		if (placeIndex) {
			
		}
	}
	triggerReload(location) {
		this.setState({
			title: location,
			currentLocation: location,
		});
	}
	triggerModalState(modal) {
		this.setState({
			shownModal: modal,
		});
	}
	triggerModalAction(modalAction) {
		this.setState({
			modalAction,
		});
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			title: newProps.params.location || 'Foodies'
		});
	}
	updateLocationState(location) {
		this.setState({
			currentLocation: location,
		});
	}
	updatePlaceState(placeIndex) {
		// this.setState({
		// 	currentPlace: place,
		// });
	}
	currentData() {
		return {
			location: this.state.currentLocation,
			place: this.state.currentPlace,
		};
	}
	render() {
		return (
			<Main
				children={ this.props.children }
				title= { this.state.title }
				triggerReload = { this.triggerReload }
				currentModal={ this.state.shownModal }
				triggerModalState={ this.triggerModalState }
				triggerModalAction={ this.triggerModalAction }
				updateLocationState={ this.updateLocationState }
				updatePlaceState={ this.updatePlaceState }
				currentData={ this.currentData }
				getAllLocationData={ this.getAllLocationData }
				isLoading={ this.state.isLoading }
			/>
		);
	}
}

export default MainContainer;

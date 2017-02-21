import React from 'react';
import Main from '../components/Main';
import rebase from '../config/rebase';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.params.location || 'Foodies',
			shownModal: null,
			modalAction: null,
			currentLocation: null,
			currentPlace: null,
		};

		this.triggerReload = this.triggerReload.bind(this);
		this.triggerModalState = this.triggerModalState.bind(this);
		this.triggerModalAction = this.triggerModalAction.bind(this);
		this.updateLocationState = this.updateLocationState.bind(this);
		this.updatePlaceState = this.updatePlaceState.bind(this);
		this.currentData = this.currentData.bind(this);
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
		console.log('in update place state, the index: ', placeIndex);
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
			/>
		);
	}
}

export default MainContainer;

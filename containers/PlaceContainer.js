import React from 'react';
import Place from '../components/Place';

class PlaceContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			places: [
				{
					name: '',
					rating: '',
				}
			]
		};

		this.handleEditPlace = this.handleEditPlace.bind(this);
		this.handleDeletePlace = this.handleDeletePlace.bind(this);
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			places: newProps.places
		});
	}
	handleEditPlace() {
		console.log('Clicked edit place!');
	}
	handleDeletePlace(index) {
		console.log('The index: ', index );
		this.props.updatePlaceState(index);
		this.props.triggerModalState('DELETE_PLACE');
	}
	render() {
		return (
				<Place
					places={this.props.places}
					handleEditPlace={this.handleEditPlace}
					handleDeletePlace={this.handleDeletePlace}
				/>
		);
	}
}

export default PlaceContainer;
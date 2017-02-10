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
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			places: newProps.places
		});
	}
	render() {
		return (
				<Place
					places={this.state.places}
				/>
		);
	}
}

export default PlaceContainer;
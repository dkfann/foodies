import React from 'react';
import { Router, browserHistory } from 'react-router';
import CityStyles from '../styles/CityStyles';
import rebase from '../config/rebase';

class City extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		};
		this.handleCityClick = this.handleCityClick.bind(this);
	}
	handleCityClick() {
		this.props.triggerReload(this.props.cityName);
		this.props.triggerBaseReload(this.props.cityName);
		browserHistory.push(`/#${this.props.cityName}`);
		this.setState({
			clicked: true,
		})
	}
	render() {
		return (
			<div className="c-city-container column" onClick={this.handleCityClick}>
				<div className="c-city box has-text-centered">
					{this.props.cityName}
				</div>
			</div>
		)
	}

}

export default City;
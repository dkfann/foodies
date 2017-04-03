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
        console.log('The index of the city clicked: ', this.props.index );
        // this.props.triggerReload({ locationIndex: this.props.index });
        console.log('In the handle city click');
        this.props.updateCurrentLocationIndex({ locationIndex: this.props.index });
        // this.props.updateCurrentLocationByIndex({ locationIndex: this.props.index });
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
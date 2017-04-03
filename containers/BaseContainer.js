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

        this.findCurrentCityLocationData = this.findCurrentCityLocationData.bind(this);
        this.deletePlaceFromLocation = this.deletePlaceFromLocation.bind(this);

        this.getCityListFromAllLocationData = this.getCityListFromAllLocationData.bind(this);
        this.getPlacesFromCityIndex = this.getPlacesFromCityIndex.bind(this);
        this.updateCurrentLocationIndex = this.updateCurrentLocationIndex.bind(this);
        this.getCityDataByCityName = this.getCityDataByCityName.bind(this);
    }
    componentWillMount() {
        const city = this.getCityDataByCityName(this.props.routeParams.location);
        if (city.length === 0) {
            return;
        }
        const places = city[0].places;

        this.setState({
            places,
            currentLocationIndex: parseInt(city[0].key, 10),
        });
    }
    componentDidUpdate(props, state) {

    }
    componentWillReceiveProps(newProps) {
        // When the Main Container updates its state, it will re-render and send the new props
        // to the children. This function will recieve the new props and update the Base Container's
        // state with the props.
        console.log(newProps.getCurrentLocationData());
        this.setState({
            places: newProps.getCurrentLocationData().places,
        });
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
    updateCurrentLocationIndex({ locationIndex }) {
        this.setState({
            currentLocationIndex: locationIndex,
        },() => {
            this.updateDisplayWithNewPlaces();
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
        // const places = this.getPlacesFromCityIndex(this.state.currentLocationIndex);
        const places = this.props.getDataFromLocationIndex(this.state.currentLocationIndex).places;

        this.setState({
            places
        });
    }
    deletePlaceFromLocation() {

    }
    getPlaceFromIndex(indexData) {
        // We need the index of the location and the place to find the data.

    }
    render() {
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
                    getCurrentLocationData={ this.props.getCurrentLocationData }
                    addPlaceToLocation={ this.props.addPlaceToLocation }/>
            </div>
        )
    }
}

export default BaseContainer;
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

        this.getCurrentLocationData = this.getCurrentLocationData.bind(this);
        this.getDataFromLocationIndex = this.getDataFromLocationIndex.bind(this);
        this.addPlaceToLocation = this.addPlaceToLocation.bind(this);
        this.updateCurrentLocationByIndex = this.updateCurrentLocationByIndex.bind(this);
    }
    componentWillMount() {
        // First we fetch the data from locations and update the state with this.
        // We also need to do this before calling syncState
        rebase.fetch('locations', {
            context: this,
            asArray: true,
            then(data) {
                const cities = data.map(location => {
                    return location.city;
                });
                const currentLocation = data.filter(location => location.city === this.props.params.location);
                console.log('The current city data: ', currentLocation);
                this.setState({
                    allLocations: data,
                    cities,
                    currentLocation,
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
            }
        });
    }
    getAllLocationData() {
        return this.state.allLocations;
    }
    getCurrentLocationData() {
        console.log('Called get current location data');
        return this.state.currentLocation[0];
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
    updateCurrentLocationByIndex({ locationIndex }) {
        console.log('in update current location by index');
        this.setState({
            currentLocation: this.getAllLocationData()[locationIndex],
            title: this.getAllLocationData()[locationIndex].city,
            isLoading: true,
        }, () => {
            
        });
    }
    addPlaceToLocation(placeData) {
        // Get the current location data and update it with the new place
        const updatedLocationData = this.getCurrentLocationData();
        updatedLocationData.places.push({
            name: placeData.placeName,
            rating: placeData.placeRating,
            category: placeData.placeCategory,
        });

        // Get the current all locations data and update the current location's data with
        // the new one
        const updatedAllLocationsData = this.getAllLocationData();
        updatedAllLocationsData[parseInt(updatedLocationData.key, 10)] = updatedLocationData;
        
        // Set the state, which is synced with Firebase
        this.setState({
            allLocations: updatedAllLocationsData,
        });
    }
    getDataFromLocationIndex(locationIndex) {
        // Gets the places from the city that matches the city index that's passed in
        const allLocations = this.getAllLocationData();
        const selectedLocation = allLocations.filter(location => location.key === locationIndex.toString());
        
        return selectedLocation[0];
    }
    triggerReload({ locationIndex }) {
        console.log('in trigger reload');
        this.updateCurrentLocationByIndex({ locationIndex });

        // this.setState({
        //     title: currentLocation.city,
        //     currentLocation,
        // }, () => {
        //     console.log('The new current location data:', this.state.currentLocation);
        // })
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
        if (this.state.isLoading) {
            return(
                <div>
                    LOADING!
                </div>
            )
        }
        else {
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

                    getCurrentLocationData={ this.getCurrentLocationData }
                    addPlaceToLocation={ this.addPlaceToLocation }
                    updateCurrentLocationByIndex = { this.updateCurrentLocationByIndex }
                    getDataFromLocationIndex = { this.getDataFromLocationIndex }
                />
            );
        }

    }
}

export default MainContainer;

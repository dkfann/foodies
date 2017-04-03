import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import Select from 'react-select';
import AddEntry from '../components/AddEntry';

const rebase = Rebase.createClass({
    apiKey: "AIzaSyDy3OhEau5-KKAKqgjpWK_QWydYVYly0gY",
    authDomain: "foodies-6a657.firebaseapp.com",
    databaseURL: "https://foodies-6a657.firebaseio.com",
    storageBucket: "foodies-6a657.appspot.com",
    messagingSenderId: "657964196568"
});

class AddEntryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeName: '',
            placeCategory: '',
            placeRating: '',
        };

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleAddPlaceSubmit = this.handleAddPlaceSubmit.bind(this);
    }
    componentWillMount() {
        
    }
    handleChangeEvent(event) {
        if (event.target.className.includes('c-new-place-name-input')) {
            this.setState({
                placeName: event.target.value,
            });
        }

        else if (event.target.className.includes('c-new-place-rating-input')) {
            this.setState({
                placeRating: event.target.value,
            });
        }

        else if (event.target.className.includes('c-new-place-category-input')) {
            this.setState({
                placeCategory: event.target.value,
            })
        }
    }
    handleAddPlaceSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.addPlaceToLocation(this.state);
        const freshState = this.state;
        Object.keys(freshState).forEach((key, index) => {
            if (key === 'key') {
                console.log('Iterating on the key named key');
            }
            freshState[key] = '';
        });
        console.log(freshState);
        this.setState({
            placeName: '',
            placeRating: '',
            placeCategory: '',
        });
    }
    render() {
        return (
            <AddEntry
                addPlaceToLocation={ this.handleAddPlaceSubmit }
                handleChange={ this.handleChangeEvent }
                placeData={ this.state }
            />
        )
    }
}

export default AddEntryContainer;

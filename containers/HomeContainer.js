import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../components/Home';
import Rebase from 're-base';
import FoodEntryContainer from './FoodEntryContainer';

const base = Rebase.createClass({
	apiKey: "AIzaSyCvvpZOgJENwwizBajXEqMOeMRFT3TmeUc",
	authDomain: "pbeaters-9571b.firebaseapp.com",
	databaseURL: "https://pbeaters-9571b.firebaseio.com",
	storageBucket: "pbeaters-9571b.appspot.com",
	messagingSenderId: "220368727517"
});

class HomeContainer extends React.Component {
	constructor(props) {
		super();
		// super(props);
		// console.log('The props are: ', props);
		this.state = {
			food: [],
			isLoading: true,
		}
		this.deleteFood = this.deleteFood.bind(this);
	}
	componentWillMount() {
		base.fetch('foods', {
		  context: this,
		  asArray: true,
		  then(data) {
		    console.log('retrieved data', data);
		  }
		});

		base.syncState('foods', {
			context: this,
			state: 'food',
			asArray: true,
			then(data) {
				this.setState({
					isLoading: false,
				});
			}
		});
	}
	_testSubmit(e) {
		e.preventDefault();
	}
	deleteFood(index, e) {
		e.preventDefault();
		let updatedFoodList = this.state.food.concat([]);
		updatedFoodList.splice(index, 1);

		this.setState({
			food: updatedFoodList
		});
	}
	render() {
		if (!this.state.isLoading) {
			return (
				<div>
					<Home 
						food = { this.state.food }
						deleteFood = { this.deleteFood }
					/>
					<FoodEntryContainer name="testing props" />
				</div>
			)	
		}
		else {
			return (
				<div>
					LOADING!!!
				</div>
			)
		}
	}
}

export default HomeContainer;

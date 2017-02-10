import React from 'react';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import Styles from '../styles/FoodEntryStyles.js'
import Select from 'react-select';

const base = Rebase.createClass({
	apiKey: "AIzaSyCvvpZOgJENwwizBajXEqMOeMRFT3TmeUc",
	authDomain: "pbeaters-9571b.firebaseapp.com",
	databaseURL: "https://pbeaters-9571b.firebaseio.com",
	storageBucket: "pbeaters-9571b.appspot.com",
	messagingSenderId: "220368727517"
});

const options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' },
];

// The cache will be populated when the component mounts and grabs the firebase
// data.
let cache = [];

class FoodEntryContainer extends React.Component {
	constructor(props) {
		super(props);
		console.log('the props are: ', props)
		this.state = {
			cacheFoodObj: null,
			cacheFoodMenu: null,
			isLoadingExternally: true,
		}

		this.onValueChange = this.onValueChange.bind(this);
		this.handleAddCacheToSchedule = this.handleAddCacheToSchedule.bind(this);
		this.handleLoadCacheToEdit = this.handleLoadCacheToEdit.bind(this);
	}
	componentWillMount() {
		// We'll do the firebase binding here, before the element is initially rendered.
		this.ref = base.syncState('foods', {
			context: this,
			state: 'food',
			asArray: true
		});
	
		// Grab the data from the endpoint, populate the cache, then indicate
		// that we're done loading.
		base.fetch('foods', {
			context: this,
			asArray: true,
		})
		.then(data => {
			data.forEach(foodItem => {
				cache.push({
					value: foodItem.menu,
					label: foodItem.title,
				});
			})
			console.log('CACHE: ', cache);
			this.setState({
				isLoadingExternally: false,
			});
		})
	}
	onValueChange(val) {
		// console.log('FINDING THE SELECT OBJ')
		//console.log(ReactDOM.findDOMNode(this.refs.select).children['form-field-name']);

		this.setState({
			cacheFoodObj: val,
		});
	}
	handleAddCacheToSchedule() {
		base.post('foods', {
			data: this.state.food.concat([{
				title: this.state.cacheFoodObj.label,
				menu: this.state.cacheFoodObj.value,
			}]),
			context: this,
		});
	}
	handleLoadCacheToEdit() {
		ReactDOM.findDOMNode(this.refs.food).value = this.state.cacheFoodObj.label;
		ReactDOM.findDOMNode(this.refs.menu).value = this.state.cacheFoodObj.value;
	}
	_testSubmit(e) {
		e.preventDefault();
		console.log(this.state.food);
		console.log(ReactDOM.findDOMNode(this.refs.food).value);
		console.log(ReactDOM.findDOMNode(this.refs.menu).value);
		base.post('foods', {
			data: this.state.food.concat([{
				title: ReactDOM.findDOMNode(this.refs.food).value,
				menu: ReactDOM.findDOMNode(this.refs.menu).value,
			}]),
			context: this,
		})
	}
	render() {
		console.log(this.state);
		console.log(cache);
		return (
			<div className="o-food-entry-container col-md-12" style={Styles.entry}>
				<form onSubmit={this._testSubmit.bind(this)} className="form-group col-md-4" action="">
					<input ref="food" type="text" placeholder="Enter Restaurant" className="form-control" />
					<textarea ref="menu" id="" cols="5" rows="5" className="form-control" placeholder="Enter Menu Info"></textarea>
					<input type="submit" className="btn btn-success center-block" style={Styles.button}/>
				</form>
				<div style={Styles.selectForm}>
					<Select
						ref='select'
						style={Styles.select}
						name='form-field-name'
						className='testClass'
						isLoading={this.state.isLoadingExternally}
						options={cache}
						value={this.state.cacheFoodObj}
						onChange={this.onValueChange}
					/>
					<button onClick={this.handleLoadCacheToEdit} className="btn btn-primary center-block" style={Styles.selectButton}>Load Cache to Edit</button>
					<button onClick={this.handleAddCacheToSchedule} className="btn btn-primary center-block" style={Styles.selectButton}>Add Cache to Schedule</button>
				</div>

			</div>
		)
	}
}

export default FoodEntryContainer;

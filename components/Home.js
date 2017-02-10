import React from 'react';
import Style from '../styles/HomeStyles';
import moment from 'moment';

const Home = ({ food, deleteFood }) => {

	function mergeStyles(...args) {
		return Object.assign({}, ...args);
	}
	const foodList = food.map((foodItem, index) => {
		let colorStyle = Style.current;
		// Grabs the Thursday of this week and adds 7*index to the day
		// Current week adds 0 (7*0), next adds 7 (7*1), and so forth.
		const month = moment().day(4).add(7*index, 'days').format('MMM');
		const day = moment().day(4).add(7*index, 'days').format('D');

		// If the day is over, make the text color grey.
		if (moment().diff(moment().day(4).add(7*index, 'days'), 'days') > 0) {
			colorStyle = Style.old;
		}

		return <li className="o-food-item" style={Style.list} key={index}>
			<div className="o-food-date" style={mergeStyles(Style.date, colorStyle)}>{month} {day}</div>
			<div className="o-food-title" style={mergeStyles(Style.title, colorStyle)}>{foodItem.title}</div>
			<div className="o-food-menu" style={mergeStyles(Style.menu, colorStyle)}>{foodItem.menu}</div>
			<button className="o-delete-food btn btn-danger" onClick={deleteFood.bind(this, index)}>Delete</button>
		</li>
	});

	return (
		<div className="o-home-container" style={Style.container}>
			{ foodList }
		</div>
	)
}

export default Home;

import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
import MainContainer from '../containers/MainContainer';
import HomeContainer from '../containers/HomeContainer';
import FoodEntryContainer from '../containers/FoodEntryContainer';
import BaseContainer from '../containers/BaseContainer';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={ MainContainer }>
			<IndexRoute component= { BaseContainer }/>
			<Route path="/:location" component={BaseContainer} />
		</Route>
	</Router>
);

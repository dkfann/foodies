# General Notes

## Components and Containers?
Use this as a way to split up the business logic of the app with the presentation of the app.
The container will be the component that is rendered with react-router, which in turn returns
a stateless component that handles the presentation of the data passed into it.

The container will be the typical React component, with the syntax:

```js
import StatelessComponent from '../components/statelessComponent';

class Container extends React.Component {
	// Insert React Component logic here
	render() {
		return (
			// JSX which includes the component
			<StatelessComponent />
		)
	}
}

export default Container
```

Whereas, the stateless components will have a syntax like:

```js
const StatelessComponent = ({ props }) => {
	// Some functions if needed

	return (
		// JSX of the component
	)
}

export default StatelessComponent
```

## Constructor passing in props
Why in the containers do we have the syntax:

```js
class Container extends React.Component {
	constructor(props) {
		super(props);
	}
}
```

This is because we want to have access to `this.props` within this object.

What are these props? Say you render a container like so:

```js
render() {
	return (
		<TestContainer name="test" />
	)
}
```

Now in the constructor of `TestContainer`, if you were to do something like:

```js
class TestContainer extends React.Component {
	constructor(props) {
		super(props);
		console.log('The props are: ', props);
	}
}
```

You would print out something like:
`The props are: { name: "test" }`

This is how you would be able to access parameters like this within React.

## The Main Container and Children
How does the main container operate?

We have syntax as such:

```js
import React from 'react';
import Main from '../components/Main';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Main
				children={ this.props.children }
			/>
		);
	}
}

export default MainContainer;
```

This is meant to be a wrapping container for all of our other components. We see that this container renders the `Main` component by passing in a prop called `children` which contains
`this.props.children`. This comes from the constructor. It gets the children from `react-router`, where it is rendered from:

```js
<Router history={hashHistory}>
	<Route path="/" component={ MainContainer }>
		<IndexRoute component= { HomeContainer }/>
	</Route>
</Router>
```

The `children` are all the components that exist within the `Route` object that is rendered with the `MainContainer`. This means `<IndexRoute component= { HomeContainer }/>` is a child of `MainContainer` and is passed into `this.props.children`. 

## What is Context?
If we find ourselves wanting to have a prop that is available globally, we use context. Context
automatically passes down variables from component to component without needing to pass down 
props at every level.




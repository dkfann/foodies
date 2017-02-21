import React from 'react';
import Main from '../components/Main';
import rebase from '../config/rebase';

class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.params.location || 'Foodies',
			shownModal: null,
		};

		this.triggerReload = this.triggerReload.bind(this);
		this.triggerModalState = this.triggerModalState.bind(this);
	}
	triggerReload(title) {
		this.setState({
			title
		});
	}
	triggerModalState(modal) {
		this.setState({
			shownModal: modal,
		});
	}
	componentWillReceiveProps(newProps) {
		this.setState({
			title: newProps.params.location || 'Foodies'
		});
	}
	render() {
		return (
			<Main
				children={ this.props.children }
				title= { this.state.title }
				triggerReload = { this.triggerReload }
				currentModal={ this.state.shownModal }
				triggerModalState={ this.triggerModalState }
			/>
		);
	}
}

export default MainContainer;

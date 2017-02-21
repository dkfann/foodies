import React from 'react';

// const DeletePlaceModal = ({ triggerShowModal }) => {
// 	return (
// 		<div className="c-delete-modal modal is-active">
// 			<div className="modal-background" onClick={this.handleModalClose}></div>
// 			<div className="modal-card">
// 				<header className="modal-card-head">
// 					<div className="modal-card-title">Delete Place</div>
// 					<button className="modal-close"></button>
// 				</header>
// 				<section className="modal-card-body">
// 					<div className="c-delete-modal__desc">
// 						Are you sure you want to delete this place?
// 					</div>
// 				</section>
// 				<footer className="modal-card-foot">
// 					<button className="button is-danger">Yes</button>
// 					<button className="button is-success">No</button>
// 				</footer>
// 			</div>
// 		</div>
// 	)
// };

class DeletePlaceModal extends React.Component {
	constructor(props) {
		super(props);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleDeletePlace = this.handleDeletePlace.bind(this);
	}
	handleModalClose() {
		this.props.triggerModalState(null);
	}
	handleDeletePlace() {
		console.log(this.props);
		console.log(this.props.currentData());
	}
	render() {
		return (
			<div className="c-delete-modal modal is-active">
				<div className="modal-background"></div>
				<div className="modal-card">
					<header className="modal-card-head">
						<div className="modal-card-title">Delete Place</div>
						<button className="modal-close" onClick={this.handleModalClose}></button>
					</header>
					<section className="modal-card-body">
						<div className="c-delete-modal__desc">
							Are you sure you want to delete this place?
						</div>
					</section>
					<footer className="modal-card-foot">
						<button className="button is-danger" onClick={this.handleDeletePlace}>Yes</button>
						<button className="button is-success" onClick={this.handleModalClose}>No</button>
					</footer>
				</div>
			</div>
		)
	}
}

export default DeletePlaceModal;

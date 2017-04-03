import React from 'react';
import DeletePlaceModal from '../modals/DeletePlaceModal';

const ModalManager = props => {
	switch(props.currentModal) {
		case 'DELETE_PLACE':
			return <DeletePlaceModal {...props} />

		default:
			return null;
	}
};

export default ModalManager;
import React from 'react';
import Style from '../styles/MainStyles';
import ModalManager from '../containers/ModalManager';

const Main = (props) => {
	const {
		children,
		title, 
		triggerReload, 
		currentModal, 
		triggerModalState,
		triggerModalAction,
		updateLocationState,
		updatePlaceState,
		currentData,
		getAllLocationData,
		isLoading,
		getCurrentLocationData,
		addPlaceToLocation,
		updateCurrentLocationByIndex,
		getDataFromLocationIndex,
	} = props;
	return (
		<div className="o-main-container" style={Style.main}>
			<div className="o-main-title" style={Style.title}>{title}</div>
			<ModalManager
				currentModal={ currentModal }
				triggerModalState={ triggerModalState }
				triggerModalAction={ triggerModalAction }
				updatePlaceState={ updatePlaceState }
				currentData={ currentData }
			/>
			{React.cloneElement(children, {triggerReload, triggerModalState, updatePlaceState, getAllLocationData, isLoading, getCurrentLocationData, addPlaceToLocation, updateCurrentLocationByIndex, getDataFromLocationIndex })}
		</div>
	)
}

export default Main;

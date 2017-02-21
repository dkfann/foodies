import React from 'react';
import Style from '../styles/MainStyles';
import ModalManager from '../containers/ModalManager';

const Main = ({ children, title, triggerReload, currentModal, triggerModalState }) => {
	return (
		<div className="o-main-container" style={Style.main}>
			<div className="o-main-title" style={Style.title}>{title}</div>
			<ModalManager
				currentModal={ currentModal }
				triggerModalState={ triggerModalState }
			/>
			{React.cloneElement(children, {triggerReload, triggerModalState })}
		</div>
	)
}

export default Main;

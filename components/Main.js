import React from 'react';
import Style from '../styles/MainStyles';

const Main = ({ children, title, triggerReload }) => {
	return (
		<div className="o-main-container" style={Style.main}>
			<div className="o-main-title" style={Style.title}>{title}</div>
			{React.cloneElement(children, {triggerReload})}
		</div>
	)
}

export default Main;

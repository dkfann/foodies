import React from 'react';
import Select from 'react-select';
import Styles from '../styles/AddEntryStyles';

const AddEntry = ({ addPlaceToLocation, handleChange, placeData }) => {
	// return (
	// 	<div>
	// 		<form action="" className="control">
	// 			<input className="input" type="text" placeholder="Enter New Place"/>
	// 			<input className="input" type="text" placeholder="Enter Place Rating"/>
	// 			<div className="control">
	// 				<button className="button is-primary">Add Place</button>
	// 			</div>
	// 		</form>
	// 	</div>
	// )

	return (
		<div className="box" style={Styles.addEntryContainer}>
			<form action="" className="control">
				<input 
					className="input c-new-place-name-input" 
					type="text" 
					placeholder="Enter New Place" 
					onChange={ handleChange }
					value ={ placeData.placeName }
					style={Styles.addEntryInput}
				/>
				<input 
					className="input c-new-place-category-input" 
					type="text" 
					placeholder="Enter Place Category"
					onChange = { handleChange }
					value = { placeData.placeCategory }
					style={Styles.addEntryInput}
				/>
				<input 
					className="input c-new-place-rating-input" 
					type="text" 
					placeholder="Enter Place Rating"
					onChange = { handleChange }
					value = { placeData.placeRating }
					style={Styles.addEntryInput}
				/>
				<div className="control">
					<button className="button is-primary" onClick={ addPlaceToLocation }>Add Place</button>
				</div>
			</form>
		</div>
	)
};

export default AddEntry;
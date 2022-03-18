import React, { createContext, useState, useEffect } from "react";
import { postData } from "./../helpers/utilities";

export const newProductContext = createContext();
newProductContext.displayName = "new product context";

const NewProductContext = ( props ) =>
{

	const [ state, setState ] = useState( {
		features: [],
		// gallery: new FormData(),
	} );

	// features
	const handleGetFeatures = () =>
	{
		return state.features;
	};

	const handleAddFeature = ( feature ) =>
	{
		if ( state.features.filter( ( f ) => f.title === feature.title ).length > 0 )
		{
			alert( "a feature with similar title exists" );
			return false;
		}

		setState( {
			...state,
			features: [ ...state.features, feature ],
		} );
		return true;
	};

	const handleDeleteFeature = ( title ) =>
	{
		const newfeatures = state.features.filter( ( f ) => f.title !== title );
		setState( {
			...state,
			features: newfeatures,
		} );
	};

	// const handleAddGallery = ( file ) =>
	// {
	// 	let newGallery = state.gallery;
	// 	newGallery.append( "galleryImage", file );
	// 	setState( {
	// 		...state,
	// 		gallery: newGallery,
	// 	} );
	// 	// console.log("new gallery content is ", state.gallery);
	// };

	// const handleGetGallery = () =>
	// {
	// 	return state.gallery;
	// };

	const handleDeleteImage = ( index ) => { };

	const handleSubmit = ( productId ) =>
	{
		let features = true;
		let gallery = true;

		if ( state.features.length > 0 )
			postData( `products/${ productId }/features`, {
				features: state.features.map( ( f ) =>
				{
					return {
						productId,
						...f,
					};
				} ),
			} ).then( ( r ) =>
			{
				if ( r.status !== 200 ) features = false;
				else setState( { ...state, features: [] } );
			} );

		// if (state.gallery.values.length > 0) {
		// 	postData(`products/${productId}/gallery`, {
		// 		gallery: state.gallery,
		// 	}).then((g) => {
		// 		if (g.status !== 200) gallery = false;
		// 	});
		// }

		return !features || !gallery ? false : true;
	};

	// useEffect( () =>
	// {
	// 	setState( {
	// 		...state,
	// 		gallery: new FormData(),
	// 	} )
	// } )

	return (
		<newProductContext.Provider
			value={ {
				addFeature: handleAddFeature,
				getFeatures: handleGetFeatures,
				deleteFeature: handleDeleteFeature,
				// addGallery: handleAddGallery,
				// getGallery: handleGetGallery,
				deleteImage: handleDeleteImage,
				submitData: handleSubmit,
			} }>
			{ props.children }
		</newProductContext.Provider>
	);
};

export default NewProductContext;

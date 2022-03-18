import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../helpers/utilities";
import UAParser from "ua-parser-js";
import { postData } from "./../helpers/utilities";
import axios from "axios";

export const shopContext = createContext();
shopContext.displayName = "shop context";

const ShopContext = ( props ) =>
{
	const [ state, setState ] = useState( {
		products: [],
		selectedItem: {},
		buy: false,
		cardCodes: [],
	} );
	const [ appLayout, setAppLayout ] = useState( '' )
	const CSR = typeof window !== 'undefined' //CSR = Client Side Rendering

	// 2 options: shop, admin
	const handleSetLayout = ( layout ) =>
	{
		setAppLayout( layout )
		// if ( CSR ) sessionStorage.setItem( "app_layout", layout );
	};

	const handleGetLayout = () =>
	{
		return appLayout
		// if ( CSR ) return sessionStorage.getItem( "app_layout" );
	};


	// record site visitor details
	const recordVisitor = () =>
	{
		// const rs = await axios.get( "https://ipapi.co/json/" );
		// const rs = await axios.get("http://ip-api.com/json/"); //free version limited to 45 requests per minute
		axios.get( "https://ipapi.co/json/" ).then( ( res ) =>
		{
			if ( res.status === 200 )
			{
				let ua = new UAParser();
				ua &&
					postData( "analytics", {
						country: res.data.country_name,
						ipAddress: res.data.ip,
						city: res.data.city,
						url: window.location.href,
						// device
						deviceType: ua.getResult().device.type,
						deviceVendor: ua.getResult().device.vendor,
						os: ua.getResult().os.name,
						browser: ua.getResult().browser.name,
					} );
			}
		} );
	};



	useEffect( () =>
	{
		recordVisitor();
		// fetchProducts().then((res) => {
		// 	setState({ ...state, products: res.data?.data });
		// });
	}, [] );

	const findProduct = ( slug ) =>
	{
		// query all products n return a matching slug
		const q = state.products.filter( ( prod ) =>
		{
			return prod.slug === slug;
		} );

		return q;
	};

	const fetchProducts = async () =>
	{
		const p = await fetchData( "products" );
		return p;
	};

	const handleFetchProducts = () =>
	{
		return state.products;
	};

	const handleCheckout = ( type ) =>
	{
		// types are cart, buy
		//
		if ( CSR )
		{
			if ( type.toLowerCase() === "buy" )
			{
				setState( { buy: false } );
				localStorage.removeItem( "buy" );
				return;
			}
			return true;
		}
	};

	const handleGetBuyItem = () =>
	{
		if ( CSR )
		{
			if ( localStorage.getItem( "buy" ) === null ) return null;
			return JSON.parse( localStorage.getItem( "buy" ) );
		}
	};

	// buy an item
	const handleBuyItem = ( item ) =>
	{
		if ( CSR )
		{
			if ( localStorage.getItem( "buy" ) !== null )
			{
				localStorage.removeItem( "buy" );
			}

			setState( { buy: true } );
			localStorage.setItem( "buy", JSON.stringify( item ) );
		}
	};

	// select an item
	const handleSelectItem = ( item ) =>
	{
		setState( { ...state, selectedItem: { ...item } } );
	};

	const handleGetSelectedItem = async ( slug ) =>
	{
		const { selectedItem } = state;
		// fetch item from state if it exists
		if ( selectedItem.hasOwnProperty( "id" ) ) return { ...selectedItem };

		// fetch product from server if it doesn't exist
		let sp;

		await fetchData( `products/${ slug }` )
			.then( ( p ) =>
			{
				sp = p.data.data;
			} )
			.catch( ( err ) =>
			{
				sp = fetchProducts().then( ( res ) => ( {
					...res.data?.data,
					notfound: true,
				} ) );
			} );
		return sp;
	};

	const handleAddCode = ( code ) =>
	{
		if ( state.cardCodes.filter( ( c ) => c.code === code.code ).length > 0 )
		{
			alert( "this code is already added" );
			return false;
		}

		setState( {
			...state,
			cardCodes: [ ...state.cardCodes, code ],
		} );
		return true;
	};
	const handleGetCodes = () =>
	{
		return state.cardCodes;
	};

	const handleDeleteCode = ( code ) =>
	{
		// go ahead to delete one
		const newCodes = state.cardCodes.filter( ( c ) => c.code !== code );
		setState( {
			...state,
			cardCodes: newCodes,
		} );
	};

	const handleResetCodes = () =>
	{
		setState( {
			...state,
			cardCodes: [],
		} );
	};

	return (
		<shopContext.Provider
			value={ {
				fetchProducts: handleFetchProducts,
				getSelectedItem: handleGetSelectedItem,
				selectItem: handleSelectItem,
				buyItem: handleBuyItem,
				getBuyItem: handleGetBuyItem,
				checkOut: handleCheckout,

				// cardcodes
				addCode: handleAddCode,
				getCodes: handleGetCodes,
				deleteCode: handleDeleteCode,
				resetCodes: handleResetCodes,

				// app level layout
				getLayout: handleGetLayout,
				setLayout: handleSetLayout
			} }>
			{ props.children }
		</shopContext.Provider>
	);
};

export default ShopContext;

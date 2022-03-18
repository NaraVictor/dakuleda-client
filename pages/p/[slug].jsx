import React, { useState, useEffect, useContext } from "react";

// components
import SimilarProducts from "../../components/product-detail/similarProducts";
import SingleProduct from "../../components/product-detail/singleProduct";
import ProductDetailNav from "../../components/product-detail/productDetailNav";
// import Reviews from "../../components/product-detail/reviews";
// import BrowsingHistory from "../../components/product-detail/browsingHistory";
import ScrollToTopOnMount from "../../components/scrollToTop";
import ScrollToTop from "react-scroll-to-top";

//
import { fetchData, getRandomNumberBetween, postData } from "../../helpers/utilities";
import Features from "../../components/product-detail/features";
import axios from "axios";
import Ad from "../../components/ads/ad";
import { generateFileUrl } from "../../helpers/utilities";
import HeadTag from "./../../components/header-tag";
import _ from 'lodash'
import { shopContext } from "../../context/shopContext";

const ProductDetailPage = ( { product, slug, ...props } ) =>
{
	const [ prod, setProduct ] = useState( {} );
	const [ features, setFeatures ] = useState( [] );
	const [ similarProds, setSimilarProds ] = useState( [] );
	const [ gallery, setGallery ] = useState( [] );
	const [ locationURL, setURL ] = useState( '' );
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )



	const fetchFeatures = ( id ) =>
	{
		return fetchData( `products/${ id }/features` ).then( ( res ) => res.data?.data );
	};
	const fetchGallery = ( id ) =>
	{
		return fetchData( `products/${ id }/gallery` ).then( ( res ) => res.data?.data );
	};

	const fetchSimilarProducts = ( slug ) =>
	{
		fetchData( `categories/${ slug }/similar-products` )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					setSimilarProds( res.data.data );
				}
			} )
			.catch( ( err ) => console.log( err ) );
	};

	const recordVisitor = async () =>
	{
		const rs = await axios.get( "https://ipapi.co/json/" );
		const visitor = {
			product: prod[ "name" ],
			country: rs.data.country_name,
			city: rs.data.city,
			url: window.location.href,
		};

		postData( "analytics?type=product", visitor );
	};

	useEffect( () =>
	{
		// client side code
		setURL( window.location.href )

		//set the retrieved the product from next server call.

		// if ( _.isArray( product ) )
		// 	product = product[ 0 ]

		setProduct( product );

		// calls for similar products, features, n gallery
		fetchSimilarProducts( product.category.slug );
		if ( product.features === undefined )
		{
			fetchFeatures( product.id ).then( ( r ) =>
			{
				r?.length > 0 && setFeatures( r );
			} );
			// return;
		} else
		{
			setFeatures( product.features );
		}

		if ( product.gallery === undefined )
		{
			fetchGallery( product.id ).then( ( r ) =>
			{
				r?.length > 0 && setGallery( r );
			} );
		} else
		{
			setGallery( product.gallery );
		}

		//
		recordVisitor();
	}, [ slug ] );

	return (
		<>
			<ScrollToTopOnMount />
			<ScrollToTop smooth />

			<HeadTag
				pageTitle={ product.name }
				description={ product.description }
				link={ locationURL }
				title={ product.name }
				id={ product.id }
				image={ generateFileUrl( product.imageFileName ) }
			/>

			<SingleProduct prod={ prod } currentUrl={ locationURL } gallery={ gallery } />
			<ProductDetailNav />
			<div className="py-2">
				<Features features={ features } />
				{/* <Reviews />
				<BrowsingHistory /> */}
			</div>
			<div className="container">
				<Ad />
			</div>
			{ similarProds?.length > 0 && <SimilarProducts prods={ similarProds } /> }
		</>
	);
};



export async function getServerSideProps ( context )
{
	const { slug } = context.query;
	let product;

	const rs = await fetchData( `products/${ slug }` );
	if ( rs.status === 200 )
	{
		product = rs.data.data;
	} else
	{
		const rs2 = await fetchData( "products" )
		const randomNumber = getRandomNumberBetween( 0, rs2.data.data.length )
		product = {
			...rs2.data.data[ randomNumber ], // refactor code to pull single product 'maybe'
			notfound: true
		}
	}

	return {
		props: {
			slug,
			product,
		},
	};
}

export default ProductDetailPage;

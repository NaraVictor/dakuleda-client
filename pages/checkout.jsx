import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/shopContext";
import CheckOutForm from "../components/cart/checkoutForm";
import { BuyCheckOut, CartCheckOut } from "../components/cart/checkoutItems";
import { fetchData, generateFileUrl, postData } from "../helpers/utilities";
import checkIcon from "../static/img/check.png";
import _ from "lodash";
import HeadTag from "../components/header-tag";
import { useRouter } from 'next/router'

const CheckOut = ( props ) =>
{
	const [ success, setSuccess ] = useState( false );
	const [ busy, setBusy ] = useState( false );
	const [ isCash, setIsCash ] = useState( true );
	const [ card, setCard ] = useState( {} );

	const ctx = useContext( shopContext );
	const item = ctx.getBuyItem();
	const router = useRouter()

	ctx.setLayout( 'shop' )
	let locationURL

	if ( typeof window !== 'undefined' )
		sessionStorage.setItem( "charity", "charity-alert-ad-open" ); //prevents charity pop-up

	useEffect( () =>
	{
		locationURL = window.location.href

		if ( !item )
		{
			alert(
				"Oopsie, no item(s) found for check-out.\n Buy a product to check-out"
			);

			router.replace( '/' )
		}
	}, [] );

	const handleRedeemCode = ( code ) =>
	{
		if ( code )
		{
			fetchData( `cards/codes/${ _.trim( code ) }` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					_.isEmpty( res.data?.data )
						? setCard( { isEmpty: true } )
						: res.data.data.isUsed
							? setCard( { isUsed: true } )
							: setCard( res.data.data );
					return;
				}
			} );
		}

		setCard( {} );
	};

	const handleCheckOut = ( data ) =>
	{
		if ( !item )
		{
			alert( "no purchase item(s) found" );
			return;
		}

		setBusy( true );
		const orderLine = {
			id: item.id,
			price: item.newPrice,
			quantity: item.quantity || 1,
		};

		postData( "orders", {
			...data,
			orderTotal: item.newPrice * item.quantity || 1,
			deliveryCost: item.deliveryCost,
			deliveryPeriod: item.deliveryPeriod,
			paymentMode: isCash ? "cash" : "credit",
			orderLine: [ orderLine ],
			cardCode: card?.code || "",
		} )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					setSuccess( true );
					ctx.checkOut( "buy" ); //clear buy item
				}
			} )
			.finally( () => setBusy( false ) );

		// postData("checkout/").then((res) => {
		// 	// update success n clear form
		// 	// call checkout on context
		// 	ctx.checkOut("buy");
		// });
	};

	return (
		<div className="container mt-3 mb-5">
			<HeadTag
				key={ Math.random() }
				pageTitle={ "Checkout" }
				description={ `order checkout` }
				link={ locationURL }
				title={ "Checkout" }
				id={ Math.random() }
				image={ generateFileUrl( "logo.png" ) }
			/>
			<article className="row">
				{ success ? (
					<div className="text-center col">
						<img
							src="../static/img/check.png"
							alt="check mark icon"
							className="my-5"
							style={ {
								maxheight: "150px",
								maxWidth: "150px",
							} }
						/>
						<h2 className="text-success">
							<strong>Success</strong>
						</h2>
						<p>Your order has been successfully placed.</p>
						<p>We will get in touched soon!</p>
						<button
							className="btn-primary-filled p-2"
							onClick={ () =>
							{
								router.replace( "/" );
							} }>
							Continue shopping
						</button>
					</div>
				) : (
					<>
						<section className="col-md-6 col order-2 order-md-1">
							<h3>{ busy ? "Checking out..." : "Check-out" }</h3>
							<hr />
							<h5>How do you want to pay?</h5>
							<div className="row">
								<div className="col">
									<button
										disabled={ busy }
										onClick={ () => setIsCash( true ) }
										className={ `w-100 payment-choice ${ isCash && "selected-choice"
											}` }>
										<span>
											<i className="bi bi-cash mr-2"></i>
											Cash
										</span>
									</button>
								</div>
								<div className="col">
									<button
										disabled={ busy }
										onClick={ () =>
										{
											setIsCash( false );
											setCard( {} );
										} }
										className={ `w-100 payment-choice ${ !isCash && "selected-choice"
											}` }>
										<span>
											<i className="bi bi-piggy-bank mr-2"></i>
											Credit
										</span>
									</button>
								</div>
							</div>

							<hr />
							<CheckOutForm
								onCheckout={ handleCheckOut }
								isCash={ isCash }
								busy={ busy }
								onRedeemCode={ handleRedeemCode }
								card={ card }
							/>
						</section>
						{ item && (
							<section className="col-md-4 offset-md-1 order-1 order-md-2 mb-5">
								<h3>Your Order</h3>
								<hr />
								<BuyCheckOut item={ item } busy={ busy } card={ card } />
							</section>
						) }
					</>
				) }
			</article>
		</div>
	);
};

export default CheckOut;

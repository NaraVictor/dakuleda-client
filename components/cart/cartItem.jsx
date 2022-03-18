import React, { useContext, useEffect } from "react";
import { cartContext } from "../../context/cartContext";
import { generateFileUrl } from "../../helpers/utilities";

const CartItem = ( props ) =>
{
	const cart = useContext( cartContext );
	const {
		name,
		category,
		manufacturer,
		newPrice,
		regularPrice,
		imageFileName,
		quantity,
	} = props.item;

	let options = [];

	for ( let i = 1; i <= 20; i++ )
	{
		options.push( i );
	}

	const qtyControl = (
		<select name="cart-qty" className="control-slim cart-qty">
			{ options.map( ( stock ) => (
				<option
					key={ stock }
					value={ `${ stock }` }
					selected={ stock === quantity ? true : false }>
					{ stock }
				</option>
			) ) }
		</select>
	);

	const prices = (
		<span className="cart-prices">
			<h4>GHS { newPrice }</h4>
			<p>
				<strike>GHS { regularPrice }</strike>
			</p>
		</span>
	);

	const deleteButton = (
		<span className="cart-delete" onClick={ () => cart.removeFromCart( name ) }>
			Delete
			<ion-icon name="trash-outline"></ion-icon>
		</span>
	);

	let isMobile,
		size = window.innerWidth;

	if ( size >= 768 ) isMobile = false;
	else isMobile = true;

	return (
		<div className="row">
			<div className="col-2">
				<img
					src={ generateFileUrl( imageFileName ) }
					alt="cart product"
					className="cart-image"
				/>
			</div>
			<div className="col-md-5 col ml-3 ml-md-0 cart-detail">
				<h4>{ name }</h4>
				<p className="text-success">{/* <strong>{category.name}</strong> */ }</p>

				<div className="cart-detail-sm">
					{ isMobile ? (
						<div className="row ml-1">
							<span>{ prices }</span>
							<span className="mx-4">{ qtyControl }</span>
							<span className="pt-2">{ deleteButton }</span>
						</div>
					) : (
						""
					) }
				</div>
			</div>

			<div className="col-md-2 text-center">{ isMobile ? "" : qtyControl }</div>

			<div className="col-md-2">
				{ isMobile ? (
					""
				) : (
					<>
						{ prices }
						{ deleteButton }
					</>
				) }
			</div>
		</div>
	);
};

export default CartItem;

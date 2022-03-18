import React, { useContext } from "react";
import CartItem from "../../components/cart/cartItem";
import CartSummary from "../../components/cart/cartSummary";
import { cartContext } from "./../../context/cartContext";
import emptyCart from "../../static/svg/emptyCart.svg";
import PageTitle from "./../../components/page-title";
import Link from "next/link";
import { shopContext } from '../../context/shopContext'

const CartPage = ( props ) =>
{
	const context = useContext( cartContext );
	const { setLayout } = useContext( shopContext );
	setLayout( 'shop' );

	const handleCheckOut = () =>
	{
		props.history.push( "/checkout" );
	};

	return (
		<section className="container mt-3">
			<PageTitle title="Cart" />
			{ context.cart.length === 0 ? (
				<div className="text-center">
					<img src={ emptyCart } style={ { maxHeight: "30vh" } } alt="" />
					<h2 className="mt-4">Your cart is empty</h2>
					<Link href="" onClick={ () => window.history.go( -1 ) }>
						Continue shopping
					</Link>
				</div>
			) : (
				<>
					<h4>Your Cart ({ context.cart.length ?? 0 } items) </h4>
					<div className="row mt-4">
						<article className="col-md-8">
							{ context.cart.map( ( item ) => (
								<span key={ item.id }>
									<CartItem item={ item } />
									<hr />
								</span>
							) ) }
							<Link
								href="#"
								onClick={ () => window.history.go( -1 ) }
								className="mr-4">
								Continue shopping
							</Link>
							<Link href="#" onClick={ context.clearCart }>
								clear cart
							</Link>
						</article>
						<article className="col-md-4">
							<CartSummary onCheckOut={ handleCheckOut } />
						</article>
					</div>
				</>
			) }
		</section>
	);
};

export default CartPage;
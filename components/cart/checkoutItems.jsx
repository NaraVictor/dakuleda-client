import { cedisLocale, generateFileUrl } from "../../helpers/utilities";
import _ from "lodash";
export const BuyCheckOut = ( { item, busy, card } ) =>
{
	const totalCost =
		parseFloat( item.newPrice * item.quantity || 1 ) +
		parseFloat( item.deliveryCost );
	return (
		<article className="checkout-items">
			<section className="buy">
				{/* <h5>Item</h5> */ }
				<div className="row">
					<div className="col-5">
						<img
							src={ generateFileUrl( item.imageFileName ) }
							alt="product"
							className="checkout-prod-img"
						/>
					</div>
					<div className="col-7">
						<div>
							<strong>{ item.name }</strong>
						</div>
						<div>GHS { cedisLocale.format( item.newPrice ) }</div>

						<div>
							{/* <small>
									<strike>{item.regularPrice}</strike>
								</small> */}
							<small className="text-success d-block">
								<strong>{ item.category.name }</strong>
							</small>
						</div>
					</div>
				</div>
				<hr />
				<h3>Order Summary</h3>
				<hr />
				<div className="order-summary">
					<div className="d-flex justify-content-between">
						<p>Subtotal</p>
						<p>
							<strong>
								GHS { cedisLocale.format( item.newPrice * item.quantity || 1 ) }
							</strong>
						</p>
					</div>
					<div className="d-flex justify-content-between">
						<p>Unit Price</p>
						<p>GHS { cedisLocale.format( item.newPrice ) }</p>
					</div>
					<div className="d-flex justify-content-between">
						<p>Order Quantity</p>
						<p>{ item.quantity }</p>
					</div>
					<div className="d-flex justify-content-between">
						<p>Delivery charge</p>
						<p>GHS { cedisLocale.format( item.deliveryCost || 0 ) }</p>
					</div>
					<div className="d-flex justify-content-between">
						<p>
							{ !_.isEmpty( card.card ) ? (
								<span>
									<strong className="text-success mr-2">
										{ card.card.title }
									</strong>
									applied:
								</span>
							) : (
								<span>Discount</span>
							) }
						</p>
						<p>
							{ _.isEmpty( card.card ) ? (
								0
							) : card.card.isFixedValue ? (
								<span>GHS { card.card.fixedValue }</span>
							) : (
								card.card.percentageValue * 100 +
								"% (GHS " +
								cedisLocale.format( card.card.percentageValue * item.newPrice ) +
								")"
							) }
						</p>
					</div>
				</div>
				<h5 className="mb-0 mt-3">
					<strong>
						GHS{ " " }
						{ cedisLocale.format(
							_.isEmpty( card?.card )
								? parseFloat( totalCost )
								: card.card.isFixedValue
									? totalCost - parseFloat( card.card.fixedValue )
									: totalCost -
									parseFloat( card.card.percentageValue * item.newPrice )
						) }
					</strong>
				</h5>
				<small>Total Due</small>
				{ item.deliveryPeriod && (
					<>
						<hr />
						<h5>
							<strong>Delivery Period: </strong> { item.deliveryPeriod }
						</h5>
						<hr />
					</>
				) }
			</section>
		</article>
	);
};

export const CartCheckOut = ( props ) =>
{
	return (
		<section>
			<h1>Cart Checktout</h1>
		</section>
	);
};

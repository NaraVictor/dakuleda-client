import
{
	deleteData,
	fetchData,
	updateData, generateFileUrl, cedisLocale
} from "../../../helpers/utilities";
import { useState, useEffect } from "react";
import _ from "lodash";
import { getRole } from "../../../helpers/auth";

const OrderDetail = ( { order, onReload, onEdit } ) =>
{
	const [ card, setCard ] = useState( {} );
	const [ orderStatus, setOS ] = useState( '' )

	const deleteOrder = () =>
	{
		if ( window.confirm( "are you sure of deleting this order? can't be undone" ) )
			deleteData( `orders/${ order.id }` ).then( ( res ) => onReload() );
	};

	const approveOrder = () =>
	{
		if ( window.confirm( "are you sure, this cannot be undone?" ) )
			updateData( `orders/${ order.id }/approve` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					onReload();
					alert( "order successfully accepted/approved" );
					setOS( "fulfilled" )
					return;
				}

				alert( "error, could not process request" );
			} );
	};

	const activateOrder = () =>
	{
		if ( window.confirm( "are you sure?" ) )
			updateData( `orders/${ order.id }/activate` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					onReload();
					alert( "order successfully activated" );
					return;
				}

				alert( "error, could not process request" );
			} );
	};

	const cancelOrder = () =>
	{
		if ( window.confirm( "decline order?" ) )
			updateData( `orders/${ order.id }/decline` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					onReload();
					alert( "order successfully declined" );
					return;
				}

				alert( "error, could not process request" );
			} );
	};

	useEffect( () =>
	{
		setOS( order.status )
		if ( order.cardCode )
		{
			fetchData( `cards/codes/${ _.trim( order.cardCode ) }` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					_.isEmpty( res.data?.data )
						? setCard( { isEmpty: true } )
						: setCard( res.data.data );
					return;
				}
			} );
		}
	}, [ order.cardCode ] );

	// console.log(order);
	return (
		<div className="p-md-3 p-1">
			{ !order.hasOwnProperty( "id" ) ? (
				<p>Select an order</p>
			) : (
				<div>
					{ orderStatus === "fulfilled" && (
						<h3 className="text-success mb-3">
							<strong>APPROVED</strong>
						</h3>
					) }
					<div className="row">
						{/* <div className="col-12">
							{orderStatus === "pending" && (
								<div className="bg-warning py-1"></div>
							)}
							{orderStatus === "fulfilled" && (
								<div className="bg-success py-1"></div>
							)}
							{orderStatus === "cancelled" && (
								<div className="bg-danger py-1"></div>
							)}
						</div> */}
						<div className="col-md-5 col-7">
							<h3 className="mb-0">{ order.receiptNumber }</h3>
							<small>Order Receipt Number</small>
						</div>
						<div className="col-md-3 col-5">
							<h3
								className={ `mb-0 ${ order.paymentMode === "cash" ? "text-success" : "text-danger"
									}` }>
								<strong>{ order.paymentMode.toUpperCase() }</strong>
							</h3>
							<small>Payment Mode</small>
						</div>
						<div className="col-md-4 col-12 mt-4 mt-md-0">
							<h3 className="m-0">
								<strong>{ cedisLocale.format( order.orderTotal ) }</strong>
							</h3>
							<small>Order Total (GHS)</small>
						</div>
					</div>

					<hr />
					<p>
						<strong className="text-success">CUSTOMER INFORMATION</strong>
					</p>
					<hr />
					<div className="row">
						<div className="col-md-6 col-12">
							<h5 className="m-0">
								<strong>{ order.customerName }</strong>
							</h5>
							<small className="text-primary">Customer Name</small>
						</div>
						<div className="col-md-6 col-12 my-3 my-md-0">
							<h6 className="m-0">{ order.primaryContact }</h6>
							<small className="text-primary">Phone</small>
						</div>
						{ order.secondaryContact && (
							<div className="col-md-4 col-12">
								<h6 className="m-0">{ order.primaryContact }</h6>
								<small className="text-primary">Phone</small>
							</div>
						) }
					</div>
					<div className="row my-3">
						<div className="col-md-6 col-12">
							<h6 className="m-0">{ order.location }</h6>
							<small className="text-primary">Location</small>
						</div>
						{ order.email && (
							<div className="col-md-6 col-12 my-3 my-md-0">
								<h6 className="m-0">{ order.email }</h6>
								<small className="text-primary">email</small>
							</div>
						) }
					</div>

					{ order.nearestLandmark && (
						<div className="row">
							<div className="col-12">
								<h6 className="m-0">{ order.nearestLandmark }</h6>
								<small className="text-primary">Nearest Landmark</small>
							</div>
						</div>
					) }
					{ order.cardCode && (
						<>
							<hr />
							<p>
								<strong className="text-success">CARD</strong>
							</p>
							<hr />

							<div className="row">
								<div className="col-md-6 col-7">
									<strong>({ card?.card?.title })</strong>
									<h6 className="m-0">{ order.cardCode }</h6>
									<small className="text-primary">Card Number</small>
								</div>
								<div className="col-md-6 col-5">
									<h6 className="m-0">
										<strong>GHS { cedisLocale.format( order.cardAmt ) }</strong>
									</h6>
									<small>
										{ card?.card?.isFixedValue
											? "Fixed Value"
											: card?.card?.percentageValue * 100 + "% of order total" }
									</small>
									<small className="text-primary d-block">Card Value</small>
								</div>
							</div>
						</>
					) }
					{ order.paymentMode === "credit" && (
						<>
							<hr />
							<p>
								<strong className="text-success">CREDIT</strong>
							</p>
							<hr />
							<div className="row">
								<div className="col-md-4 col-6">
									<h6 className="m-0">
										{ order.governmentWorker === true ? "YES" : "NO" }
									</h6>
									<small className="text-primary">Government Worker</small>
								</div>
								<div className="col-md-4 col-6">
									<h6 className="m-0">
										{ order.businessOwner === true ? "YES" : "NO" }
									</h6>
									<small className="text-primary">Business Owner</small>
								</div>
								<div className="col-md-4 col-12 mt-3 mt-md-0">
									<h6 className="m-0">{ order.creditDuration }</h6>
									<small className="text-primary">Credit Duration</small>
								</div>
							</div>
						</>
					) }

					<hr />
					<p>
						<strong className="text-success">OTHER</strong>
					</p>
					<hr />
					<div className="row my-3">
						<div className="col-md-4 col-7">
							<h6 className="m-0">
								{ new Date( order.createdAt ).toDateString() }
							</h6>
							<small className="text-primary">Order Date</small>
						</div>
						<div className="col-md-4 col-5">
							<h6 className="m-0">
								{ new Date( order.createdAt ).toLocaleTimeString() }
							</h6>
							<small className="text-primary">Order Time</small>
						</div>
					</div>
					<div className="row mb-5">
						{ order.deliveryMethod && (
							<div className="col-md-4 col-12 my-3 my-md-0">
								<h6 className="m-0">
									{ order.deliveryMethod === "deliver" ? "Deliver" : "Pickup" }
								</h6>
								<small className="text-primary">Delivery Method</small>
							</div>
						) }
						{ order.deliveryPeriod && (
							<div className="col-md-4 col-12 mb-3">
								<h6 className="m-0">{ order.deliveryPeriod }</h6>
								<small className="text-primary">Delivery Period</small>
							</div>
						) }
						{ order.approvedBy && (
							<>
								<div className="col-md-4 col-7">
									<h6 className="m-0">{ order.user.fullName }</h6>
									<small className="text-primary">Approved By</small>
								</div>
								<div className="col-md-4 col-5">
									<h6 className="m-0">
										{ new Date( order.approvalDate ).toDateString() }
									</h6>
									<small className="text-primary">Approval Date</small>
								</div>
							</>
						) }
						{ order.comment && (
							<div className="col-12 my-3">
								<h6 className="m-0">{ order.comment }</h6>
								<small className="text-primary">Comment</small>
							</div>
						) }
					</div>

					{/* <hr />
					<p
						style={{
							backgroundColor: "#ddd",
							padding: "10px",
						}}>
						Order Line
					</p>
					<hr /> */}
					<div className="row">
						<div className="col-12">
							<table className="table table-hover">
								<thead>
									<tr>
										<th>#</th>
										<th>Product</th>
										<th>Price</th>
										<th>Qty</th>
									</tr>
								</thead>
								<tbody>
									{ order.orderDetails.map( ( item, i ) => (
										<tr key={ i }>
											<td>{ ++i }</td>
											<td>{ item.product.name }</td>
											<td>{ cedisLocale.format( item.price ) }</td>
											<td>{ item.quantity }</td>
											<td>
												<img
													src={ generateFileUrl( item.product.imageFileName ) }
													alt=""
													height="50"
												/>
											</td>
										</tr>
									) ) }
								</tbody>
							</table>
						</div>
					</div>

					<hr />
					<div className="row">
						<div className="col-12 d-flex align-items-center">
							<strong>Delivery Charge: </strong>
							<h6 className="ml-2 m-0">
								GHS { cedisLocale.format( order.deliveryCost ) }
							</h6>
						</div>
						<div className="col-12 my-3">
							<h5>
								Total Due:
								<strong className="text-success ml-2">
									GHS{ " " }
									{ cedisLocale.format(
										order.cardCode
											? parseFloat( order.orderTotal ) +
											parseFloat( order.deliveryCost || 0 ) -
											parseFloat( order.cardAmt )
											: parseFloat( order.orderTotal ) +
											parseFloat( order.deliveryCost || 0 )
									) }
								</strong>
							</h5>
							<small>
								Amount { orderStatus === "fulfilled" ? "paid" : "to be paid" } by
								customer
							</small>
						</div>
						<div className="col-12">
							{ orderStatus === "pending" && getRole() !== "staff" && (
								<>
									<button
										className="btn-primary-filled"
										onClick={ () => approveOrder() }>
										<i className="bi bi-check-all"></i>
										approve order
									</button>

									<button
										className="btn-dc-white"
										onClick={ () => cancelOrder() }>
										<i className="bi bi-x-circle-fill mr-1"></i>
										decline
									</button>
								</>
							) }
							{ orderStatus === "cancelled" && getRole() !== "staff" && (
								<button
									className="btn-primary-filled"
									onClick={ () => activateOrder() }>
									<i className="bi bi-check-all"></i>
									activate order
								</button>
							) }
							{/* <button className="btn-dc-white" onClick={() => deleteOrder()}>
								<i className="bi bi-trash mr-1"></i>
								delete
							</button> */}
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export { OrderDetail };

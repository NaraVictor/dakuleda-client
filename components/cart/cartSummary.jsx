import React from "react";

const CartSummary = (props) => {
	return (
		<div className="col">
			<table className="table table-condensed">
				<tbody>
					<tr>
						<td>Subtotal</td>
						<td>ghs 100</td>
					</tr>
					<tr>
						<td>Delivery</td>
						<td>Free</td>
					</tr>

					<tr>
						<td>Est Total</td>
						<td>
							<h5>GHS 100</h5>
						</td>
					</tr>
				</tbody>
			</table>
			<hr />

			<button
				className="btn-primary-filled py-1 w-100"
				onClick={props.onCheckOut}>
				Checkout
			</button>
		</div>
	);
};

export default CartSummary;

import React from "react";

const Features = ( { features } ) =>
{
	return (
		<section className="container">
			<div className="row">
				<div className="col">
					{/* <h4>Product Features</h4> */ }
					{/* <hr /> */ }
					{ features === undefined || features.length <= 0 ? (
						<h5 className="my-5 alert alert-danger">
							No product features available
						</h5>
					) : (
						<table className="table  table-hover">
							<tbody>
								{ features.map( ( feat ) => (
									<tr key={ feat.id }>
										<td>
											<strong>{ feat.title }</strong>
										</td>
										<td>{ feat.feature }</td>
									</tr>
								) ) }
							</tbody>
						</table>
					) }
				</div>
			</div>
		</section>
	);
};

export default Features;

import { useForm } from "react-hook-form";
import { newProductContext } from "../../../context/newProductContext";
import { useContext, useEffect } from "react";

const NewProductFeatures = () =>
{
	const ctx = useContext( newProductContext );

	const { handleSubmit, reset, register } = useForm();

	const deleteFeature = ( featureId ) =>
	{
		ctx.deleteFeature( featureId );
	};

	const addFeature = ( data ) =>
	{
		ctx.addFeature( data ) && reset();
	};

	return (
		<div className="row">
			<div className="col-md-7 col-12">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Title</th>
							<th>Feature</th>
						</tr>
					</thead>
					<tbody>
						{ ctx.getFeatures().length > 0 ? (
							ctx.getFeatures().map( ( s ) => (
								<tr key={ s.title }>
									<td>{ s.title }</td>
									<td>{ s.feature }</td>
									<td>
										<a
											href="#"
											onClick={ () =>
											{
												if ( window.confirm( "proceed to deleting feature?" ) )
												{
													deleteFeature( s.title );
												}
											} }>
											delete
										</a>
									</td>
								</tr>
							) )
						) : (
							<p>No features found. Consider adding some</p>
						) }
					</tbody>
				</table>
			</div>
			<div className="col-md-5 col-12">
				<h5>Add a feature</h5>
				<hr />
				<form onSubmit={ handleSubmit( addFeature ) }>
					<div>
						<label htmlFor="title" className="d-form-label">
							Title *
						</label>
						<input
							type="text"
							id="title"
							required
							className="d-form-control w-100 shadow"
							{ ...register( "title", { required: true } ) }
						/>
					</div>
					<div className="my-3">
						<label htmlFor="title" className="d-form-label">
							Feature *
						</label>
						<textarea
							type="text"
							id="feature"
							required
							className="d-form-control w-100 shadow"
							{ ...register( "feature", { required: true } ) }></textarea>
					</div>
					<button className="btn-dc-white" type="submit">
						<i className="bi bi-plus"></i>
						add feature
					</button>
				</form>
			</div>
		</div>
	);
};

export { NewProductFeatures };

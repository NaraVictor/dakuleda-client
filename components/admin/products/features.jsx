import { useEffect, useState } from "react";
import { fetchData, deleteData, postData } from "../../../helpers/utilities";
import { useForm } from "react-hook-form";

const ProductFeatures = ( { productId } ) =>
{
	const [ features, setFeatures ] = useState( [] );
	const { handleSubmit, reset, register } = useForm();

	const fetchFeats = () =>
	{
		fetchData( `products/${ productId }/features` ).then( ( r ) =>
		{
			setFeatures( r.data?.data );
		} );
	};

	const deleteFeature = ( featureId ) =>
	{
		deleteData( `products/${ productId }/features/${ featureId }` );
	};

	const submitFeature = ( data ) =>
	{
		postData( `products/${ productId }/features`, data ).then( ( r ) =>
		{
			if ( r.status === 200 )
			{
				fetchFeats();
				reset();
				alert( "feature successfully added!" );
				return;
			}

			alert( "something went wrong" );
		} );
	};

	useEffect( () =>
	{
		productId !== undefined && fetchFeats();
	}, [] );

	return (
		<div className="row">
			<div className="col-md-8 col-12">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Title</th>
							<th>Feature</th>
						</tr>
					</thead>
					<tbody>
						{ features.length > 0 ? (
							features.map( ( s ) => (
								<tr key={ s.id }>
									<td>{ s.title }</td>
									<td>{ s.feature }</td>
									<td>
										<a
											href="#"
											onClick={ () =>
											{
												if ( window.confirm( "proceeding deleting feature?" ) )
												{
													deleteFeature( s.id );
													fetchFeats();
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
			<div className="col-md-4 col-12 mt-5 mt-md-0">
				<h5>Add a feature</h5>
				<hr />
				<form onSubmit={ handleSubmit( submitFeature ) }>
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

export { ProductFeatures };

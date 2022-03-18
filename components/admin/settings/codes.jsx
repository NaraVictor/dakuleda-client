import { useEffect, useState } from "react";
import { fetchData, deleteData, postData } from "../../../helpers/utilities";
import { useForm } from "react-hook-form";
import { getRole } from "../../../helpers/auth";

const CardCodes = ( { cardId, codeObj } ) =>
{
	const [ codes, setCodes ] = useState( [] );
	const [ counter, setCounter ] = useState( 1 );
	const { handleSubmit, reset, register } = useForm();

	const fetchCodes = () =>
	{
		fetchData( `cards/${ cardId }/codes` ).then( ( r ) =>
		{
			setCodes( r.data?.data );
		} );
	};

	const deleteCode = async ( codeId ) =>
	{
		deleteData( `cards/${ cardId }/codes/${ codeId }` );
		await fetchCodes();
	};

	const submitCode = ( data ) =>
	{
		postData( `cards/${ cardId }/codes`, data )
			.then( ( r ) =>
			{
				if ( r.status === 200 )
				{
					// fetchCodes();
					reset();
					setCounter( counter + 1 );
					alert( "code successfully added!" );
					return;
				}
				throw new Error( r );
			} )
			.catch( ( ex ) =>
			{
				if ( ex.toString().includes( "409" ) )
				{
					alert( "the code is already taken" );
					return;
				}
				alert( "something went wrong" );
			} );
	};

	useEffect( () =>
	{
		!codeObj ? fetchCodes() : setCodes( [ ...codeObj ] );
	}, [ counter ] );

	return (
		<div className="row mt-0">
			<div className="col-md-7 col-12 order-md-1 order-2 mt-0">
				<strong>{ codes.length }</strong> codes
				|
				<strong className="ml-3 mx-3">
					{ codes.filter( ( c ) => c.isUsed === true ).length }
				</strong>{ " " }
				used
				-
				<strong className="ml-3">
					{ codes.filter( ( c ) => c.isUsed === false ).length }
				</strong>{ " " }
				available

				<table className="table table-hover">
					<thead>
						<tr>
							<th>Code</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{ codes.length > 0 ? (
							codes.map( ( s ) => (
								<tr key={ s.id }>
									<td>{ s.code }</td>
									<td>
										{ s.isUsed ? (
											<strong className="text-danger">Used</strong>
										) : (
											<strong className="text-success">Available</strong>
										) }
									</td>
									{ getRole() === "admin" && !s.isUsed && (
										<td>
											<a
												href="#"
												onClick={ () =>
												{
													if ( window.confirm( "proceed to deleting code?" ) )
													{
														deleteCode( s.id ).then( ( r ) =>
															setCounter( counter + 1 )
														);
													}
												} }>
												delete
											</a>
										</td>
									) }
								</tr>
							) )
						) : (
							<p>No codes found. Consider adding some</p>
						) }
					</tbody>
				</table>
			</div>
			<div className="col-md-5 col-12 order-md-2 order-1 mb-3 mb-md-0">
				<form onSubmit={ handleSubmit( submitCode ) }>
					<div className="row">
						<h5>Add Code</h5>
						<div className="col-12 p-0">
							<label htmlFor="card" className="d-form-label">
								Code (card number and serial) *
							</label>
						</div>
					</div>
					<div className="row">
						<input
							type="text"
							id="card"
							maxLength="3"
							required
							placeholder="XXX"
							className="d-form-control col-4 shadow mr-1"
							{ ...register( "card", { required: true } ) }
						/>
						<input
							type="text"
							id="serial"
							maxLength="5"
							placeholder="XXXXX"
							required
							className="d-form-control col-7 shadow"
							{ ...register( "serial", { required: true } ) }
						/>

						<button className="btn-dc-white mt-3" type="submit">
							<i className="bi bi-plus"></i>
							add code
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export { CardCodes };

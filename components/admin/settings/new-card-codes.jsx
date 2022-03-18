import { useContext } from "react";
import { useForm } from "react-hook-form";
import { shopContext } from "../../../context/shopContext";

const NewCardCodes = ( { vendorCode = "XXX" } ) =>
{
	const ctx = useContext( shopContext );
	const { handleSubmit, reset, register } = useForm();

	const submitCode = ( data ) =>
	{
		const code = {
			code: vendorCode + "-" + data.card + "-" + data.serial,
			...data,
		};
		ctx.addCode( code );
	};

	return (
		<div className="row mt-0">
			<div className="col-md-7 col-12 mt-0">
				<small>{ ctx.getCodes().length } codes</small>

				<table className="table table-hover">
					<thead>
						<tr>
							<th>Code</th>
						</tr>
					</thead>
					<tbody>
						{ ctx.getCodes().length > 0 ? (
							ctx.getCodes().map( ( c ) => (
								<tr key={ c.code }>
									<td>{ c.code }</td>
									<td>
										<a
											href="#"
											onClick={ () =>
											{
												if ( window.confirm( "proceeding deleting code?" ) )
												{
													ctx.deleteCode( c.code );
												}
											} }>
											delete
										</a>
									</td>
								</tr>
							) )
						) : (
							<p>No codes found. Consider adding some</p>
						) }
					</tbody>
				</table>
			</div>
			<div className="col-md-5 col-12">
				<h5>Add Code</h5>
				<hr />
				<form onSubmit={ handleSubmit( submitCode ) } className='ml-2'>
					<label htmlFor="card" className="d-form-label">
						Code (card number and serial) *
					</label>
					<div className="row">
						<input
							type="text"
							id="card"
							maxLength="3"
							required
							placeholder="XXX"
							className="d-form-control col-4 shadow mr-2"
							{ ...register( "card", { required: true } ) }
						/>
						<input
							type="text"
							id="serial"
							maxLength="5"
							placeholder="XXXXX"
							required
							className="d-form-control col-6 shadow"
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

export { NewCardCodes };

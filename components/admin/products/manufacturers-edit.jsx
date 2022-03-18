import { updateData } from "../../../helpers/utilities";
import { useState } from "react";

const ManufacturerEdit = ( { obj, onReload, onEdit } ) =>
{
	const [ record, setRecord ] = useState( {
		id: obj.id,
		name: obj.name,
		email: obj.email,
		website: obj.website,
	} );
	const [ busy, setBusy ] = useState( false );

	const handleChange = ( e ) =>
	{
		const { name, value } = e.target;
		setRecord( {
			...record,
			[ name ]: value,
		} );
	};

	const updateRecord = () =>
	{
		setBusy( true );
		updateData( "manufacturers", { ...record } )
			.then( ( res ) =>
			{
				onReload( true );
				alert( "manufacture update successful" );
			} )
			.finally( () => setBusy( false ) );
	};

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{ busy ? "Updating: " : "Editing: " } </strong> { obj.name }
						</h4>
					</div>
				</div>
				<hr />

				<div className="row">
					<div className="col-12 mb-3">
						<label htmlFor="name" className="d-form-label">
							Name *
						</label>
						<input
							type="text"
							id="name"
							name="name"
							required
							className="d-form-control w-100"
							value={ record.name }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-12 mb-3">
						<label htmlFor="email" className="d-form-label">
							Email
						</label>
						<input
							type="text"
							id="email"
							name="email"
							className="d-form-control w-100"
							value={ record.email }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-12 mb-3">
						<label htmlFor="website" className="d-form-label">
							Website
						</label>
						<input
							type="text"
							id="website"
							name="website"
							required
							className="d-form-control w-100"
							value={ record.website }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12">
						<button
							className="btn-dc-white"
							disabled={ busy }
							onClick={ () => updateRecord() }>
							<i className="bi bi-arrow-clockwise"></i>
							{ busy ? "updating..." : "update record" }
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { ManufacturerEdit };

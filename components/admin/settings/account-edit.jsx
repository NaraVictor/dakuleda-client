import { updateData } from "../../../helpers/utilities";
import { useState } from "react";

const AccountEdit = ( { user, onReload, onEdit } ) =>
{
	const [ record, setRecord ] = useState( {
		id: user.id,
		fullName: user.fullName,
		email: user.email,
		username: user.username,
		role: user.role,
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
		updateData( `accounts`, { ...record } )
			.then( ( res ) =>
			{
				onReload( true );
				alert( "account update successful" );
			} )
			.finally( () => setBusy( false ) );
	};

	return (
		<div className="p-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{ busy ? "Updating: " : "Editing: " } </strong>{ " " }
							{ user.fullName }
						</h4>
					</div>
				</div>
				<hr />

				<div className="row">
					<div className="col-12 mb-3">
						<label htmlFor="fullName" className="d-form-label">
							Fullname *
						</label>
						<input
							type="text"
							id="fullName"
							name="fullName"
							required
							className="d-form-control w-100"
							value={ record.fullName }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-12">
						<label htmlFor="username" className="d-form-label">
							Username *
						</label>
						<input
							type="text"
							id="username"
							name="username"
							required
							className="d-form-control w-100"
							value={ record.username }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-12 my-3">
						<label htmlFor="email" className="d-form-label">
							Email *
						</label>
						<input
							type="text"
							id="email"
							name="email"
							required
							className="d-form-control w-100"
							value={ record.email }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-12">
						<label htmlFor="role" className="d-form-label">
							Role *
						</label>
						<select
							type="text"
							id="role"
							name="role"
							required
							className="d-form-control w-100"
							value={ record.role }
							onChange={ ( e ) => handleChange( e ) }>
							<option value="manager">Manager</option>
							<option value="staff">Staff</option>
							<option value="admin">Admin</option>
						</select>
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

export { AccountEdit };

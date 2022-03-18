import { deleteData } from "../../../helpers/utilities";
import { useState, useEffect } from "react";

const AccountDetail = ( { user, onReload, onEdit } ) =>
{
	const [ userObj, setUser ] = useState( {} );

	const updateStatus = () =>
	{
		deleteData( `accounts/${ user.id }` ).then( ( res ) =>
		{
			onReload( true );
			setUser( {
				...userObj,
				isDeleted: !user.isDeleted,
			} );
		} );
		alert( "user status updated. " );
	};

	useEffect( () =>
	{
		setUser( {
			...user,
		} );
	}, [ user ] );

	return (
		<div className="p-3">
			{ !user.hasOwnProperty( "id" ) ? (
				<p>Select a user</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{ user.fullName }</h3>
							<small>Fullname</small>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<p>
								Username: <strong>{ user.username }</strong>
							</p>
						</div>
						<div className="col-12">
							<p>
								Email: <strong>{ user.email }</strong>
							</p>
						</div>
						<div className="col-12">
							<p>
								Role: <strong>{ user.role }</strong>
							</p>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							<button
								className="btn-dc-white"
								onClick={ () => onEdit( user, true ) }>
								<i className="bi bi-pencil"></i>
								edit
							</button>

							<button
								onClick={ () => ( window.location.href = "/auth/change-password" ) }
								className="btn-dc-white">
								<i className="bi bi-lock"></i>
								change password
							</button>
							<button className="btn-dc-white" onClick={ () => updateStatus() }>
								<i className="bi bi-mouse"></i>
								{ userObj.isDeleted ? "activate" : "de-activate" }
							</button>
							<div
								className={ `text-white col-12 py-1 mt-4 ${ userObj.isDeleted ? "bg-danger" : "bg-success"
									}` }>
								{ userObj.isDeleted ? "Account de-activated" : "Account active" }
							</div>
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export { AccountDetail };

import { useState, useEffect } from "react";
import { fetchData } from "../../../helpers/utilities";
import { AccountDetail } from "./account-detail";
import { AccountEdit } from "./account-edit";
import Link from 'next/link'
const AccountsComponent = ( props ) =>
{
	const [ users, setUsers ] = useState( [] );
	const [ selected, setSelected ] = useState( {} );
	const [ mode, setMode ] = useState( {
		edit: false,
		data: {},
	} );

	const handleEdit = ( data, editMode ) =>
	{
		setMode( {
			edit: editMode,
			data,
		} );
	};

	const selectItem = ( item ) =>
	{
		setSelected( item );
		setMode( {
			...mode,
			edit: false,
		} );
	};

	const fetchUsers = () =>
	{
		fetchData( "accounts" ).then( ( res ) => setUsers( res?.data?.data ) );
	};

	useEffect( () =>
	{
		fetchUsers();
	}, [] );

	return (
		<div className="components">
			<div className="buttons my-4">
				<Link className="btn-dc-white p-2" href="/auth/--add-user">
					<>
						<i className="bi bi-plus"></i>
						add user account
					</>
				</Link>
			</div>
			<div className="row">
				<div className="col-md-5 col-12">

					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Name</th>
								<th>Username</th>
							</tr>
						</thead>
						<tbody>
							{ users.map( ( user ) => (
								<tr
									key={ user.id }
									onClick={ () => selectItem( user ) }
									className={ `${ user.id === selected.id && "bg-info" }` }>
									<td>{ user.fullName }</td>
									<td>{ user.username }</td>
									{ user.isDeleted && <td className="bg-danger px-1"></td> }
								</tr>
							) ) }
						</tbody>
					</table>
				</div>
				<div className="col-md-7 col-12">
					<div className="shadow detail-view">
						{ mode.edit ? (
							<AccountEdit user={ mode.data } onReload={ fetchUsers } />
						) : (
							<AccountDetail
								user={ selected }
								onEdit={ handleEdit }
								onReload={ fetchUsers }
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export { AccountsComponent };

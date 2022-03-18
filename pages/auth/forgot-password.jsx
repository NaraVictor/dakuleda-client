import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { postData, setLayout } from "../../helpers/utilities";
import PageTitle from "../../components/page-title";
import { shopContext } from "../../context/shopContext";

const ForgotPassword = ( props ) =>
{
	const { register, handleSubmit, reset } = useForm();
	const [ loginError, setError ] = useState( false );
	const [ errMsg, setErrMsg ] = useState( "Error" );
	const [ btnLabel, setLabel ] = useState( "Forgot Password" );
	const { setLayout } = useContext( shopContext )
	setLayout( '' )

	const onSubmit = ( data ) =>
	{
		setLabel( () =>
		{
			return "Forgetting...";
		} );

		postData( "accounts/forgot-password", data )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					setError( false );
					setLabel( () =>
					{
						return "Forgot Password";
					} );
					reset();

					alert( "Check your email for a new password" );
					// if ( returnUrl ) return history.replace( returnUrl );
					return;
				}

				setError( true );
				setLabel( () =>
				{
					return "Try again!";
				} );
				setErrMsg(
					"Password could not be reset. Ensure email is correct and has an account"
				);
			} )
			.catch( ( err ) =>
			{
				setError( true );
				setLabel( () =>
				{
					return "Forgot Password";
				} );

				//messages
				if ( err.response?.status === 403 )
					return setErrMsg( "Access denied. You are not authorized" );

				if ( err.response?.status === 404 )
					return setErrMsg( "Account does not exist" );

				if ( err.response?.status === 500 ) return setErrMsg( "Server error" );

				setErrMsg( "Something went wrong. Contact Administrator" );
			} );
	};

	return (
		<div className="row mx-auto">
			<PageTitle title="Forgot Password" />
			<div className="col-md-3 col-10 mx-auto">
				<div className="p-3 bg-white rounded shadow mt-5">
					<form onSubmit={ handleSubmit( onSubmit ) } autoComplete="off">
						<h3>
							<strong>Forgot Password</strong>
						</h3>
						{ loginError && (
							<div className="bg-danger p-1 mb-3 text-center text-white rounded">
								<small>{ errMsg }</small>
							</div>
						) }
						<div className="row">
							<div className="col-12">
								<input
									autoFocus
									required
									type="email"
									label="Email"
									className="w-100 form-control"
									{ ...register( "email", { required: true } ) }
								/>
							</div>
						</div>
						<small className="ms-1 my-1 mb-2">
							submit your account email for a new password
						</small>
						<p></p>

						<button type="submit" className="w-100 btn btn-success">
							{ btnLabel }
						</button>

						<div className="d-flex justify-content-between mt-3 pe-2">
							<div className="forgot-password">
								I will <Link href="/auth/change-password">change password</Link>
							</div>
							<div className="forgot-password">
								<Link href="/auth/login">Login</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;

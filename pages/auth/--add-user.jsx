import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import PageTitle from "../../components/page-title";
import { shopContext } from "../../context/shopContext";
import { setLayout, postData } from "../../helpers/utilities";

//
const SignUpPage = ( props ) =>
{
	const { register, handleSubmit, reset } = useForm();
	const [ btnLabel, setLabel ] = useState( "Create Account" );
	const [ submitted, setSubmission ] = useState( false );
	const [ error, setError ] = useState( false );
	const [ busy, setBusy ] = useState( false );
	const [ errMsg, setErrMsg ] = useState( "An error has ocurred!" );
	const { setLayout } = useContext( shopContext )
	setLayout( '' )

	const signupBtn = (
		<button
			type="submit"
			disabled={ busy }
			className="mt-3 w-100 btn btn-primary">
			{ btnLabel }
		</button>
	);



	const onSubmit = async ( data ) =>
	{
		try
		{
			setBusy( true );
			setError( false );
			setLabel( "Please wait..." );
			const signup = await postData( "accounts/signup", data );

			if ( signup.status === 200 )
			{
				setSubmission( true );
				reset();
				props.onDone();
				setLabel( "Create Account" );
				return;
			}

			setError( true );
			setLabel( "Create Account" );
			setErrMsg( "Request could not be completed. Account may already exist" );
			setBusy( false );
		} catch ( ex )
		{
			if ( ex?.response?.status === 409 )
			{
				setError( true );
				setLabel( "Create Account" );
				setErrMsg( "User already exist" );
				return;
			}

			setError( true );
			setLabel( "Create Account" );
			setBusy( false );
		}
	};

	return (
		<div className="auth mt-5">
			<PageTitle title="Signup" />
			<div className="row">
				<div className="mx-auto col-md-3 col-10">
					<div className="outer shadow p-4 m-auto">
						{ submitted === false ? (
							<>
								{ error && (
									<div className="bg-danger p-2 mb-3 text-center text-white">
										<small>{ errMsg }</small>
									</div>
								) }
								<h4 className="text-center">Create User Account</h4>
								<hr />

								<form onSubmit={ handleSubmit( onSubmit ) }>
									<div className="row">
										<div className="col-12 mb-2">
											<select
												id="role"
												required
												name="role"
												{ ...register( "role", { required: true } ) }
												className="custom-select form-control">
												<option defaultValue value="">
													select role
												</option>
												<option value="manager">Manager</option>
												<option value="staff">Staff</option>
												<option value="admin">Admin</option>
											</select>
										</div>
										<div className="col-12">
											<input
												{ ...register( "fullName", { required: true } ) }
												type="text"
												placeholder="full name"
												className="form-control"
											/>
										</div>
										<div className="col-12 my-2">
											<input
												{ ...register( "username", { required: true } ) }
												type="text"
												placeholder="username"
												className="form-control"
											/>
										</div>
										<div className="col-12 mb-2">
											<input
												{ ...register( "email", { required: true } ) }
												type="email"
												placeholder="email"
												className="form-control"
											/>
										</div>
										<div className="col-12">
											<input
												{ ...register( "password", { required: true } ) }
												type="password"
												placeholder="password"
												className="form-control"
											/>
										</div>
									</div>

									{ signupBtn }
								</form>
								{/* <p>
								<Link to="/login">login instead</Link>
							</p> */}
							</>
						) : (
							<div className="text-center">
								<h5 className="mt-3 text-success">
									User Account successfully created
								</h5>
								<button
									className="btn btn-secondary"
									onClick={ () => setSubmission( false ) }>
									Continue
								</button>
							</div>
						) }
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;

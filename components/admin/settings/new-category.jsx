import { useForm } from "react-hook-form";
import { postData, uploadFile } from "../../../helpers/utilities";
import { useState } from "react";
const NewCategory = ( props ) =>
{
	const { register, handleSubmit, reset } = useForm();
	const [ busy, setBusy ] = useState( false );
	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

	const imageUpload = ( e ) =>
	{
		if ( e.target.value )
		{
			setImage( {
				file: e.target.files,
				url: URL.createObjectURL( e.target.files[ 0 ] ),
			} );
		}
	};

	const submitData = ( data ) =>
	{
		if ( image.url === "" )
		{
			alert( "please upload a category picture" );
			return;
		}

		setBusy( true );
		postData( "categories", { ...data } )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					uploadFile(
						`categories/${ res.data.data.id }/upload-picture`,
						image.file[ 0 ],
						"categoryImage"
					).then( ( res ) =>
					{
						reset();
						props.onReload();
						setImage( {
							file: {},
							url: "",
						} );
						alert( "category created successfully" );
					} );
				}
			} )
			.catch( ( ex ) => alert( "an error occurred" ) )
			.finally( () => setBusy( false ) );
	};

	return (
		<div>
			{/* <div className="d-flex justify-content-between align-items-center">
				<h5>New Category</h5>
				<button className="btn" onClick={ () => props.history.go( -1 ) }>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr /> */}
			<div className="px-2 d-flex justify-content-between">
				<button
					className={ `${ busy ? "btn-dc-white" : "btn-primary-filled"
						} px-4 py-2` }
					disabled={ busy }
					onClick={ () => document.getElementById( "submitter" ).click() }>
					<i className="bi bi-check-all"></i>
					{ busy ? "processing..." : "Submit" }
				</button>
				<button
					className="btn-dc-white"
					onClick={ () => document.getElementById( "categoryImage" ).click() }>
					<i className="bi bi-image mr-1"></i>
					upload image
				</button>
			</div>

			<hr />

			<form id="form" onSubmit={ handleSubmit( submitData ) }>
				<div className="row">
					<div className="col-md-7 col-12">
						<div className="col-12">
							{/* <p>
								<strong>Slug:</strong> category-name
							</p> */}
							<label htmlFor="name" className="d-form-label">
								Category Name *
							</label>
							<input
								type="text"
								id="name"
								required
								className="d-form-control w-100 shadow"
								{ ...register( "name", { required: true } ) }
							/>
						</div>
						<div className="col-12 my-3">
							<label htmlFor="description" className="d-form-label">
								Description
							</label>
							<input
								type="text"
								id="description"
								className="d-form-control w-100 shadow"
								{ ...register( "description" ) }
							/>
						</div>
					</div>
					<div className="col-md-5 col-12">
						{ image.url && (
							<img
								src={ image.url }
								alt="category img"
								style={ {
									maxHeight: "250px",
									maxWidth: "200px",
								} }
							/>
						) }
					</div>
				</div>
				<input
					type="file"
					name="categoryImage"
					id="categoryImage"
					onChange={ ( e ) => imageUpload( e ) }
					hidden
					accept=".jpg, .png, .gif, .jpeg"
				/>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewCategory };

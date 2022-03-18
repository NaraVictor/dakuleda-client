import { useState } from "react";
import { useForm } from "react-hook-form";
import { postData, uploadFile } from "../../../helpers/utilities";
const NewSlider = ( props ) =>
{
	// const [hasButton, setHasButton] = useState(false);
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
		setBusy( true );

		// ensure user has uploaded a slider image
		if ( image.url === "" )
		{
			alert( "please upload a category picture" );
			return;
		}

		postData( "sliders", { ...data } )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					uploadFile(
						`sliders/${ res.data.data.id }/upload-picture`,
						image.file[ 0 ],
						"sliderImage"
					).then( ( res ) =>
					{
						reset();
						props.onReload()
						setImage( {
							file: {},
							url: "",
						} );
						alert( "slider created successfully" );
					} );
				}
			} )
			.catch( ( ex ) => alert( "an error occurred" ) )
			.finally( () => setBusy( false ) );
	};
	return (
		<div>
			{/* <div className="d-flex justify-content-between align-items-center">
				<h5>New Slider</h5>
				<button className="btn" onClick={ () => props.history.go( -1 ) }>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr /> */}
			<div className="d-flex justify-content-between align-items-center">
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
					onClick={ () => document.getElementById( "sliderUploader" ).click() }>
					<i className="bi bi-image mr-1"></i>
					upload image
				</button>
			</div>
			<hr />

			<form onSubmit={ handleSubmit( submitData ) }>
				<div className="row">
					<div className="col-12">
						<label htmlFor="title" className="d-form-label">
							Title *
						</label>
						<input
							type="text"
							id="title"
							placeholder="slider title"
							{ ...register( "title", { required: true } ) }
							className="d-form-control w-100 shadow"
						/>
					</div>
					<div className="col-12 my-3">
						<label htmlFor="url" className="d-form-label">
							Url
						</label>
						<input
							type="text"
							id="url"
							placeholder="link that slider will send user to when clicked"
							className="d-form-control w-100 shadow"
							{ ...register( "url" ) }
						/>
					</div>
					{/* <div className="col-9 my-3">
							<label htmlFor="descripton" className="d-form-label">
								Description
							</label>
							<input
								type="text"
								placeholder="text will be displayed in slider"
								id="descripton"
								className="d-form-control w-100 shadow"
								{...register("description")}
							/>
						</div> */}
					{/* <div className="col-9 mt-5">
							<input
								type="checkbox"
								id="hasButton"
								{...register("hasButton")}
								onClick={() => setHasButton(!hasButton)}
							/>
							<label htmlFor="hasButton" className="ml-3">
								Add Button
							</label>
						</div>
						{hasButton && (
							<div className="col-9">
								<label htmlFor="buttonText" className="d-form-label">
									Button Label
								</label>
								<input
									type="text"
									id="buttonText"
									{...register("buttonText")}
									placeholder="a label for the button"
									className="d-form-control w-100 shadow"
								/>
							</div>
						)} */}
					<div className="col-12 mt-3">
						{ image.url && (
							<img
								src={ image.url }
								alt="slider img"
								style={ {
									maxHeight: "250px",
									maxWidth: "300px",
								} }
							/>
						) }
					</div>
				</div>
				<input
					type="file"
					name="sliderImage"
					id="sliderUploader"
					onChange={ ( e ) => imageUpload( e ) }
					hidden
					accept=".jpg, .png, .gif, .jpeg"
				/>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export { NewSlider };

import { updateData, uploadFile, generateFileUrl } from "../../../helpers/utilities";
import { useState, useEffect } from "react";
import placeholder from "../../../static/img/placeholder.png";
import { Button } from "antd";

const SliderEdit = ( { obj, onReload, onEdit } ) =>
{
	const [ record, setRecord ] = useState( {
		id: obj.id,
		title: obj.title,
		imageFileName: obj.imageFileName,
		url: obj.url,
	} );
	const [ busy, setBusy ] = useState( false );
	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

	const imageUpload = ( e ) =>
	{
		const { target } = e;
		if ( target.value )
		{
			// ensure its size is below 5mb (in bytes)
			if ( target.files[ 0 ].size > 5000000 )
			{
				alert( "file size must not exceed 5MB. Try again" );
				return;
			}

			setImage( {
				file: target.files,
				url: URL.createObjectURL( target.files[ 0 ] ),
			} );
			uploadFile(
				`sliders/${ record.id }/upload-picture`,
				target.files[ 0 ],
				"sliderImage"
			).then( ( res ) =>
			{
				if ( res?.status === 200 )
				{
					alert( "image successfully changed" );
					onReload( true );
					return;
				}
			} );

			return;
		}
		alert( "image update failed" );
	};

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
		updateData( `sliders/${ record.id }`, { ...record } )
			.then( ( res ) =>
			{
				onReload( true );
				alert( "slider update successful" );
			} )
			.finally( () => setBusy( false ) );
	};

	return (
		<div className="p-md-3">
			<div>
				<div className="row">
					<div className="col-12">
						<h4 className="mb-0">
							<strong>{ busy ? "Updating: " : "Editing: " } </strong> { obj.title }
						</h4>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12">
						<label htmlFor="title" className="d-form-label">
							Title *
						</label>
						<input
							type="text"
							id="title"
							name="title"
							value={ record.title }
							onChange={ ( e ) => handleChange( e ) }
							placeholder="slider title"
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
							name="url"
							value={ record.url }
							onChange={ ( e ) => handleChange( e ) }
							placeholder="link that slider will send user to when clicked"
							className="d-form-control w-100 shadow"
						/>
					</div>
					<div className="col-12">
						{ !image.url && (
							<img
								src={ generateFileUrl( record.imageFileName ) || placeholder }
								alt="slider"
								id="sliderImage"
								style={ {
									maxHeight: "200px",
									maxWidth: "300px",
								} }
							/>
						) }
						{ image.url && (
							<img
								src={ image.url }
								alt="slider"
								id="updatedImage"
								style={ {
									maxHeight: "200px",
									maxWidth: "300px",
								} }
							/>
						) }
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12">
						<Button
							type="primary"
							loading={ busy }
							onClick={ () => updateRecord() }>
							{ !busy && <i className="bi bi-arrow-clockwise mr-2"></i> }
							update record
						</Button>
						<Button
							onClick={ () => document.getElementById( "sliderUpload" ).click() }>
							<i className="bi bi-image mr-2"></i>
							update image
						</Button>
						<input
							type="file"
							name="sliderImage"
							id="sliderUpload"
							onChange={ ( e ) => imageUpload( e ) }
							hidden
							accept=".jpg, .png, .gif, .jpeg"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { SliderEdit };

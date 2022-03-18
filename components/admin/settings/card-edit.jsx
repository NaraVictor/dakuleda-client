import { updateData, uploadFile, generateFileUrl } from "../../../helpers/utilities";
import { useState, useEffect } from "react";
import { Button } from "antd";

const CardEdit = ( { obj, onReload, onEdit } ) =>
{
	const [ record, setRecord ] = useState( {
		id: obj.id,
		title: obj.title,
		description: obj.description,
		startDate: obj.startDate,
		endDate: obj.endDate,
		vendorCode: obj.vendorCode,
		imageFileName: obj.imageFileName,
		isFixedValue: obj.isFixedValue,
		fixedValue: obj.fixedValue,
		percentageValue: obj.percentageValue * 100,
	} );
	const [ busy, setBusy ] = useState( false );
	const [ isFixed, setIsFixed ] = useState( false );

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

			uploadFile(
				`cards/${ record.id }/upload-picture`,
				e.target.files[ 0 ],
				"cardImage"
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

		if ( record.fixedValue === 0 && record.percentageValue === 0 )
		{
			alert( "card must either have a fixed or percentage value" );
			setBusy( false );

			return;
		}

		if ( record.fixedValue > 0 && record.percentageValue > 0 )
		{
			alert( "card cannot have both fixed and percentage values" );
			setBusy( false );

			return;
		}

		updateData( "cards", { ...record, isFixedValue: isFixed } )
			.then( ( res ) =>
			{
				onReload( true );
				alert( "Card update successful" );
			} )
			.finally( () => setBusy( false ) );
	};

	useEffect( () =>
	{
		setIsFixed( record.isFixedValue );
	}, [] );

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
					<div className="col-md-6 col-12 mb-3">
						<label htmlFor="title" className="d-form-label">
							Title *
						</label>
						<input
							type="text"
							id="title"
							name="title"
							required
							className="d-form-control w-100"
							value={ record.title }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-md-6 col-12 mb-3">
						<label htmlFor="amount" className="d-form-label">
							Vendor Code *
						</label>
						<input
							type="text"
							id="vendorCode"
							name="vendorCode"
							required
							className="d-form-control w-100"
							value={ record.vendorCode }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-md-6 col-12 mb-3">
						<label htmlFor="startDate" className="d-form-label">
							Start Date *
						</label>
						<input
							type="date"
							id="startDate"
							name="startDate"
							required
							className="d-form-control w-100"
							value={ record.startDate }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-md-6 col-12 mb-3">
						<label htmlFor="endDate" className="d-form-label">
							End Date *
						</label>
						<input
							type="date"
							id="endDate"
							name="endDate"
							required
							className="d-form-control w-100"
							value={ record.endDate }
							onChange={ ( e ) => handleChange( e ) }
						/>
					</div>
					<div className="col-md-6 col-12 mb-3">
						<input
							type="radio"
							onClick={ () => setIsFixed( true ) }
							id="fixed"
							name="isFixedValue"
						/>
						<label htmlFor="fixed" className="ml-2">
							Fixed Value
						</label>{ " " }
						<br />
						<input
							type="radio"
							id="percentage"
							onClick={ () => setIsFixed( false ) }
							name="isFixedValue"
						/>
						<label htmlFor="percentage" className="ml-2">
							Percentage Value
						</label>
					</div>

					{/* fixed vs variable value */ }

					<div className="col-md-6 col-12 mb-3">
						{ isFixed && (
							<>
								<label htmlFor="fixedValue" className="d-form-label">
									Fixed Value (input amount)
								</label>
								<input
									type="number"
									step="0.1"
									placeholder="0.0"
									id="fixedValue"
									name="fixedValue"
									className="d-form-control w-100 shadow"
									value={ record.fixedValue }
									onChange={ ( e ) => handleChange( e ) }
								/>
							</>
						) }
						{ !isFixed && (
							<>
								<label htmlFor="percentageValue" className="d-form-label">
									Percentage Value (input percentage without symbol e.g 9)
								</label>
								<input
									type="number"
									step="0.1"
									placeholder="0.0"
									id="percentageValue"
									name="percentageValue"
									className="d-form-control w-100 shadow"
									value={ record.percentageValue }
									onChange={ ( e ) => handleChange( e ) }
								/>
							</>
						) }
					</div>

					<div className="col-12 mb-3">
						<label htmlFor="description" className="d-form-label">
							Desccription *
						</label>
						<textarea
							type="text"
							id="description"
							name="description"
							className="d-form-control w-100"
							value={ record.description }
							onChange={ ( e ) => handleChange( e ) }></textarea>
					</div>
					<div className="col-12">
						{ !image.url && (
							<img
								src={ generateFileUrl( record.imageFileName ) }
								alt="card"
								style={ {
									maxHeight: "200px",
									maxWidth: "80vw",
								} }
							/>
						) }

						{ image.url && (
							<img
								src={ image.url }
								alt="product"
								style={ {
									maxHeight: "200px",
									maxWidth: "80vw",
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
							className="mb-3"
							onClick={ () => document.getElementById( "imageUrl" ).click() }>
							<i className="bi bi-image mr-1"></i>
							change image
						</Button>
						<input
							type="file"
							name="imageUrl"
							onChange={ imageUpload }
							id="imageUrl"
							hidden
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CardEdit };

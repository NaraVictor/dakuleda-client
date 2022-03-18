import { useEffect, useState } from "react";
import
{
	fetchData,
	deleteData,
	uploadFile, postData
} from "../../../helpers/utilities";
import { useForm } from "react-hook-form";
import { generateFileUrl } from "../../../helpers/utilities";

const ProductGallery = ( { productId } ) =>
{
	const [ gallery, setGallery ] = useState( [] );
	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

	const fetchGallery = () =>
	{
		fetchData( `products/${ productId }/gallery` ).then( ( r ) =>
		{
			setGallery( r.data?.data );
		} );
	};

	const deleteImage = ( galleryId ) =>
	{
		deleteData( `products/${ productId }/gallery/${ galleryId }` );
	};

	const imageUpload = ( e ) =>
	{
		if ( e.target.files[ 0 ].type.slice( 0, 5 ) !== "image" )
		{
			alert( "file type not supported!" );
			return;
		}

		if ( e.target.value )
		{
			setImage( {
				file: e.target.files,
				url: URL.createObjectURL( e.target.files[ 0 ] ),
			} );
		}
	};

	const submitImage = () =>
	{
		uploadFile(
			`products/${ productId }/gallery`,
			image.file[ 0 ],
			"galleryImage"
		).then( ( r ) =>
		{
			if ( r.status === 200 )
			{
				setImage( {
					file: {},
					url: "",
				} );
				setGallery( [] );
				fetchGallery();
				alert( "image successfully uploaded!" );
				// return;
			}
			// alert("something went wrong");
		} );
	};

	useEffect( () =>
	{
		productId !== undefined && fetchGallery();
	}, [] );

	return (
		<div className="row">
			<div className="col-md-7 col-12">
				<table className="table">
					<tbody>
						{ gallery.length <= 0 ? (
							<p>Upload images to have them listed here</p>
						) : (
							gallery.map( ( g ) => (
								<tr key={ g.id }>
									<td>
										<img
											src={ generateFileUrl( g.imageFileName ) }
											alt="product gallery"
											style={ {
												maxHeight: "100px",
												maxWidth: "100px",
											} }
										/>
									</td>
									<a
										href="#"
										onClick={ () =>
										{
											if ( window.confirm( "proceed deleting the image?" ) )
											{
												deleteImage( g.id );
												setGallery( [] );
												fetchGallery();
											}
										} }>
										delete
									</a>
								</tr>
							) )
						) }
					</tbody>
				</table>
			</div>
			<div className="col-md-5 col-12 mt-5 mt-md-0">
				<h5>Add image</h5>
				<hr />
				<form onSubmit={ submitImage }>
					{ image.url && (
						<img
							src={ image.url }
							alt="product pic"
							style={ {
								maxHeight: "200px",
								maxWidth: "190px",
							} }
						/>
					) }
					<input type="submit" hidden id="submitter" />
				</form>
				<div className="mt-3">
					<button
						className="btn-dc-white"
						accept=".png, .jpg, .jpeg, .gif"
						onClick={ () =>
						{
							document.getElementById( "uploader" ).click();
						} }>
						<i className="bi bi-image mr-2"></i>
						pick image
					</button>
					{ image.url && (
						<button
							className="btn-dc-white"
							onClick={ () =>
							{
								document.getElementById( "submitter" ).click();
							} }>
							<i className="bi bi-upload mr-1"></i>
							Upload image
						</button>
					) }
				</div>
				<input onChange={ imageUpload } type="file" hidden id="uploader" />
			</div>
		</div>
	);
};

export { ProductGallery };

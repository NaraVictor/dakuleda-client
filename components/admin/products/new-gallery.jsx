import { useEffect, useState, useContext } from "react";
import
{
	fetchData,
	deleteData,
	uploadFile,
} from "../../../helpers/utilities";
import { useForm } from "react-hook-form";
import { newProductContext } from "../../../context/newProductContext";

const NewProductGallery = ( { productId } ) =>
{
	const ctx = useContext( newProductContext );

	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

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

	return (
		<div className="row">
			<div className="col-7">
				<table className="table">
					<tbody>
						{ ctx.getGallery().values.length <= 0 ? (
							<p>Upload images to have them listed here</p>
						) : (
							<p>hello there</p>
						) }
					</tbody>
				</table>
			</div>
			<div className="col-5">
				<h5>Add image</h5>
				<hr />
				<form onSubmit={ () => ctx.addGallery( image.file[ 0 ] ) }>
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

export { NewProductGallery };

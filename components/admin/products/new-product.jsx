// import imagePH from "../../../static/img/placeholder-image.png";
// import videoPH from "../../../static/img/video-placeholder.jpg";
import { useForm } from "react-hook-form";
import
{
	postData,
	fetchData,
	uploadFile,
} from "../../../helpers/utilities";
import { useState, useEffect, useContext } from "react";
import { NewProductFeatures } from "./new-features";
import { NewProductGallery } from "./new-gallery";
import { newProductContext } from "../../../context/newProductContext";
import { shopContext } from '../../../context/shopContext'
import { Modal } from "antd";
import PageTitle from '../../page-title'

const NewProduct = ( props ) =>
{
	const { handleSubmit, reset, register } = useForm();
	const [ busy, setBusy ] = useState( false );
	const [ categories, setCategories ] = useState( [] );
	const [ manufacturers, setManufacturers ] = useState( [] );
	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

	const ctx = useContext( newProductContext );
	const { setLayout } = useContext( shopContext )
	setLayout( 'admin' )


	const [ modal, setModal ] = useState( {
		isVisible: false,
		content: "",
		title: "",
		width: "",
	} );

	const showModal = ( title, content, width ) =>
	{
		setModal( {
			content,
			title,
			isVisible: true,
			width,
		} );
	};

	const handleCancel = () =>
	{
		setModal( {
			...modal,
			isVisible: false,
		} );
	};

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

	const fetchCategories = () =>
	{
		fetchData( "categories" ).then( ( res ) => setCategories( res.data.data ) );
	};

	const fetchManufacturers = () =>
	{
		fetchData( "manufacturers" ).then( ( res ) => setManufacturers( res.data.data ) );
	};

	const submitData = ( data ) =>
	{
		if ( image.url === "" )
		{
			alert( "please upload a product image" );
			return;
		}
		setBusy( true );

		postData( "products", { ...data } )
			.then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					uploadFile(
						`products/${ res.data.data.id }/upload-picture`,
						image.file[ 0 ],
						"productImage"
					).then( ( res ) =>
					{
						if ( ctx.submitData( res.data.data.id ) )
						{
							alert( "product added successfully" );
							reset();
							props.reload();
							setImage( {
								file: {},
								url: "",
							} );
							return;
						} else
						{
							alert( "something went wrong" );
						}
					} );
				} else
				{
					throw Error( res );
				}
			} )
			.catch( ( ex ) =>
			{
				if ( ex.toString().includes( "409" ) )
				{
					alert( "a product with similar name already exists" );
					return;
				}
			} )
			.finally( () => setBusy( false ) );
	};

	useEffect( () =>
	{
		fetchCategories();
		fetchManufacturers();
	}, [] );

	return (
		<div>
			<Modal
				title={ modal.title }
				visible={ modal.isVisible }
				footer={ null }
				onCancel={ handleCancel }
				width={ modal.width && modal.width }>
				{ modal.content }
			</Modal>
			<PageTitle title="New Product" />
			<div className="d-flex justify-content-between align-items-center">
				<div>
					<h5>New Product</h5>
					<div>
						<strong>{ ctx.getFeatures().length || 0 } </strong> feature(s) added
						{/* <strong className="ml-3">{ ctx.getGallery().values.length || 0 } </strong>
						image(s) in gallery */}
					</div>
				</div>
				{/* <button className="btn" onClick={ () => props.history.go( -1 ) }>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button> */}
			</div>
			<hr />
			<div className="row">
				<div className="col-md-8 col-5">
					<button
						className={ `${ busy ? "btn-dc-white" : "btn-primary-filled"
							} px-4 py-2` }
						disabled={ busy }
						onClick={ () => document.getElementById( "submitter" ).click() }>
						<i className="bi bi-check-all"></i>
						{ busy ? "processing..." : "Submit" }
					</button>
				</div>
				<div className="col-md-4 col-7 d-flex">
					<button
						className="btn-dc-white"
						onClick={ () =>
							showModal( "Add Product Features", <NewProductFeatures /> )
						}>
						<i className="bi bi-card-checklist mr-1"></i>
						Add Features
					</button>
					{/* <button
						className="btn-dc-white"
						onClick={() =>
							showModal("Add Product Gallery", <NewProductGallery />)
						}>
						<i className="bi bi-images mr-1"></i>
						Add Gallery
					</button> */}
					{/* <span className="mr-2">upload:</span> */ }
					<button
						className="btn-dc-white"
						onClick={ () => document.getElementById( "productImage" ).click() }>
						<i className="bi bi-image mr-1"></i>
						Add Image
					</button>
					{/* <button
						className="btn-dc-white"
						onClick={() => document.getElementById("productVideo").click()}>
						<i className="bi bi-camera-video mr-1"></i>
						video
					</button> */}
				</div>
			</div>
			<hr />

			<form onSubmit={ handleSubmit( submitData ) }>
				<div className="row">
					<div className="col-md-9 col-12">
						<div className="row">
							<div className="col-md-9 col-12">
								<label htmlFor="name" className="d-form-label">
									Product Name *
								</label>
								<input
									type="text"
									id="name"
									required
									className="d-form-control w-100 shadow"
									{ ...register( "name", { required: true } ) }
								/>
							</div>
							<div className="col-md-3 col-12">
								<label htmlFor="purchasePrice" className="d-form-label">
									Purchase Price *
								</label>
								<input
									type="number"
									step="0.1"
									id="purchasePrice"
									className="d-form-control w-100 shadow"
									required
									{ ...register( "purchasePrice", { required: true } ) }
								/>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-md-4 col-12">
								<label htmlFor="regularPrice" className="d-form-label">
									Regular Price *
								</label>
								<input
									type="number"
									step="0.1"
									id="regularPrice"
									required
									className="d-form-control w-100 shadow"
									{ ...register( "regularPrice", { required: true } ) }
								/>
							</div>

							<div className="col-md-4 col-12">
								<label htmlFor="newPrice" className="d-form-label">
									New Price *
								</label>
								<input
									type="number"
									step="0.1"
									id="newPrice"
									required
									className="d-form-control w-100 shadow"
									{ ...register( "newPrice", { required: true } ) }
								/>
							</div>
							<div className="col-md-4 col-12">
								<label htmlFor="deliveryCost" className="d-form-label">
									Delivery Cost
								</label>
								<input
									type="number"
									step="0.1"
									id="deliveryCost"
									className="d-form-control w-100 shadow"
									{ ...register( "deliveryCost" ) }
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-md-4 col-12">
								<label htmlFor="deliveryPeriod" className="d-form-label">
									Delivery Period
								</label>
								<input
									type="text"
									id="deliveryPeriod"
									className="d-form-control w-100 shadow"
									{ ...register( "deliveryPeriod" ) }
								/>
							</div>
							<div className="col-md-4 col-12">
								<label htmlFor="SKU" className="d-form-label">
									SKU
								</label>
								<input
									type="text"
									id="SKU"
									className="d-form-control w-100 shadow"
									{ ...register( "SKU" ) }
								/>
							</div>
							<div className="col-md-4 col-12">
								<label htmlFor="location" className="d-form-label">
									Product Location
								</label>
								<input
									type="text"
									id="location"
									className="d-form-control w-100 shadow"
									{ ...register( "location" ) }
								/>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-md-6 col-12">
								<label htmlFor="category" className="d-form-label">
									Category *
								</label>
								<select
									name="category"
									id="category"
									required
									{ ...register( "categoryId", { required: true } ) }
									className="d-form-control w-100 shadow">
									<option value="">select a category</option>
									{ categories.map( ( cats ) => (
										<option value={ cats.id } key={ cats.id }>
											{ cats.name }
										</option>
									) ) }
								</select>
							</div>
							<div className="col-md-6 col-12">
								<label htmlFor="manufacturer" className="d-form-label">
									Manufacturer *
								</label>
								<select
									name="manufacturer"
									id="manufacturer"
									required
									{ ...register( "manufacturerId", { required: true } ) }
									className="d-form-control w-100 shadow">
									<option value="">select a manufacturer</option>
									{ manufacturers.map( ( man ) => (
										<option value={ man.id } key={ man.id }>
											{ man.name }
										</option>
									) ) }
								</select>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-12">
								<label htmlFor="description" className="d-form-label">
									Description
								</label>
								<textarea
									type="text"
									id="description"
									{ ...register( "description" ) }
									className="d-form-control w-100 shadow"></textarea>
							</div>
						</div>
						<div className="row my-2">
							<div className="col-12">
								<label htmlFor="tags" className="d-form-label">
									Tags (separate tags by space)
								</label>
								<input
									type="text"
									id="tags"
									placeholder="e.g. foam mattress luxury mattress"
									{ ...register( "productTags" ) }
									className="d-form-control w-100 shadow"
								/>
							</div>
						</div>
						<hr />
						<div className="row my-2">
							<div className="col-md-4 col-12">
								<input
									type="checkbox"
									{ ...register( "giftEligible" ) }
									name="giftEligible"
									id="giftEligible"
								/>
								<label htmlFor="giftEligible" className="ml-2">
									Gift Eligible
								</label>
							</div>
							<div className="col-md-4 col-12">
								<input
									type="checkbox"
									{ ...register( "freeDelivery" ) }
									name="freeDelivery"
									id="freeDelivery"
								/>
								<label htmlFor="freeDelivery" className="ml-2">
									Free Delivery
								</label>
							</div>
						</div>
						{/* <p>
							<strong>Generated Slug</strong>: {generateSlug("product name")}
						</p> */}
					</div>

					<div className="col-md-3 col-12">
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
						{/* <hr />
						<p>gallery</p> */}
					</div>
				</div>
				<input
					type="file"
					accept=".png, .jpg, .jpeg, .gif"
					name="productImage"
					id="productImage"
					hidden
					onChange={ imageUpload }
				/>
				<input
					type="file"
					accept=".mp4, .mov, .ogg, .avi, .mpeg4"
					name="productVideo"
					id="productVideo"
					hidden
				/>
				<input hidden type="submit" id="submitter" />
			</form>
		</div>
	);
};

export default NewProduct;

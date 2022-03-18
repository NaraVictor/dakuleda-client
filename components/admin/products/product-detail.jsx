import { deleteData, generateFileUrl } from "../../../helpers/utilities";
import placeholder from "../../../static/img/placeholder.png";
import { useState } from "react";
import { ProductFeatures } from "./features";
import { ProductGallery } from "./gallery";
import { Modal, Button } from "antd";
import { ProductEdit } from "./product-edit";

const ProductDetail = ( { product, onReload } ) =>
{
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

	const deleteProduct = () =>
	{
		if (
			window.confirm( "are you sure of deleting this product ? can't be undone" )
		)
			deleteData( `products/${ product.id }` ).then( ( res ) => onReload() );
	};
	return (
		<div className="p-md-3">
			{ !product.hasOwnProperty( "id" ) ? (
				<p>Select a product</p>
			) : (
				<div>
					<Modal
						title={ modal.title }
						visible={ modal.isVisible }
						footer={ null }
						onCancel={ handleCancel }
						width={ modal.width && modal.width }>
						{ modal.content }
					</Modal>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{ product.name }</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-7 col-12">
							<p>
								<strong>Purchase Price:</strong> { product.purchasePrice }
							</p>
							<p>
								<strong>Regular Price:</strong> { product.regularPrice }
							</p>
							<p>
								<strong>New Price:</strong> { product.newPrice }
							</p>
							<p>
								<strong>Delivery Cost:</strong> { product.deliveryCost }
							</p>
							<p>
								<strong>Delivery Period:</strong> { product.deliveryPeriod }
							</p>
							<p>
								<strong>Category:</strong> { product.category.name }
							</p>
							<p>
								<strong>Manufacturer:</strong> { product.manufacturer.name }
							</p>

							<p>
								<strong>SKU:</strong> { product.SKU }
							</p>
							<p>
								<strong>Gift Eligble:</strong>
								{ product.giftEligible ? "Yes" : "No" }
							</p>
							<p>
								<strong>Free Delivery:</strong>
								{ product.freeDelivery ? "Yes" : "No" }
							</p>

							<p>
								<strong>Location:</strong> { product.location }
							</p>
							<p>
								<strong>Number of Orders:</strong> { product.orderCount }
							</p>
							<p>
								<strong>Tags:</strong> { product.productTags }
							</p>
							<p>
								<strong>Description:</strong> { product.description }
							</p>
						</div>
						<div className="col-md-5 col-12">
							<img
								src={ generateFileUrl( product.imageFileName ) || placeholder }
								alt="category"
								style={ {
									maxHeight: "200px",
									maxWidth: "190px",
								} }
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-6 col-12">
							<Button
								type="primary"
								className="btn-dc-white"
								onClick={ () =>
									showModal(
										"Edit Product",
										<ProductEdit obj={ product } onReload={ onReload } />
									)
								}>
								<i className="bi bi-pencil"></i>
								edit
							</Button>

							<Button
								className="bg-danger text-white"
								onClick={ () => deleteProduct() }>
								<i className="bi bi-trash"></i>
								delete
							</Button>
						</div>
						<div className="col-md-6 col-12 mt-4 mt-md-0">
							<Button
								className="btn"
								onClick={ () =>
									showModal(
										"Product Features",
										<ProductFeatures
											productId={ product.id }
											name={ product.name }
										/>
									)
								}>
								<i className="bi bi-card-checklist mr-1"></i>
								<strong>features</strong>
							</Button>
							<Button
								className="btn"
								onClick={ () =>
									showModal(
										"Product Gallery",
										<ProductGallery
											productId={ product.id }
											name={ product.name }
										/>
									)
								}>
								<i className="bi bi-images mr-1"></i>
								<strong>gallery</strong>
							</Button>
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export { ProductDetail };

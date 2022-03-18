import { deleteData, generateFileUrl } from "../../../helpers/utilities";
import { getRole } from "../../../helpers/auth";
import placeholder from "../../../static/img/placeholder.png";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CategoryEdit } from "./category-edit";

const CategoryDetail = ( { category, onReload } ) =>
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

	const deleteCategory = () =>
	{
		if ( window.confirm( "Are you sure ?" ) )
		{
			deleteData( `categories/${ category.id }` ).then( ( res ) => onReload() );
		}
	};
	return (
		<div className="p-md-3 p-1">
			<Modal
				title={ modal.title }
				visible={ modal.isVisible }
				footer={ null }
				onCancel={ handleCancel }
				width={ modal.width && modal.width }>
				{ modal.content }
			</Modal>
			{ !category.hasOwnProperty( "id" ) ? (
				<p>Select a category</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{ category.name }</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-md-6 col-12">
							<p>
								<strong>Slug:</strong> { category.slug }
							</p>
							<p>
								<strong>Description:</strong> { category.description }
							</p>
						</div>
						<div className="col-md-6 col-12">
							<img
								src={ generateFileUrl( category.imageFileName ) || placeholder }
								alt="category"
								style={ {
									maxHeight: "200px",
									maxWidth: "300px",
								} }
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						{ getRole() === "admin" && (
							<div className="col-12">
								<Button
									type="primary"
									onClick={ () =>
										showModal(
											"Edit Category",
											<CategoryEdit obj={ category } onReload={ onReload } />
										)
									}>
									<i className="bi bi-pencil mr-1"></i>
									edit
								</Button>

								<Button
									className="bg-danger text-white"
									onClick={ () => deleteCategory() }>
									<i className="bi bi-trash mr-1"></i>
									delete
								</Button>
							</div>
						) }
					</div>
				</div>
			) }
		</div>
	);
};

export { CategoryDetail };

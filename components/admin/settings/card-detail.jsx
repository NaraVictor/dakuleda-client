import { deleteData, generateFileUrl } from "../../../helpers/utilities";
import { format } from "date-fns";
import { useState } from "react";
import { CardCodes } from "./codes";
import { getRole } from "../../../helpers/auth";
import { Button, Modal } from "antd";

const CardDetail = ( { card, onReload, onEdit } ) =>
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

	const deleteCard = () =>
	{
		deleteData( `cards/${ card.id }` ).then( ( res ) =>
		{
			onReload();
			alert( "done" );
		} );
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
			<div>
				<div className="row">
					<div className="col-12">
						<h3 className="mb-0">{ card.title }</h3>
					</div>
				</div>
				<hr />
				<div className="row">
					<div className="col-12">
						<p>
							<strong>Vendor Code:</strong> { card.vendorCode }
						</p>
						<p>
							<strong>Number of codes:</strong> { card.codes.length }
						</p>
						<p>
							<strong>Card Value: </strong>
							{ card.isFixedValue ? (
								<span>₵ { card.fixedValue }</span>
							) : (
								<span>{ card.percentageValue * 100 } %</span>
							) }
						</p>
						<p>
							<strong>Start Date:</strong>{ " " }
							{ format( new Date( card.startDate ), "EEEE, MMMM d yyyy" ) }
						</p>
						<p>
							<strong>End Date:</strong>{ " " }
							{ format( new Date( card.endDate ), "EEEE, MMMM d yyyy" ) }
						</p>

						<p>
							<strong>Description:</strong> { card.description }
						</p>
						<hr />
						<img
							src={ generateFileUrl( card.imageFileName ) }
							style={ {
								maxHeight: "200px",
								maxWidth: "80vw",
							} }
							alt=""
						/>
					</div>
				</div>
				<hr />
				<div className="d-flex justify-content-between">
					{ getRole() === "admin" && (
						<div>
							{/* <button
								className="btn-dc-white"
								onClick={() => onEdit(card, true)}>
								<i className="bi bi-pencil"></i>
								edit
							</button> */}

							<Button
								className={ `${ !card.isDeleted ? "bg-danger " : "bg-success "
									} text-white` }
								onClick={ () => deleteCard() }>
								{ !card.isDeleted ? (
									<>
										<i className="bi bi-x-circle-fill mr-2"></i>
										stop
									</>
								) : (
									<>
										<i className="bi bi-play-fill mr-2"></i>
										start
									</>
								) }
							</Button>
						</div>
					) }
					<div>
						<Button
							type="primary"
							onClick={ () =>
								showModal( "Card Codes", <CardCodes cardId={ card.id } /> )
							}>
							<i className="bi bi-list-ol mr-2"></i>
							codes
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { CardDetail };

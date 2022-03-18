import
{
	deleteData,
	generateFileUrl,
} from "../../../helpers/utilities";
import placeholder from "../../../static/img/placeholder.png";
import { Button } from "antd";

const SliderDetail = ( { slider, onReload, onEdit } ) =>
{
	const deleteSlider = () =>
	{
		if ( window.confirm( "proceed to deleting slider? This cannot be undone" ) )
		{
			deleteData( `sliders/${ slider.id }` ).then( ( res ) => onReload() );
		}
	};

	return (
		<div className="p-md-3">
			{ !slider.hasOwnProperty( "id" ) ? (
				<p>Select a slider</p>
			) : (
				<div>
					<div className="row">
						<div className="col-12">
							<h3 className="mb-0">{ slider.title }</h3>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col-12">
							{/* <p>
								<strong>Description:</strong> {slider.description}
							</p> */}
							<p>
								<strong>Url:</strong> { slider.url }
							</p>
							{/* <p>
								<strong>Has a button:</strong> {slider.hasButton ? "Yes" : "No"}
							</p>
							{slider.hasButton && (
								<p>
									<strong>Button Text:</strong> {slider.buttonText}
								</p>
							)} */}
							<img
								src={ generateFileUrl( slider.imageFileName ) || placeholder }
								alt="slider"
								style={ {
									maxHeight: "200px",
									maxWidth: "300px",
								} }
							/>
						</div>
					</div>
					<hr />
					<div className="row">
						<div className="col">
							{/* <Button type="primary" onClick={() => onEdit(slider, true)}>
								<i className="bi bi-pencil mr-2"></i>
								edit
							</Button> */}

							<Button
								className="bg-danger text-white"
								onClick={ () => deleteSlider() }>
								<i className="bi bi-trash mr-2"></i>
								delete
							</Button>
						</div>
					</div>
				</div>
			) }
		</div>
	);
};

export { SliderDetail };

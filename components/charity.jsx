import { useState, useEffect } from "react";
import charityImage from "../static/img/charity-2.png";
import placeholder from "../static/img/placeholder.png";
import Image from "next/image";

const CharityAlert = ( props ) =>
{
	const [ open, setOpen ] = useState( true );

	useEffect( () =>
	{
		if ( sessionStorage.getItem( "charity" ) )
		{
			setOpen( false );
		} else
		{
			sessionStorage.setItem( "charity", "charity-alert-ad-open" );
			setOpen( true );
		}
	}, [] );

	return (
		<>
			<div
				className={ `${ open && "popup1" }` }
				style={ {
					display: open ? "block" : "none",
				} }>
				<div className={ `${ open && "newsletter-sign-box" }` }>
					<h4>
						<a href='../static/img/charity-2.png' download="dakuleda changing colors">
							Download Flyer
						</a>
					</h4>
					<img src="../static/img/close.png" alt="close icon" className="x" onClick={ () =>
					{
						sessionStorage.removeItem( "charity" );
						setOpen( false );
					} } />

					{/* <i className="x text-danger bi bi-x-circle h4" onClick={ () =>
					{
						sessionStorage.removeItem( "charity" );
						setOpen( false );
					} }></i> */}

					<div className="newsletter_img">
						<Image
							alt="pop-up image"
							blurDataURL='../static/img/placeholder.png'
							src={ charityImage }
						/>
					</div>
				</div>
			</div>
			<div
				id={ `${ open && "fade" }` }
				style={ {
					display: open ? "block" : "none",
				} }></div>
		</>
	);
};

export default CharityAlert;

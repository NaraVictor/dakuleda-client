import { generateFileUrl } from "../helpers/utilities";
import HeadTag from "../components/header-tag"
import { useContext } from "react";
import { shopContext } from "../context/shopContext";

const ShowRoomsPage = ( props ) =>
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	return (
		<div className="container showrooms">
			<HeadTag
				key={ Math.random() }
				pageTitle={ "Showrooms" }
				description="our physical store locations"
				// link={window.location.href}
				title={ "Dakuleda Showrooms" }
				id={ Math.random() }
				image={ generateFileUrl( "logo.png" ) }
			/>
			<h3 className="mt-3">Our Showrooms</h3>
			<hr />
			<div className="row">
				<div className="col-1">
					<h3 className="counter">1</h3>
				</div>
				<div className="col-11">
					<h5>T. A TANKO CO. LTD</h5>
					<p>
						Directly opposite MTN Office Wa, <br />
						Upper West Region, Ghana
					</p>
					<a href="tel:+233506358009">0506358009</a> <br />
					<a href="tel:+233392097231">0392097231</a>
				</div>
			</div>
			<hr />
		</div>
	);
};


export async function getStaticProps ( context )
{
	return {
		props: {}, // will be passed to the page component as props
	}
}

export default ShowRoomsPage;

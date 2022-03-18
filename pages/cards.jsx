
import { generateFileUrl } from "../helpers/utilities"
import HeadTag from "../components/header-tag"
import { useContext } from "react";
import { shopContext } from "../context/shopContext";

const GiftsPage = ( props ) =>
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	return (
		<div className="container">
			<HeadTag
				key={ Math.random() }
				pageTitle={ "Gift Cards" }
				description="Dakuleda.com offers gift cards to customers to make that occasion of
				your birthday special be it yourself or someone special."
				// link={window.location.href}
				title={ "Dakuleda Gift Cards" }
				id={ Math.random() }
				image={ generateFileUrl( "logo.png" ) }
			/>
			<h3 className="mt-3">Gift Cards</h3>
			<hr />
			<p>
				Dakuleda.com offers gift cards to customers to make that occasion of
				your birthday special be it yourself or someone special. We equal pay
				attention to your intentions of creating that moment of essence, be it
				to a love one, family, friend, colleague or boss at work.
			</p>
			<p>
				We heavily promote our gifts cards during seasons of Christmas, Eid al –
				fitr/Adha, New Year, Easter, and Valentines (season of luv)
			</p>
			<p>
				Ongoing basis our gifts cards are available for customers to purchase
				online.
			</p>
			<p>To purchase dakuleda Gift Card please call; </p>
			<a href="tel:+233506358009">050 635 8009</a> <br />
			<a href="tel:+233392097231">039 209 7231</a>
		</div>
	);
};


export async function getStaticProps ( context )
{
	return {
		props: {}, // will be passed to the page component as props
	}
}
export default GiftsPage;

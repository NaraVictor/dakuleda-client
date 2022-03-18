import React, { useContext } from "react";
import ShopByCategory from "../components/homepage/categories";
import DefaultSlider, { SlimSlider } from "../components/carousel";
import { SplideSlide } from "@splidejs/react-splide";
import { generateFileUrl, fetchData, setLayout, getLayout } from "../helpers/utilities";
import Ad from "../components/ads/ad";
import ScrollToTop from "react-scroll-to-top";
import HeadTag from "./../components/header-tag";
import Image from "next/image";
import { shopContext } from "../context/shopContext";

const HomePage = ( { sliders } ) =>
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	return (
		<div className="container mt-1">
			<ScrollToTop smooth />
			<HeadTag
				pageTitle={ "Home" }
				description={
					"home of authentic electronics, vehicles, motorbikes, home appliances and more."
				}
				link={ typeof window !== 'undefined' && window.location.href }
				title={ "Dakuleda" }
				id={ Math.random() }
				image={ generateFileUrl( 'logo.png' ) }
			/>
			{ sliders?.length > 0 && (
				<div className="text-center">
					<DefaultSlider>
						{ sliders?.map( ( slide ) => (
							<SplideSlide key={ slide.id } className="slider-image">
								<a href={ `${ slide.url || "#" }` }>
									<Image
										src={ generateFileUrl( slide?.imageFileName ) }
										alt="slider"
										layout="fill"

									/>
								</a>
							</SplideSlide>
						) ) }
					</DefaultSlider>
				</div>
			) }
			<br />
			{/* <Deals /> */ }

			<ShopByCategory />
			<div className="mt-5 pt-4">
				<Ad />
			</div>
			{/* <Shop /> */ }
		</div>
	);
};

export async function getServerSideProps ( context )
{
	const res = await fetchData( "sliders" );
	const sliders = res.data?.data || [];

	return {
		props: {
			sliders,
		}, // will be passed to the page component as props
	};
}

export default HomePage;
// "https://placeimg.com/1200/350/any"

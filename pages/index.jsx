import React, { useContext } from "react";
import ShopByCategory from "../components/homepage/categories";
import Shop from "../components/homepage/shop";
import DefaultSlider, { SlimSlider } from "../components/carousel";
import { SplideSlide } from "@splidejs/react-splide";
import { useState, useEffect } from "react";
import { generateFileUrl, fetchData, setLayout, getLayout } from "../helpers/utilities";
import Ad from "../components/ads/ad";
import ScrollToTop from "react-scroll-to-top";
import HeadTag from "./../components/header-tag";
import Image from "next/image";
import logo from "../static/img/logo/logo-new.png"
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
				// link={window.location.href}
				title={ "Dakuleda" }
				id={ Math.random() }
				image={ logo }
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

import React from "react";
import Product from "../shop/product";
import { SlimSlider } from "../carousel";
import { SplideSlide } from "@splidejs/react-splide";

const SimilarProducts = ( props ) =>
{
	const { prods } = props;
	let sn = 1,
		w = window.innerWidth;

	if ( w >= 799 ) sn = 3;
	if ( w >= 999 ) sn = 4;

	return (
		<section className="container py-5">
			<h4>Similar Products</h4>
			<hr />
			{/* <article className="row"> */ }
			<SlimSlider slideNo={ sn } duration={ 3000 }>
				{ prods?.map( ( item ) => (
					<SplideSlide key={ item.id }>
						<Product prod={ item } />
					</SplideSlide>
				) ) }
			</SlimSlider>
			{/* </article> */ }
		</section>
	);
};

export default SimilarProducts;

import { useContext, useEffect } from "react";
import CategorySideBar from "../../components/category/sidebar";
// import CategoryProductList from "../../components/category/productsList";
import CategoryNav from "../../components/category/nav";
import { fetchData, toTitleCase } from "../../helpers/utilities";
import Product from "../../components/shop/product";
import ScrollToTopOnMount from "../../components/scrollToTop";
import ScrollToTop from "react-scroll-to-top";
import { generateFileUrl } from "./../../helpers/utilities";
import HeadTag from "../../components/header-tag"
import { shopContext } from "../../context/shopContext";

const CategoryPage = ( { categories, loading = true, products, slug } ) =>
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	let locationURL

	useEffect( () =>
	{
		locationURL = window.location.href
	}, [] )
	return (
		<>
			<ScrollToTopOnMount />
			<ScrollToTop smooth />
			{/* <PageTitle title={toTitleCase(slug)} /> */ }
			<HeadTag
				key={ Math.random() }
				pageTitle={ toTitleCase( slug ) }
				description={
					"shop for " + toTitleCase( slug ) + " from us at Dakuleda.com"
				}
				link={ locationURL }
				title={ toTitleCase( slug ) }
				id={ Math.random() }
				image={ generateFileUrl( products[ 0 ]?.category.imageFileName ) }
			/>
			<section className="row m-0 px-md-3">
				<article className="col-md-2 categories-list">
					<CategorySideBar categories={ categories } />
				</article>
				<article className="col category-products p-0 no-gutters">
					{/* put categories slider here */ }
					<CategoryNav category={ toTitleCase( slug ) } categories={ categories } />
					{/* <CategoryProductList prods={products} /> */ }
					<div className="container">
						<div className="row">
							{ loading ? (
								<p className="ml-4">Loading...</p>
							) : products.length === 0 ? (
								<p className="alert alert-danger ml-4">
									<strong>No products in this category</strong>
								</p>
							) : (
								products.map( ( product ) => (
									<div className="col-md-3 col-6 my-1" key={ product.id }>
										<Product prod={ product } key={ product.id } />
									</div>
								) )
							) }
						</div>
					</div>
				</article>
			</section>
		</>
	);
};



export async function getServerSideProps ( ctx )
{
	const { slug } = ctx.query;

	let categories, products, loading = false


	const r1 = await fetchData( `categories/${ slug }/products` )
	products = await r1.data?.data

	const r2 = await fetchData( "categories" )
	categories = await r2.data?.data



	return {
		props: {
			categories,
			products,
			loading,
			slug
		},
	};
}

export default CategoryPage;

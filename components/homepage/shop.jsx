import React, { useContext } from "react";
import Product from "../shop/product";
import { shopContext } from "../../context/shopContext";

const Shop = (props) => {
	const ctx = useContext(shopContext);

	return (
		<section className="my-4">
			<h4>Shop</h4>
			<hr />
			<div className="row">
				{ctx.fetchProducts()?.map((product) => (
					<article className="col-md-3 col-6 my-1" key={product.id}>
						<Product prod={product} />
					</article>
				))}
			</div>
		</section>
	);
};

export default Shop;

import React from "react";
import ProductListView from "../../../components/shop/productListView";

const CategoryProductList = (props) => {
	return (
		<span>
			{props.prods.map((prod) => (
				<>
					<ProductListView prod={prod} />
					<hr />
				</>
			))}
		</span>
	);
};

export default CategoryProductList;

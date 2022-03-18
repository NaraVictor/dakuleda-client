import { cartContext } from "../../context/cartContext";
import { useContext } from "react";

const AddToCartButton = ({ prod, classes }) => {
	const { addToCart } = useContext(cartContext);

	return (
		<button
			onClick={() => {
				addToCart(prod);
			}}
			className={`btn-dc-white ${classes}`}>
			Add to cart
		</button>
	);
};

export default AddToCartButton;

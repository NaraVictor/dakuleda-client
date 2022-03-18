import React, { useContext } from "react";
// import cartIcon from "../../static/svg/cart.svg";
import { cartContext } from "./../../context/cartContext";

const CartIcon = () => {
	const { cart } = useContext(cartContext);

	return (
		<span>
			{/* <img src={cartIcon} height="30" alt="cart icon" /> */}

			{cart.length ? (
				<span>
					<span className="badge dc-bg-black text-white">{cart.length}</span>
				</span>
			) : (
				<span className="badge dc-bg-black text-white">0</span>
			)}
		</span>
	);
};

export default CartIcon;

import React, { useContext } from "react";
import { shopContext } from "./../../context/shopContext";

const BuyItemButton = ({ prod, classes }) => {
	const { buyItem } = useContext(shopContext);
	return (
		<button
			className={`btn-primary-filled ${classes}`}
			onClick={() => {
				buyItem(prod);
				window.location.href = "/checkout";
			}}>
			Buy now
		</button>
	);
};

export default BuyItemButton;

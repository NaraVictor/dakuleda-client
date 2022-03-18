import React, { useContext } from "react";
import Link from "next/link";
import { shopContext } from "./../../context/shopContext";
import AddToCartButton from "./addToCartButton";
import BuyItemButton from "./buyItemButton";
import {
	cedisLocale,
	generateFileUrl,
	priceChangePercentage,
} from "../../helpers/utilities";
import { GiftEligible, FreeDelivery } from "../gift-deliver";

const Product = (props) => {
	const {
		name,
		regularPrice,
		imageFileName,
		newPrice,
		slug,
		giftEligible,
		freeDelivery,
	} = props.prod;
	const { hideButtons, hideSeparator } = props;
	const { selectItem } = useContext(shopContext);

	return (
		<article className="product text-center my-md-4">
			<div className="add-ons">
				{giftEligible && (
					<p className="m-0">
						<GiftEligible showIconsOnly={true} />
					</p>
				)}
				{freeDelivery && <FreeDelivery showIconsOnly={true} />}
			</div>
			{priceChangePercentage(regularPrice, newPrice) > 0 && (
				<p className="change-percent">
					{priceChangePercentage(regularPrice, newPrice) + " % off"}
				</p>
			)}
			<Link
				href={`/p/${slug}`}
				title={name}
				onClick={() => selectItem(props.prod)}>
				<a>
<div className="product-image">
					<img src={generateFileUrl(imageFileName)} alt="product" />
				</div>
				<div className="product-detail">
					<p className="m-0 product-title">{name}</p>
					{/* <small>{manufacturer.name ?? "manufacturer"}</small> */}
					<div>
						<strong>GHS {cedisLocale.format(newPrice)}</strong>{" "}
						<strike>
							<small>GHS {regularPrice}</small>
						</strike>
					</div>

					{/* {hideSeparator ? "" : <hr />} */}
				</div>
				</a>
			</Link>
			{hideButtons ? (
				""
			) : (
				<div className="product-footer">
					{/* <AddToCartButton prod={props.prod} /> */}
					<BuyItemButton prod={{ ...props.prod, quantity: 1 }} />
				</div>
			)}
		</article>
	);
};

export default Product;

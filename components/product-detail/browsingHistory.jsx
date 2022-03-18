import React, { Component } from "react";
import Product from "./../../../components/shop/product";

const similar = [
	{
		title: "beats solo headset",
		image: "https://elcopcbonline.com/photos/product/4/176/4.jpg",
		price: 250,
		manufacturer: "beats",
	},
	{
		title: "Black n White Boots",
		image: "https://elcopcbonline.com/photos/product/2/174/2.jpg",
		price: 150,
		manufacturer: "Converse",
	},
	{
		title: "beats solo headset",
		image: "https://elcopcbonline.com/photos/product/4/176/4.jpg",
		price: 250,
		manufacturer: "beats",
	},

	{
		title: "Black n White Boots",
		image: "https://elcopcbonline.com/photos/product/2/174/2.jpg",
		price: 150,
		manufacturer: "Converse",
	},
];

class BrowsingHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<section className="container py-5">
				<h4>Browsing History</h4>
				<hr />
				<article className="row">
					{similar.map((item) => (
						<article className="col-md-3 col-sm-6 my-3" key={item.id}>
							<Product prod={item} />
						</article>
					))}
				</article>
			</section>
		);
	}
}

export default BrowsingHistory;

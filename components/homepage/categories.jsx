import React, { Component } from "react";
import { Row } from "react-bootstrap";
import Category from "../shop/category";
import { fetchData } from "../../helpers/utilities";

class ShopByCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
		};
	}

	async componentDidMount() {
		await fetchData("categories/").then((res) => {
			const cats = res.data?.data;
			if (cats) this.setState({ categories: cats });
		});
	}

	render() {
		return (
			<section>
				<h4>Shop by Category</h4>
				<hr />

				<Row>
					{this.state.categories.map((cat) => (
						<div className="col-md-3 col-6 my-2" key={cat.name}>
							<Category category={cat} />
						</div>
					))}
				</Row>
			</section>
		);
	}
}

export default ShopByCategory;

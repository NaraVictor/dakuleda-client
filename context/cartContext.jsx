import React, { createContext } from "react";

export const cartContext = createContext();
cartContext.displayName = "cart context";

class CartContext extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
			// success: false,
		};
	}

	componentDidMount() {
		// localStorage.clear();
		this.getCart() && this.setState({ cart: this.getCart() });
	}

	setCart = (cart) => {
		localStorage.setItem("cart", JSON.stringify(cart));
	};

	getCart = () => {
		return JSON.parse(localStorage.getItem("cart"));
	};

	clearCart = () => {
		localStorage.removeItem("cart");
	};

	handleClearCart = () => {
		this.setState({ cart: [] });
		this.clearCart();
	};

	handleAddToCart = (prod) => {
		const { cart: c } = this.state;
		// this.state.success && this.setState({ success: false });

		// check if product already
		if (c.filter((item) => item.name === prod.name).length > 0) {
			// if so, increase qty instead
			const item = c.map((p) => {
				if (p.name === prod.name) p.quantity = p.quantity + 1;
				return p;
			});
			this.setCart(item);
			this.setState({ cart: item });
			return;
		}

		// if not, add entire item to cart
		const cart = [...this.state.cart, { ...prod, quantity: 1 }];
		this.setState({ cart });
		this.setCart(cart);
	};

	handleRemoveFromCart = (name) => {
		// re-create new cart without removed item
		const cart = this.state.cart.filter((item) => item.name !== name);
		this.setState({ cart });
		this.setCart(cart);
	};

	render() {
		return (
			<cartContext.Provider
				value={{
					cart: this.state.cart,
					addToCart: this.handleAddToCart,
					removeFromCart: this.handleRemoveFromCart,
					clearCart: this.handleClearCart,
					success: this.state.success,
				}}>
				{this.props.children}
			</cartContext.Provider>
		);
	}
}

export default CartContext;

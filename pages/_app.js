import ShopContext from "../context/shopContext";
import CartContext from "../context/cartContext";
import "../static/css/styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "antd/";
import "antd/dist/antd.css";
import AppLayout from "../components/app-layout";
import NewProductContext from "../context/newProductContext";
import SimpleReactLightBox from "simple-react-lightbox";

function MyApp({ Component, pageProps }) {
	return (
		<CartContext>
			<ShopContext>
				<NewProductContext>
					<SimpleReactLightBox>
						<AppLayout Page={Component} props={pageProps} />
					</SimpleReactLightBox>
				</NewProductContext>
			</ShopContext>
		</CartContext>
	);
}

export default MyApp;

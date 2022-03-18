import logo from "../../static/img/logo/logo-new.png";
import CartIcon from "./../shop/cart";
import SearchBox from "./search";
import Link from "next/link";
import Image  from 'next/image';
import placeholder from "../../static/img/placeholder.png"
const NavBar = (props) => {
	return (
		<nav className="navbar main-nav navbar-light px-md-5 px-2  mx-md-5">
			<Link className="navbar-brand" href="/">
				{/* home */}
				<a>
				<Image src={logo} height="50" width="120" blurDataURL={placeholder}   alt="dakuleda logo" className="logo" />

					</a>
			</Link>

			<SearchBox />

			<div className="pr-md-5 pr-sm-0 cart-wrapper d-none d-md-block">
				<Link href="/about" className="px-4">
					Help
				</Link>
				{/* <Link href="/cart">
					<CartIcon />
				</Link> */}
			</div>
		</nav>
	);
};

export default NavBar;

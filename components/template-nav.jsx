import { getRole } from "../helpers/auth";
import NavLink from "./nav-link";

const AdminTemplateNav = ( props ) =>
{
	return (
		<nav className="nav lower-nav">
			<NavLink
				exact
				href="/admin"
				activeClassName="active-link"
				className="nav-link">
				<i className="bi bi-house pr-2"></i>
				Dashboard
			</NavLink>
			<NavLink
				exact
				href="/admin/orders"
				activeClassName="active-link"
				className="nav-link">
				<i className="bi bi-wallet2 pr-2"></i>
				Orders
			</NavLink>
			<NavLink
				exact
				href="/admin/products"
				activeClassName="active-link"
				className="nav-link">
				<i className="bi bi-box pr-2"></i>
				Products
			</NavLink>
			{ getRole() !== "staff" && (
				<NavLink
					exact
					href="/admin/settings"
					activeClassName="active-link"
					className="nav-link">
					<i className="bi bi-gear pr-2"></i>
					Settings
				</NavLink>
			) }
		</nav>
	);
};

export default AdminTemplateNav;

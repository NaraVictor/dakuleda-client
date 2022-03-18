import { Route } from "react-router-dom";
import { getRole, isAuthenticated } from "./auth";
import { Redirect } from "react-router-dom";
import NavBar from "./../components/nav/navbar";
import SubNav from "./../components/nav/subNav";
import Footer from "./../components/footer";
import TopNav from "./../components/nav/topNav";

function CustomRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => (
				<div className="page-container">
					<div className="content-wrapper">
						<TopNav />
						<NavBar />
						<SubNav />
						<Component {...props} />
					</div>
					<Footer />
				</div>
			)}
		/>
	);
}

function AdminRoute({ component: Component, role = "staff", ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated() ? (
					<>
						{/* ensuring that pop-up is suppressed */}
						{sessionStorage.setItem("charity", "charity-alert-ad-open")}
						<Component {...props} />
					</>
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
}

function NormalRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => (
				<>
					{sessionStorage.setItem("charity", "charity-alert-ad-open")}
					<Component {...props} />
				</>
			)}
		/>
	);
}

export { AdminRoute, CustomRoute, NormalRoute };

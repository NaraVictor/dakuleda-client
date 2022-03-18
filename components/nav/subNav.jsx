import React from "react";
// import { NavLink } from "react-router-dom";
import NavLink from './../nav-link';

const SubNav = ( props ) =>
{
	return (
		<div className="subnav dc-bg-gold text-center py-2">
			{/* <Link to="/" className="text-black-50 px-2">
				Today Deals
			</Link> */}
			<NavLink
				exact
				activeClassName='active-subnav'
				href="/"
				className="text-black-50 px-2">
				Home
			</NavLink>
			<NavLink
				exact
				activeClassName='active-subnav'
				href="/about"
				className="text-black-50 px-2">
				About Us
			</NavLink>
			<NavLink
				href="/cards"
				exact
				activeClassName='active-subnav'
				className="text-black-50 px-2">
				Cards
			</NavLink>
			<NavLink
				href="/showrooms"
				exact
				activeClassName='active-subnav'
				className="text-black-50 px-2">
				Showrooms
			</NavLink>
		</div>
	);
};

export default SubNav;

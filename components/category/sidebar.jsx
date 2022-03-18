import React from "react";
import NavLink from "../nav-link"
import { toTitleCase } from "../../helpers/utilities";

const CategorySideBar = ( props ) =>
{
	const { categories } = props;

	return (
		<ul className="categories-menu-list">
			{ categories.map( ( cat ) => (
				<NavLink
					key={ cat.id }
					href={ `/c/${ cat.slug }` }
					category={ cat.name }
					activeClassName="dc-gold h5"
					className="main-category pl-2">
					{ toTitleCase( cat.name ) }
				</NavLink>
			) ) }
		</ul>
	);
};

export default CategorySideBar;

import React, { useState } from "react";
import { toTitleCase } from "../../helpers/utilities";
import Link from 'next/link'
import NavLink from "../nav-link"

const CategoryNav = ( props ) =>
{
	const [ showMenu, setShowMenu ] = useState( false );

	return (
		<>
			<nav className="bg-secondary text-white mb-3 p-2">
				<span
					className="categories-menu mr-3"
					onClick={ () => setShowMenu( !showMenu ) }>
					{ showMenu ? (
						<i className="bi bi-x h5"></i>
					) : (
						<i className="bi bi-list h5"></i>
					) }
				</span>

				<span className="category-name">
					<Link href="#">
						<span className="text-white category-link mr-2">
							Categories
						</span>
					</Link>
					{/* <Link to="/c/all" className="text-white category-link mr-2">
					Categories
				</Link> */}
					&gt; { toTitleCase( props.category ) }
				</span>
			</nav >
			<div className="d-md-none">
				{ showMenu &&
					props.categories?.map( ( cat ) => (
						<NavLink
							key={ cat.id }
							href={ `/c/${ cat.slug }` }
							category={ cat.name }
							activeClassName="dc-gold h5"
							className="main-category">
							{ toTitleCase( cat.name ) }
						</NavLink>
					) ) }
			</div>
		</>
	);
};

export default CategoryNav;

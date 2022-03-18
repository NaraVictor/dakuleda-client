import React, { useState, createRef } from "react";
import searchIcon from "../../static/img/s1.png";
import { cedisLocale, fetchData } from "../../helpers/utilities";
import _, { result } from "lodash";
import { generateFileUrl } from "./../../helpers/utilities";

const SearchBox = ( props ) =>
{
	const [ showSearch, setShowSearch ] = useState( false );
	const [ results, setResults ] = useState( [] );

	const handleSearch = _.debounce(
		( e ) =>
		{
			const { value } = e.target;
			if ( value === "" )
			{
				setResults( [] );
				return;
			}
			fetchData( `search/${ value.toLowerCase() }` ).then( ( res ) =>
			{
				setResults( res.data.data );
			} );
		},

		300,
		{
			leading: false,
			trailing: true,
		}
	);

	return (
		<span id="search-container">
			<i
				className="bi bi-search h5 mt-3 mr-4"
				id="search-icon"
				onClick={ () => setShowSearch( !showSearch ) }></i>

			<input
				type="search"
				name="q"
				id="search-box"
				className={ showSearch ? "search-mobile" : "search" }
				placeholder="search products"
				onChange={ handleSearch }
				list="search-results"
				autoComplete="off"
			/>

			<div className={ `search-results ${ results.length === 0 && "d-none" }` }>
				{ results.map( ( r ) => (
					<div key={ r.id } className="row search-result">
						<div className="col-md-1 col-2">
							<img src={ generateFileUrl( r.imageFileName ) } alt="" width="50" />
						</div>
						<a
							href={ `/p/${ r.slug }` }
							key={ r.id }
							className="col-md-10 col-8 ml-2">
							{ r.name } { `(GHS ${ cedisLocale.format( r.newPrice ) })` }
						</a>
					</div>
				) ) }
			</div>
		</span>
	);
};

export default SearchBox;

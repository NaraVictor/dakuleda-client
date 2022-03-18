import { useContext } from "react";
import { shopContext } from "../context/shopContext";
import HeadTag from "./../components/header-tag";

const NotFoundPage = ( props ) =>
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	return (
		<div className="text-center mt-5">
			<HeadTag pageTitle="404 Resource not found" />
			<h1>Oops!</h1>
			<h4>Resource not found</h4>
			<a href="#" onClick={ () => window.history.go( -1 ) }>
				Go back
			</a>
		</div>
	);
};

export default NotFoundPage;

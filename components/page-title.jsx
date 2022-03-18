import { constants } from "../helpers/config";
import Head from 'next/head'

const PageTitle = ( { title, children } ) =>
{
	return (
		<Head key={ Math.random() }>
			<title>
				{ title } - { constants.siteTitle }
			</title>

			{ children }
		</Head>
	);
};

export default PageTitle;

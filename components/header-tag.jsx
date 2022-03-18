import { constants } from "../helpers/config";
import Head from "next/head";

const HeadTag = ({ pageTitle, title, description, image, id, link }) => {
	return (
		<Head key={id}>
			<title>
				{pageTitle} - {constants.siteTitle}
			</title>

			{/* og */}
			<meta name="description" content={description} />
			<meta property="og:description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={image} />
			<meta property="og:url" content={link} />
			<meta property="og:site_name" content={constants.siteTitle} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="article" />

			{/* twitter cards */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content={constants.siteTitle} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:creator" content={constants.siteTitle} />
		</Head>
	);
};

export default HeadTag;

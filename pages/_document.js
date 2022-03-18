import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta charset="utf-8" />

				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon_io/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon_io/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon_io/favicon-16x16.png"
				/>
				<link rel="manifest" href="favicon_io/site.webmanifest" />
				<meta name="theme-color" content="#000000" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;900&display=swap"
					rel="stylesheet"
				/>
				<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"
				/>

				{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-SB0G168E5B"></script>
				<script>
					window.dataLayer = window.dataLayer || []; function gtag()
					dataLayer.push(arguments); gtag(&#39;js&#39;, new Date());
					gtag(&#39;config&#39;, &#39;G-SB0G168E5B&#39;);
				</script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

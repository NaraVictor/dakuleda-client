import { useContext, useEffect } from "react";
import { shopContext } from "../context/shopContext";
import HeadTag from "./../components/header-tag";
import { generateFileUrl } from "./../helpers/utilities";

export default function AboutPage ( props )
{
	const { setLayout } = useContext( shopContext )
	setLayout( 'shop' )

	return (
		<div className="container mb-5">
			<HeadTag
				key={ Math.random() }
				pageTitle={ "About" }
				description="dakuleda.com is a business to customer ecommerce business specialized in
				the sales of automobile , home appliances, mattresses, furniture,
				building and plumbing materials, mobile phones and accessories, kitchen
				appliances..."
				title={ "About Dakuleda" }
				id={ Math.random() }
				image={ generateFileUrl( "logo.png" ) }
			/>
			<h3 className="mt-3">About Dakuleda.com</h3>
			<hr />
			<p>
				The success of our business will be built on quality, time tested
				products, affordable prices and highly satisfying customer experience.
				The name dakuleda stands for timeless quality and literally translated
				‘buy never buy’ it is original we stand on the same tradition to provide
				our customers and partners quality, affordable, and highly satisfying
				experience with dakuleda.com. To achieve that, dakuleda is built on the
				very value that makes our customers and partners satisfied.
			</p>
			<p>
				dakuleda.com is a business to customer ecommerce business specialized in
				the sales of automobile , home appliances, mattresses, furniture,
				building and plumbing materials, mobile phones and accessories, kitchen
				appliances, herbal and pharmaceuticals medicines, residential and
				commercial rental properties, agricultural and food, legal services,
				fashion and cosmetics, art collection and multimedia services to our
				customers and potential customers. We stock high quality mattresses,
				home appliances while depending on our partnered vendors to deliver on
				other categories.
			</p>
			<h5 className="mt-5">Mission</h5>
			<p>
				To offer our customers with lasting quality products, low prices,
				convenient payment options that everyone can afford and excellent
				customer service online and physical shops. And giving our partners
				exceptional maturely beneficial business experience.
			</p>
			<h5 className="mt-5">Vision</h5>
			<p>
				Our vision since day one have been to gain the trust as customer focused
				business providing low prices, quality lasting products, tailored
				payment options, and excellent customer services to customers and our
				vendors.
			</p>

			<div className="my-5">
				<h4>
					<strong>Services</strong>
				</h4>
				<div className="my-4">
					<h5 className="my-3">
						<strong>Cedi Currency</strong>
					</h5>
					<p>
						Dakuleda Cedi Currency is a membership based club that allows
						members to make a onetime subscription to enjoy installment, credit,
						training and discount opportunities to membership.
					</p>
				</div>
				<h5>
					<strong>What we do;</strong>
				</h5>
				<ol>
					<li>
						We offer members the opportunity to pay for products on daily,
						weekly and monthly installment to the full cost of predetermined
						products.
					</li>
					<li>
						We approve credit sales to members upon payment of an initial
						deposit agreed upon and a credit payment plan.
					</li>
					<li>
						We offer our members special discount on products from time to time.
					</li>
					<li>
						Cedi Currency Card members bearers enjoys free entrance to all
						dakuleda.com training events
					</li>
				</ol>
				<p>Cedi Currency is subjected to Terms and Conditions.</p>
			</div>
		</div>
	);
}

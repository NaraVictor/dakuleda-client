import logo from "../static/img/logo/logo-white.png";
import Image from 'next/image'

const Footer = () =>
{
	return (
		<footer className="bg-dark p-3 mt-5 text-white footer">
			<div className="container mt-4">
				<section className="row">
					<article className="col-12 col-md-6">
						<Image src={ logo } height="50" width="120" alt="company white logo at footer" />
						{/* <h5>About</h5> */ }
						<p className="py-4">
							dakuleda.com is a business to customer ecommerce business
							specialized in the sales of automobile , home appliances,
							mattresses, furniture, building and plumbing materials, mobile
							phones and accessories, kitchen appliances, herbal and
							pharmaceuticals medicines, residential and commercial rental
							properties, agricultural and food, legal services, fashion and
							cosmetics, art collection and multimedia services to our customers
							and potential customers.
						</p>
						<small className="d-md-block d-none">
							&copy; Copyright 2022, Dakuleda Ventures
						</small>
					</article>
					<article className="col-12 mt-md-0 mt-5 col-md-3">
						<h5 className="text-white">Contact Us</h5>
						<div>
							<div className="dc-yello">
								<strong>phone</strong>
							</div>
							<a href="tel:+233506358009" className="text-white">
								0506358009
							</a>
							<br />
							<a href="tel:+233392097231" className="text-white">
								0392097231
							</a>
						</div>
						<div className="mt-4">
							<div className="dc-yello">
								<strong>email</strong>
							</div>
							<a href="mailto:sales@dakuleda.com" className="text-white">
								sales@dakuleda.com
							</a>
						</div>
					</article>
					<article className="col-12  col-md-3 mt-md-0 mt-5">
						<h5 className="text-white">Address</h5>
						<div>
							<address>
								<span className="dc-yello">
									<strong>Dakuleda Ventures</strong>
								</span>
								<br />
								C/O P. O. Box 380 <br />
								Wa, Upper West Region, <br />
								Ghana
							</address>
						</div>

						<div className="social-handles my-3">
							<a
								href="https://facebook.com/dakuleda"
								target="_blank"
								rel="noreferrer"
								className="mr-4 text-white">
								<i className="bi bi-facebook h5"></i>
							</a>
							<a
								href="https://www.instagram.com/dakuleda1/"
								target="_blank"
								rel="noreferrer"
								className="mr-4 text-white">
								<i className="bi bi-instagram h5"></i>
							</a>
							<a
								href="https://twitter.com/DakuledaC"
								className="text-white mr-4"
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-twitter h5"></i>
							</a>
							<a
								href="https://wa.me/233506358009"
								className="text-white"
								target="_blank"
								rel="noreferrer">
								<i className="bi bi-whatsapp h5"></i>
							</a>
						</div>
						<small className="d-md-none d-block">
							&copy; Copyright 2022, Dakuleda Ventures
						</small>
					</article>
				</section>
			</div>
		</footer>
	);
};



export default Footer;

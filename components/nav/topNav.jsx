const TopNav = (props) => {
	return (
		<div className="top-nav dc-bg-black text-center py-1">
			<i className="bi bi-telephone-fill mr-2 dc-yello"></i>

			<a href="tel:+233506358009" className="text-light">
				0506358009
			</a>
			<span className="px-2 text-muted">/</span>
			<a href="tel:+233392097231" className="text-light">
				0392097231
			</a>

			<span className="ml-md-5 ml-4">
				<span className="mr-4">
					<a href="https://wa.me/233506358009" className="text-light">
						<i className="bi bi-whatsapp mr-1 dc-yello"></i>
						<span className="d-none d-md-inline">0506358009</span>
					</a>
				</span>

				<span>
					<a href="mailto:sales@dakuleda.com" className="text-light">
						<i className="bi bi-envelope mr-1 dc-yello"></i>
						<span className="d-none d-md-inline">sales@dakuleda.com</span>
					</a>
				</span>
			</span>
		</div>
	);
};

export default TopNav;

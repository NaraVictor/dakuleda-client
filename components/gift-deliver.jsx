const FreeDelivery = ({ showIconsOnly }) => {
	return (
		<div className="badge badge-primary p-1">
			<i className="bi bi-truck mr-1"></i>
			{showIconsOnly ? (
				<span className="d-md-inline d-none">Free Delivery</span>
			) : (
				<> Free Delivery</>
			)}
		</div>
	);
};
const GiftEligible = ({ showIconsOnly }) => {
	return (
		<div className="badge badge-danger p-1">
			<i className="bi bi-gift mr-1"></i>
			{showIconsOnly ? (
				<span className="d-md-inline d-none">Gift Eligible</span>
			) : (
				<> Gift Eligible</>
			)}
		</div>
	);
};

export { FreeDelivery, GiftEligible };

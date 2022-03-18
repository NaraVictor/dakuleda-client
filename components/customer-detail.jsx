const CustomerDetail = ({ cus }) => {
	return (
		<>
			<hr />
			<div className="row">
				<div className="col-12">
					<h6 className="mb-0">
						<strong>{cus.primaryContact}</strong>
					</h6>
					<small>Primary Contact</small>
				</div>
				<div className="col-12 my-2">
					{cus.secondaryContact && (
						<>
							<h6 className="mb-0">
								<strong>{cus.secondaryContact}</strong>
							</h6>
							<small>Secondary Contact</small>
						</>
					)}
				</div>
				<div className="col-12">
					<h6 className="mb-0">
						<strong>{cus.email}</strong>
					</h6>
					<small>Email Address</small>
				</div>
				<div className="col-12 my-2">
					<h6 className="mb-0">
						<strong>{cus.gender}</strong>
					</h6>
					<small>Gender</small>
				</div>
				<div className="col-12">
					<h6 className="mb-0">
						<strong>{cus.address}</strong>
					</h6>
					<small>Address</small>
				</div>
			</div>
		</>
	);
};

export default CustomerDetail;

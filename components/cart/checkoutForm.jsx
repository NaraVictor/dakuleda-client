import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CheckOutForm = ({ onCheckout, isCash, busy, onRedeemCode, card }) => {
	const { handleSubmit, register } = useForm();
	const [code, setCode] = useState("");

	const checkOut = (data) => {
		onCheckout(data);
	};

	return (
		<div>
			{!isCash && (
				<>
					<h5>Hire Purchase</h5>
					<p>
						If you are a salaried government worker, you can purchase this
						product and pay by monthly installment for a duration as selected.
					</p>
					<hr />
				</>
			)}
			<div>
				<span className="circle">1</span>
				<p className="d-inline pl-2">Personal</p>
			</div>
			<form onSubmit={handleSubmit(checkOut)}>
				<div className="row mt-4">
					<div className="col">
						{!isCash && (
							<>
								<div className="my-2">
									<input
										type="checkbox"
										id="governmentWorker"
										{...register("governmentWorker")}
										className="mr-2"
									/>
									<label htmlFor="governmentWorker">
										I am a salaried government worker
									</label>
								</div>
								<div className="mb-3">
									<input
										type="checkbox"
										id="businessOwner"
										{...register("businessOwner")}
										className="mr-2"
									/>
									<label htmlFor="businessOwner">I own a business</label>
								</div>
							</>
						)}
						<div>
							<label htmlFor="customerName" className="d-form-label">
								Full Name *
							</label>
							<input
								type="text"
								id="customerName"
								{...register("customerName", { required: true })}
								className="d-form-control w-100"
							/>
						</div>
						<div className="my-3">
							<label htmlFor="primaryContact" className="d-form-label">
								Primary Contact *
							</label>
							<input
								type="tel"
								maxLength={15}
								id="primaryContact"
								{...register("primaryContact", { required: true })}
								className="d-form-control w-100"
							/>
						</div>
						<div>
							<label htmlFor="secondaryContact" className="d-form-label">
								Secondary Contact
							</label>
							<input
								type="tel"
								maxLength={15}
								id="secondaryContact"
								{...register("secondaryContact")}
								className="d-form-control w-100"
							/>
						</div>
						<div className="my-3">
							<label htmlFor="email" className="d-form-label">
								Email
							</label>
							<input
								type="email"
								maxLength={50}
								id="email"
								{...register("email")}
								className="d-form-control w-100"
							/>
						</div>
						<div className="my-3">
							<label htmlFor="location" className="d-form-label">
								Location (district, town etc) *
							</label>
							<input
								type="text"
								id="location"
								{...register("location", { required: true })}
								className="d-form-control w-100"
							/>
						</div>
						<div className="my-3">
							<label htmlFor="nearestLandmark" className="d-form-label">
								Nearest Landmark (district, town etc) *
							</label>
							<input
								type="text"
								id="nearestLandmark"
								{...register("nearestLandmark", { required: true })}
								className="d-form-control w-100"
							/>
						</div>
					</div>
				</div>

				{/* payment method */}
				{!isCash && (
					<>
						<hr />
						<div>
							<span className="circle">2</span>
							<p className="d-inline pl-2">Credit Duration</p>
						</div>

						<div className="row">
							<div className="col">
								<div className="my-3">
									<label htmlFor="creditDuration" className="d-form-label">
										select preferred duration *
									</label>
									<select
										id="creditDuration"
										{...register("creditDuration")}
										className="d-form-control w-100">
										<option value="">choose one</option>
										<option value="1 Month">1 Month</option>
										<option value="2 Months">2 Months</option>
										<option value="3 Months">3 Months</option>
										<option value="4 Months">4 Months</option>
										<option value="5 Months">5 Months</option>
										<option value="6 Months">6 Months</option>
										<option value="7 Months">7 Months</option>
										<option value="8 Months">8 Months</option>
										<option value="9 Months">9 Months</option>
										<option value="10 Months">10 Months</option>
										<option value="11 Months">11 Months</option>
										<option value="1 Year">1 Year</option>
										<option value="2 Years">2 Years</option>
										<option value="3 Years">3 Years</option>
										<option value="4 Years">4 Years</option>
									</select>
								</div>
							</div>
						</div>
					</>
				)}

				{/* Delivery */}
				{isCash && (
					<>
						<hr />
						<div>
							<span className="circle">2</span>
							<p className="d-inline pl-2">Discount </p>
							<div className="my-3">
								<label htmlFor="couponCode" className="d-form-label">
									Code (coupon, gift card, promo code etc)
								</label>
								<input
									type="text"
									maxLength={50}
									id="cardCode"
									name="cardCode"
									// {...register("cardCode")}
									value={code}
									onChange={(e) => setCode(e.target.value)}
									onBlur={(e) => onRedeemCode(code)}
									placeholder="enter code here"
									className="d-form-control w-100"
								/>
								{card?.card?.title && (
									<strong className="text-success">{card.card.title}</strong>
								)}
								{(card?.isEmpty || card?.isUsed) && (
									<strong className="text-danger">invalid code</strong>
								)}
							</div>
						</div>
						<hr />
						<div>
							<span className="circle">2</span>
							<p className="d-inline pl-2">Delivery Method</p>
						</div>

						<div className="row">
							<div className="col">
								<div className="my-3">
									<label htmlFor="deliveryMethod" className="d-form-label">
										select preferred option *
									</label>
									<select
										id="deliveryMethod"
										{...register("deliveryMethod", { required: true })}
										className="d-form-control w-100">
										{!code && (
											<>
												<option value="">choose one</option>
												<option value="pickup">
													I will pick up item myself
												</option>
											</>
										)}
										<option value="deliver">Deliver it to me</option>
									</select>
								</div>
							</div>
						</div>
					</>
				)}
				<button
					type="submit"
					disabled={busy}
					className="btn-primary-filled mt-3 py-2 px-4">
					{busy ? "Processing..." : "Place Order"}
					<i className="bi bi-bag-check-fill ml-2"></i>
				</button>
				{!busy && (
					<button
						className="ml-1 px-3 py-2 btn-dc-white"
						onClick={() => {
							window.history.go(-1);
						}}>
						Go Back
						<i className="bi bi-arrow-left ml-2"></i>
					</button>
				)}
			</form>
		</div>
	);
};

export default CheckOutForm;

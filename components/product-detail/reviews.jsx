import React from "react";

const Reviews = (props) => {
	return (
		<section className="container" id="reviews">
			<article className="row">
				<div className="col">
					<h4>Reviews</h4>
					<hr />
				</div>
			</article>
			<article className="row">
				<div className="col-md-8 col-sm-12">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ad
						eos libero, hic saepe quia provident laborum illo delectus corrupti
						velit rerum doloremque sunt. Hic porro debitis facilis temporibus
						magnam.
					</p>
				</div>
				<div className="col-md-4 col-sm-12">
					<form>
						<input type="text" placeholder="full name" />
						<input type="email" placeholder="email" />
						<textarea
							name="comment"
							id="comment"
							cols="30"
							rows="10"></textarea>
						<input type="submit" value="Send" />
					</form>
				</div>
			</article>
		</section>
	);
};

export default Reviews;

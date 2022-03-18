import React, { Component } from "react";
import { Splide } from "@splidejs/react-splide";

// css
import "@splidejs/splide/dist/css/themes/splide-default.min.css";

export default class DefaultSlider extends Component {
	render() {
		const { slideNo, slideSpeed } = this.props;

		return (
			<Splide
				className="w-100"
				options={{
					type: "loop",
					gap: "1rem",
					autoplay: true,
					pauseOnHover: true,
					resetProgress: false,
					arrows: "slider",
					drag: true,
					keyboard: true,
					lazyload: true,
					autoheight: true,
					speed: slideSpeed ?? 400,
					perPage: slideNo ?? 1,
				}}
				hasAutoplayProgress
				hasSliderWrapper>
				{this.props.children}
			</Splide>
		);
	}
}

export class SlimSlider extends Component {
	render() {
		const { slideNo, duration } = this.props;

		return (
			<Splide
				options={{
					type: "loop",
					gap: "1rem",
					autoplay: true,
					pauseOnHover: true,
					resetProgress: false,
					arrows: "false",
					drag: true,
					keyboard: true,
					// lazyload: true,
					interval: duration ?? 5000,
					autoheight: true,
					perPage: slideNo ?? 1,
					pagination: false,
				}}
				hasSliderWrapper>
				{this.props.children}
			</Splide>
		);
	}
}

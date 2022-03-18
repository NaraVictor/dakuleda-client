import React from "react";
import { generateFileUrl, toTitleCase } from "./../../helpers/utilities";
import Link from "next/link";
import Image from 'next/image'
import placeholder from "../../static/img/placeholder.png"

const Category = (props) => {
	const { imageFileName, name, slug } = props.category;
	return (
		<Link href={`/c/${slug}`} category={name}>
			<a>
				<div className="category text-center">
					<Image src={ generateFileUrl( imageFileName ) } blurDataURL={ placeholder }
						alt="category picture" height="150" width="150" />
				</div>
				<div className="category-title text-center">{toTitleCase(name)}</div>
			</a>
		</Link>
	);
};

export default Category;

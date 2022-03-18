import Link from "next/link";
const TagsComponent = ( props ) =>
{
	return (
		<div className="components">
			<div className="buttons mt-3">
				<Link className="btn-dc-white p-2" href="/admin/products/new-tag">
					<i className="bi bi-plus"></i>
					create a tag
				</Link>
			</div>
		</div>
	);
};

export { TagsComponent };

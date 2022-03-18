const NewTag = (props) => {
	return (
		<div>
			<div className="d-flex justify-content-between align-items-center">
				<h5>New Tag</h5>
				<button className="btn" onClick={() => props.history.go(-1)}>
					<span className="h5">
						<i className="bi bi-arrow-left-circle"></i> back
					</span>
				</button>
			</div>
			<hr />
			<button className="btn-primary-filled px-4 py-2">Create Tag</button>
			<hr />

			<form>
				<div className="row">
					<div className="col-12"></div>
				</div>
			</form>
		</div>
	);
};

export { NewTag };

import { useState } from "react";
import { useAsyncDebounce } from "react-table";
const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
}) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = useState(globalFilter);

	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined);
	}, 300);

	return (
		<input
			type="search"
			name="search"
			className="form-control"
			id="searc"
			placeholder={`search ${count} records...`}
			value={value || ""}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
		/>
	);
};

export default GlobalFilter;

import { exportToExcel } from "../helpers/utilities";
import excelIcon from "../static/img/excel.png";

const ExportToExcelButton = ({
	tableId,
	fileName,
	workSheetName,
	btnLabel = "Export to Excel",
	className = "",
}) => {
	return (
		<button
			className={`btn btn-light ${className}`}
			onClick={() => exportToExcel(tableId, fileName, workSheetName)}>
			{btnLabel}
			<img src={excelIcon} className="ms-2" alt="export to excel" height="25" />
		</button>
	);
};

export default ExportToExcelButton;

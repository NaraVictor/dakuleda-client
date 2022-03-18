import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/utilities";
import { CategoryDetail } from "./category-detail";
import { CategoryEdit } from "./category-edit";
import { getRole } from "../../../helpers/auth";
import { EditOutlined, FolderOpenTwoTone } from "@ant-design/icons";
import { Button, Modal, Table, Space } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import { NewCategory } from "./new-category";

const CategoriesComponent = ( props ) =>
{
	const [ categories, setCategories ] = useState( [] );
	const [ filteredData, setFilteredData ] = useState( [] );
	const [ modal, setModal ] = useState( {
		isVisible: false,
		content: "",
		title: "",
		width: "",
	} );

	const showModal = ( title, content, width ) =>
	{
		setModal( {
			content,
			title,
			isVisible: true,
			width,
		} );
	};

	const handleCancel = () =>
	{
		setModal( {
			...modal,
			isVisible: false,
		} );
	};

	const fetchCategories = () =>
	{
		fetchData( "categories" ).then( ( res ) =>
		{
			setCategories( res.data.data );
			setFilteredData( res.data.data );
		} );
	};

	useEffect( () =>
	{
		fetchCategories();
	}, [] );

	const tableCols = [
		{
			title: "Name",
			dataIndex: "name",
			width: "150px",

			sorter: ( a, b ) => a.name.length - b.name.length,
			sortDirections: [ "descend", "ascend" ],
		},

		{
			title: "Action",
			width: "50px",
			render: ( text, record, index ) => (
				<ButtonGroup className="row">
					<Button
						title="view record details"
						className="col-md-6 col-12"
						onClick={ () =>
							showModal(
								"Category Detail",
								<CategoryDetail
									category={ record }
									onReload={ () =>
									{
										fetchCategories();
									} }
								/>
							)
						}>
						<FolderOpenTwoTone />
					</Button>
					<Button
						title="edit record details"
						className="col-md-6 col-12"
						onClick={ () =>
							showModal(
								"Category Edit",
								<CategoryEdit
									obj={ record }
									key={ Math.random() }
									onReload={ fetchCategories }
								/>
							)
						}>
						<EditOutlined />
					</Button>
					{/* {getRole() === "admin" && (
						<>
							<Button
								title="delete record"
								className="col-md-6 col-12"
								onClick={() => deleteRecord(record.id)}>
								<DeleteOutlined className="text-danger" />
							</Button>
						</>
					)} */}
				</ButtonGroup>
			),
		},
	];

	return (
		<div className="components">
			<Modal
				title={ modal.title }
				visible={ modal.isVisible }
				footer={ null }
				onCancel={ handleCancel }
				width={ modal.width && modal.width }>
				{ modal.content }
			</Modal>
			{ getRole() === "admin" && (
				<div className="buttons my-4">
					<a className="btn-dc-white p-2"
						onClick={ () =>
						{
							showModal( 'New Category', <NewCategory onReload={ fetchCategories } /> )
						} }
					// href="/admin/settings/new-category"
					>
						<>
							<i className="bi bi-plus"></i>
							add category
						</>
					</a>
				</div>
			) }
			<div className="row">
				<div className="col-md-12">
					<Table
						loading={ filteredData.length === 0 ? true : false }
						rowKey={ ( record ) => record.id }
						bordered
						sticky
						pagination={ { defaultPageSize: 10 } }
						footer={ ( data ) => (
							<Space>
								<strong>{ data.length }</strong> records
							</Space>
						) }
						columns={ tableCols }
						dataSource={ filteredData }
					/>
				</div>
			</div>
		</div>
	);
};

export { CategoriesComponent };

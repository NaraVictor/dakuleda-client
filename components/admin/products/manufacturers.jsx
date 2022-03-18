import { useState, useEffect } from "react";
import { fetchData } from "../../../helpers/utilities";
import { ManufacturerDetail } from "./manufacturer-detail";
import { ManufacturerEdit } from "./manufacturers-edit";
import { getRole } from "../../../helpers/auth";
import { Modal, Table, Space, Button } from "antd";
import { EditOutlined, FolderOpenTwoTone } from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import Link from 'next/link'
import PageTitle from "../../page-title";
import { NewManufacturer } from "./new-manufacturer";
const ManufacturersComponent = ( props ) =>
{
	const [ manufacturers, setManufacturers ] = useState( [] );
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

	const fetchManufacturers = () =>
	{
		fetchData( "manufacturers" ).then( ( res ) =>
		{
			setManufacturers( res.data?.data );
			setFilteredData( res.data?.data );
		} );
	};

	useEffect( () =>
	{
		fetchManufacturers();
	}, [] );

	const tableCols = [
		{
			title: "Manufacturer",
			dataIndex: "name",
			sorter: ( a, b ) => a.name.length - b.name.length,
			sortDirections: [ "descend", "ascend" ],
		},

		{
			title: "Action",
			render: ( text, record, index ) => (
				<ButtonGroup className="row">
					<Button
						title="view record details"
						className="col-md-6 col-12"
						onClick={ () =>
							showModal(
								"Manufacturer Detail",
								<ManufacturerDetail
									manufactuer={ record }
									onReload={ () =>
									{
										fetchManufacturers();
									} }
								/>
							)
						}>
						View
						<FolderOpenTwoTone />
					</Button>
					<Button
						title="edit record details"
						className="col-md-6 col-12"
						onClick={ () =>
							showModal(
								"Manufacturer Edit",
								<ManufacturerEdit
									key={ Math.random() }
									obj={ record }
									onReload={ () =>
									{
										fetchManufacturers();
									} }
								/>
							)
						}>
						Edit
						<EditOutlined />
					</Button>
				</ButtonGroup>
			),
		},
	];

	return (
		<div className="components">
			<PageTitle title='Manufacturers' />
			<Modal
				title={ modal.title }
				visible={ modal.isVisible }
				footer={ null }
				onCancel={ handleCancel }
				width={ modal.width && modal.width }>
				{ modal.content }
			</Modal>
			{ getRole() !== "staff" && (
				<div className="buttons my-4">
					<a
						className="btn-dc-white p-2"
						onClick={ () => showModal( 'New Manufacturer', <NewManufacturer reload={ fetchManufacturers } /> ) }
					// href="/admin/products/new-manufacturer"
					>
						<i className="bi bi-plus"></i>
						add manufacturer
					</a>
				</div>
			) }
			<div className="row">
				<div className="col-12">
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

export default ManufacturersComponent;

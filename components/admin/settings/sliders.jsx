import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchData } from "../../../helpers/utilities";
import { SliderDetail } from "./slider-detail";
import { SliderEdit } from "./slider-edit";
import { NewSlider } from "./new-slider";
import { EditOutlined, FolderOpenTwoTone } from "@ant-design/icons";
import { Button, Modal, Table, Space } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

const SlidersComponent = ( props ) =>
{
	const [ sliders, setSliders ] = useState( [] );
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
	const fetchSliders = () =>
	{
		fetchData( "sliders" ).then( ( res ) =>
		{
			setSliders( res.data.data );
			setFilteredData( res.data.data );
		} );
	};

	useEffect( () =>
	{
		fetchSliders();
	}, [] );

	const tableCols = [
		{
			title: "Title",
			dataIndex: "title",
			sorter: ( a, b ) => a.title.length - b.title.length,
			sortDirections: [ "descend", "ascend" ],
		},
		{
			title: "Status",
			sorter: ( a, b ) => a.name.length - b.name.length,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) =>
				r.isDeleted ? (
					<span className="text-danger">inactive</span>
				) : (
					<span className="text-success">active</span>
				),
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
								"Slider Detail",
								<SliderDetail
									slider={ record }
									onReload={ () =>
									{
										fetchSliders();
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
								"Slider Edit",
								<SliderEdit
									obj={ record }
									key={ Math.random() }
									onReload={ fetchSliders }
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
			<div className="buttons my-4">
				<a className="btn-dc-white p-2"
					onClick={ () => showModal( 'New Slider', <NewSlider onReload={ fetchSliders } /> ) }
				// href="/admin/settings/new-slider"
				>
					<>
						<i className="bi bi-plus"></i>
						add slider
					</>
				</a>
			</div>

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

export { SlidersComponent };

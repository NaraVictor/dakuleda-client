import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchData } from "../../../helpers/utilities";
import { CardDetail } from "./card-detail";
import { CardEdit } from "./card-edit";
import { NewCard } from "./new-card";
import { getRole } from "../../../helpers/auth";
import { EditOutlined, FolderOpenTwoTone } from "@ant-design/icons";
import { Button, Modal, Table, Space } from "antd";
import ButtonGroup from "antd/lib/button/button-group";


const CardsComponent = ( props ) =>
{
	const [ cards, setCards ] = useState( [] );
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

	const fetchCards = () =>
	{
		fetchData( "cards" ).then( ( res ) =>
		{
			setFilteredData( res.data.data );
			setCards( res.data.data );
		} );
	};
	useEffect( () =>
	{
		fetchCards();
	}, [] );

	const tableCols = [
		{
			title: "Title",
			dataIndex: "title",
			sorter: ( a, b ) => a.title.length - b.title.length,
			sortDirections: [ "descend", "ascend" ],
		},
		{
			title: "# Codes",
			sorter: ( a, b ) => a.codes.length - b.codes.length,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) => r.codes.length,
		},
		{
			title: "Value",
			sorter: ( a, b ) => a.name.length - b.name.length,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) =>
				r.isFixedValue ? (
					<span>₵ { r.fixedValue }</span>
				) : (
					<span>{ r.percentageValue * 100 } %</span>
				),
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
								"Card Detail",
								<CardDetail
									card={ record }
									onReload={ () =>
									{
										fetchCards();
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
								"Card Edit",
								<CardEdit
									obj={ record }
									key={ Math.random() }
									onReload={ fetchCards }
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
						onClick={ () => showModal( 'New Card', <NewCard onReload={ fetchCards } /> ) }
					// href="/admin/settings/new-card"
					>
						<>
							<i className="bi bi-plus"></i>
							add card
						</>
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

export { CardsComponent };

import { useState, useEffect } from "react";
import { deleteData, fetchData, cedisLocale } from "../../../helpers/utilities";
import { OrderDetail } from "./order-detail";
import { format } from "date-fns";
import { Modal, Table, Space, Button } from "antd";
import
{
	AlertFilled,
	DeleteOutlined,
	EditOutlined,
	FolderOpenTwoTone,
	PlusOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import { getRole } from "../../../helpers/auth";

const OrdersComponent = ( { state } ) =>
{
	const [ orders, setOrders ] = useState( [] );
	const [ selected, setSelected ] = useState( {} );
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

	const [ mode, setMode ] = useState( {
		edit: false,
		data: {},
	} );

	const handleEdit = ( data, editMode ) =>
	{
		setMode( {
			edit: editMode,
			data,
		} );
	};

	const selectItem = ( item ) =>
	{
		setSelected( item );
		setMode( {
			...mode,
			edit: false,
		} );
	};

	const fetchOrders = ( status ) =>
	{
		fetchData( `orders?status=${ status }` ).then( ( res ) =>
		{
			setOrders( res.data?.data );
			setFilteredData( res.data?.data );
		} );
	};

	const deleteRecord = ( id ) =>
	{
		if (
			window.confirm( "Are you sure of deleting this product? Can't be undone!" )
		)
		{
			deleteData( `orders/${ id }` ).then( ( res ) =>
			{
				if ( res.status === 200 )
				{
					fetchOrders( state );
					alert( "order deleted" );
					return;
				}

				alert( "request not completed!" );
			} );
		}
	};

	useEffect( () =>
	{
		fetchOrders( state );
	}, [ state ] );

	const tableCols = [
		{
			title: "Date",
			sorter: ( a, b ) => a.createdAt.length - b.createdAt.length,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) => new Date( r.createdAt ).toDateString()
		},
		{
			title: "Customer",
			dataIndex: "customerName",
			sorter: ( a, b ) => a.customerName.length - b.customerName.length,
			sortDirections: [ "descend", "ascend" ],
		},
		{
			title: "Mode",
			dataIndex: "paymentMode",
			sorter: ( a, b ) => a.paymentMode - b.paymentMode,
			sortDirections: [ "descend", "ascend" ],
			// render: (t, r, i) => cedisLocale.format(r.paymentMode),
		},
		{
			title: "Order Total",
			sorter: ( a, b ) => a.orderTotal - b.orderTotal,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) => cedisLocale.format( r.orderTotal ),
		},

		{
			title: "Action",
			render: ( text, record, index ) => (
				<ButtonGroup>
					<Button
						title="view record details"
						onClick={ () =>
							showModal(
								"Order Detail",
								<OrderDetail
									order={ record }
									onReload={ () =>
									{
										fetchOrders( state );
										// setSelected({});
									} }
								/>
							)
						}>
						<FolderOpenTwoTone />
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
				{/* <div className="col-md-7">
					<div className="shadow detail-view">
						<OrderDetail
							order={selected}
							onEdit={handleEdit}
							onReload={() => {
								fetchOrders(state);
								setSelected({});
							}}
						/>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export { OrdersComponent };

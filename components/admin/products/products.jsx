import { useState, useEffect } from "react";
import { fetchData, cedisLocale } from "../../../helpers/utilities";
import { ProductDetail } from "./product-detail";
import { ProductEdit } from "./product-edit";
import { getRole } from "../../../helpers/auth";
import { Modal, Table, Space, Button } from "antd";
import Link from "next/link";
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
import NewProduct from "./new-product";

const ProductsComponent = ( props ) =>
{
	const [ products, setProduct ] = useState( [] );
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

	const fetchProducts = () =>
	{
		fetchData( "products" ).then( ( res ) =>
		{
			if ( res?.status === 200 )
			{
				setProduct( res.data.data );
				setFilteredData( res.data.data );
			}
		} );
	};

	useEffect( () =>
	{
		fetchProducts();
	}, [] );

	const tableCols = [
		{
			title: "Product",
			dataIndex: "name",
			sorter: ( a, b ) => a.name.length - b.name.length,
			sortDirections: [ "descend", "ascend" ],
		},
		{
			title: "Category",
			sorter: ( a, b ) => a.category.name - b.category.name,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) => r.category.name,
		},
		{
			title: "Price",
			sorter: ( a, b ) => a.newPrice - b.newPrice,
			sortDirections: [ "descend", "ascend" ],
			render: ( t, r, i ) => cedisLocale.format( r.newPrice ),
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
								"Product Detail",
								<ProductDetail
									product={ record }
									onReload={ () =>
									{
										fetchProducts();
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
								"Product Edit",
								<ProductEdit
									key={ Math.random() }
									obj={ record }
									onReload={ () =>
									{
										fetchProducts();
									} }
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
			{ getRole() !== "staff" && (
				<div className="buttons my-4">
					<a className="btn-dc-white p-2" onClick={ () =>
					{
						showModal( 'New Product', <NewProduct reload={ fetchProducts } />, 'md-large' )
					} } >
						<i className="bi bi-plus"></i>
						add product
					</a>
				</div>
			) }
			<div>
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
		</div>
	);
};

export default ProductsComponent 

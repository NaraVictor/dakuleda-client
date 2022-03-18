import PageTitle from "../../components/page-title";
import { useContext, useEffect, useState } from "react";
import { OrdersComponent } from "../../components/admin/orders/orders";
import { RefundsComponent } from "../../components/admin/orders/refunds";
import { shopContext } from "../../context/shopContext";

const OrdersPage = ( props ) =>
{
	const [ page, setPage ] = useState( 1 );
	const { setLayout } = useContext( shopContext )
	setLayout( 'admin' )



	return (
		<div className="page orders-page">
			<PageTitle title="Orders" />
			<h5>Orders</h5>
			<div className="sub-menu shadow-sm">
				{/* <a
					className={`tab ${page === 0 && "active-tab"}`}
					href="#"
					onClick={() => setPage(0)}>
					All
				</a> */}
				<a
					className={ `tab ${ page === 1 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 1 ) }>
					Pending
				</a>
				<a
					className={ `tab ${ page === 2 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 2 ) }>
					Fulfilled
				</a>
				<a
					className={ `tab ${ page === 3 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 3 ) }>
					Declined
				</a>
				{/* <a
					className={`tab ${page === 4 && "active-tab"}`}
					href="#"
					onClick={() => setPage(4)}>
					Refunds
				</a> */}
			</div>
			<section>{ page === 0 && <OrdersComponent /> }</section>
			<section>{ page === 1 && <OrdersComponent state="pending" /> }</section>
			<section>{ page === 2 && <OrdersComponent state="fulfilled" /> }</section>
			<section>{ page === 3 && <OrdersComponent state="cancelled" /> }</section>
			<section>{ page === 4 && <RefundsComponent /> }</section>
		</div>
	);
};

export default OrdersPage;

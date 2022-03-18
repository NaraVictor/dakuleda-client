import { useContext, useState } from "react";
import { AccountsComponent } from '../../components/admin/settings/accounts'
import { CardsComponent } from '../../components/admin/settings/cards'
import { CategoriesComponent } from '../../components/admin/settings/categories'
import { SlidersComponent } from '../../components/admin/settings/sliders'
import { getRole } from "../../helpers/auth";
import PageTitle from '../../components/page-title'
import { shopContext } from "../../context/shopContext";

const SettingPages = ( props ) =>
{
	const [ page, setPage ] = useState( 2 );

	const { setLayout } = useContext( shopContext )
	setLayout( 'admin' )


	return (
		<div className="page settings-page">
			<PageTitle title="Settings" />
			<h5>Settings</h5>
			<div className="sub-menu shadow-sm">
				<a
					className={ `tab ${ page === 2 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 2 ) }>
					Categories
				</a>
				{/* <a
					className={`tab ${page === 5 && "active-tab"}`}
					href="#"
					onClick={() => setPage(5)}>
					Contact Us
				</a>
				<a
					className={`tab ${page === 1 && "active-tab"}`}
					href="#"
					onClick={() => setPage(1)}>
					Company
				</a> */}

				<a
					className={ `tab ${ page === 4 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 4 ) }>
					Cards
				</a>
				<a
					className={ `tab ${ page === 3 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 3 ) }>
					Sliders
				</a>
				{/* { getRole() === "admin" && ( */ }
				<a
					className={ `tab ${ page === 10 && "active-tab" }` }
					href="#"
					onClick={ () => setPage( 10 ) }>
					Accounts
				</a>
				{/* ) } */ }
			</div>

			{ page === 10 && <AccountsComponent /> }
			{/* {page === 1 && <CompanyComponent />} */ }
			{ page === 2 && <CategoriesComponent /> }
			{ page === 3 && <SlidersComponent /> }
			{ page === 4 && <CardsComponent /> }
			{/* {page === 5 && <ContactUsComponent />} */ }
		</div>
	);
};

export default SettingPages;

import AdminTemplateNav from "./template-nav";
// import userIcon from "../static/img/boy.png";
import { getUser, isAuthenticated, logOut } from "../helpers/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminTemplate = ( props ) =>
{
	const router = useRouter();

	return (
		<div className="admin-template">
			<div className="nav upper-nav py-3">
				{/* <h2 className="title mb-0">Dakuleda</h2> */ }
				<Link href="/">
					<img src='../static/img/logo/logo-new.png' height="50" alt="company logo" />
				</Link>
				<div>
					<span className="d-block">
						Hi, <strong>{ getUser()?.fullName }</strong>
					</span>
					<a href="#" onClick={ () =>
					{
						logOut()
						router.reload()
					} }>
						Log out
					</a>
				</div>
			</div>
			<AdminTemplateNav />
			<div className="content">
				{/* <div className="status-bar bg-success p-2">status bar</div> */ }
				<div className="p-md-4 p-2 container">{ props.children }</div>
			</div>
		</div>
	);
};

export default AdminTemplate;

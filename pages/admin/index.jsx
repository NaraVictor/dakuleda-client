import PageTitle from "../../components/page-title";
import greet from "greet-by-time";
import { useState, useEffect, useContext } from "react";
import { getRole, getUser } from "../../helpers/auth";
import { Line } from "react-chartjs-2";
import { orderChartData } from "../../helpers/data";
import
{
	fetchData,
	postData,
	uploadFile,
	deleteData,
	cedisLocale,
} from "../../helpers/utilities";
import { generateFileUrl } from "../../helpers/utilities";
import { useForm } from "react-hook-form";
import { shopContext } from "../../context/shopContext";

const DashboardPage = ( props ) =>
{
	const hour = new Date().getHours();
	const [ chatOrders, setChatOrders ] = useState( [] );
	const [ pendingCards, setPendingCards ] = useState( 0 );
	const [ orders, setOrders ] = useState( [] );
	const [ todayVisits, setTodayVisits ] = useState( [] );
	const [ totalVisits, setTotalVisits ] = useState( {} );
	const [ products, setProducts ] = useState( [] );
	const [ ads, setAds ] = useState( [] );
	const { handleSubmit, reset, register } = useForm();

	const { setLayout } = useContext( shopContext )

	const [ image, setImage ] = useState( {
		file: {},
		url: "",
	} );

	const fetchStats = () =>
	{
		fetchData( "analytics?q=site" ).then( ( res ) =>
		{
			res.status === 200 && setTodayVisits( res.data.data );
		} );
		fetchData( "analytics?q=total-visits" ).then( ( res ) =>
		{
			res.status === 200 && setTotalVisits( res.data.data );
		} );
	};

	const fetchAds = () =>
	{
		fetchData( "ads" ).then( ( res ) =>
		{
			if ( res.status === 200 )
			{
				setAds( res.data?.data );
			}
		} );
	};

	const deleteAd = ( id ) =>
	{
		deleteData( `ads/${ id }` ).then( ( res ) => fetchAds() );
	};

	const uploadAdImage = ( e ) =>
	{
		if ( e.target.files[ 0 ].type.slice( 0, 5 ) !== "image" )
		{
			alert( "file type not supported!" );
			return;
		}

		if ( e.target.value )
		{
			setImage( {
				file: e.target.files,
				url: URL.createObjectURL( e.target.files[ 0 ] ),
			} );
		}
	};

	const submitAd = ( data ) =>
	{
		if ( ads?.length >= 2 )
		{
			alert( "You cannot add more than two ads at this time" );
			return;
		}

		postData( "ads", data ).then( ( res ) =>
		{
			if ( res?.status === 200 )
			{
				uploadFile(
					`ads/${ res.data.data.id }/upload-picture`,
					image.file[ 0 ],
					"adImage"
				).then( ( r ) =>
				{
					if ( r?.status === 200 )
					{
						setImage( {
							file: {},
							url: "",
						} );
						fetchAds();
						reset();
						alert( "ad successfully created!" );
						// return;
					}
					// alert("something went wrong");
				} );
			}
		} );
	};

	useEffect( () =>
	{
		setLayout( 'admin' )

		// analytics
		fetchStats();

		fetchData( "dashboard" ).then( ( res ) =>
		{
			if ( res.status === 200 )
			{
				setOrders( res.data.orders );
				setChatOrders( res.data.chatOrder );
				setProducts( res.data.products );
				setPendingCards( res.data.unUsedCards );
			}
			fetchAds();
		} );

		return () =>
		{
			setLayout( '' )
		}

	}, [] );

	return (
		<div className="page dashboard-page">
			<PageTitle title="Dashboard" />
			{/* greeting and summary */ }
			<div className="row mb-4">
				<div className="col-md-6 col-12">
					<p className="pe-3 m-0">
						<i className="bi bi-person"></i>
						{ getUser()?.fullName }
					</p>
					<h5>{ greet( getUser()?.username, hour ) }</h5>
				</div>
				<div className="col-md-3 col-12">
					<div
						className={ `d-card shadow-sm ${ orders.filter( ( order ) => order.status === "pending" ).length === 0
							? "bg-success text-white"
							: "bg-danger text-white"
							}` }>
						<h3 className="m-0 text-white">
							{ orders.filter( ( order ) => order.status === "pending" ).length || 0 }
						</h3>
						<p>Pending orders</p>
					</div>
				</div>
				<div className="col-md-3 col-12 mt-md-0 mt-3">
					<div
						className={ `d-card shadow-sm ${ pendingCards === 0
							? "bg-success text-white"
							: "bg-danger text-white"
							}` }>
						<h3 className="m-0 text-white">{ pendingCards }</h3>
						<p>Unused Cards</p>
					</div>
				</div>
			</div>
			<div className="row" style={ { height: "55vh" } }>
				<div className="col-md-9 col-12 bg-white shadow-sm py-5"></div>
				<div className="col-md-3 col-12 bg-info py-5 text-white">
					<h5>Visitors Statistics</h5>
					<hr className="bg-white" />
					<p className="my-0">
						All time visits: <strong>{ totalVisits?.totalVisits }</strong>
					</p>
					{/* <hr className="bg-white" />
					<h6>TODAY</h6>
					<hr className="bg-white" /> */}
					<p>
						Visits today: <strong>{ todayVisits?.length }</strong>
					</p>
					<h6 className="mt-4">
						<strong>Platforms (today)</strong>
					</h6>
					<ul>
						<li>
							Android: { todayVisits.filter( ( v ) => v.os === "Android" ).length }
						</li>
						<li>iOS: { todayVisits.filter( ( v ) => v.os === "iOS" ).length }</li>
						<li>
							Windows: { todayVisits.filter( ( v ) => v.os === "Windows" ).length }
						</li>
						<li>Mac: { todayVisits.filter( ( v ) => v.os === "Mac OS" ).length }</li>
						<li>Linux: { todayVisits.filter( ( v ) => v.os === "Linux" ).length }</li>
					</ul>

					<button className="btn-dc-white mt-3 py-2 px-4">
						more
						<i className="bi bi-arrow-right ml-2"></i>
					</button>
				</div>
			</div>
			<div className="py-4"></div>
			<div className="row mt-5 p-3 bg-white shadow-sm">
				<div className="col-md-8 col-12 mt-5">
					<h5 className="text-success">
						<strong>Ads</strong>
					</h5>
					<table className="table table-bordered table-hover">
						<thead>
							<tr>
								<th>size</th>
								<th>image</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ ads.length > 0 &&
								ads.map( ( ad, i ) => (
									<tr key={ i }>
										<td>
											{ ad.size }
											{ ad.url && (
												<small className="d-block">
													(<strong>url:</strong> { ad.url })
												</small>
											) }
										</td>
										<td>
											<img
												src={ generateFileUrl( ad.imageFileName ) }
												alt=""
												height="100"
											/>
										</td>

										<td>
											<a
												href="#"
												onClick={ () =>
												{
													if ( window.confirm( "Are you sure? " ) ) deleteAd( ad.id );
												} }>
												delete
											</a>
										</td>
									</tr>
								) ) }
						</tbody>
					</table>
				</div>
				<div className="col-md-3 col-12 mt-5">
					{ ads?.length < 2 && getRole() !== "staff" ? (
						<form onSubmit={ handleSubmit( submitAd ) }>
							<h4>Create new ad</h4>
							<hr />
							<label htmlFor="url" className="d-form-label">
								url (destination location linked to ad)
							</label>
							<input
								type="url"
								id="url"
								placeholder="url linked to ad"
								className="d-form-control w-100 shadow"
								{ ...register( "url" ) }
							/>

							<div className="my-3">
								<label htmlFor="creditDuration" className="d-form-label">
									size *
								</label>
								<select
									id="size"
									{ ...register( "size", { required: true } ) }
									className="d-form-control w-100 shadow">
									<option value="Big">Big</option>
									<option value="Small">Small</option>
								</select>
							</div>

							{ image.url && (
								<button className="btn btn-success mb-3" type="submit">
									Create Ad
								</button>
							) }
							<input
								type="file"
								name="adImage"
								id="adImage"
								required
								onChange={ ( e ) => uploadAdImage( e ) }
								accept=".jpg, .png, .gif, .jpeg"
							/>
							<div className="mt-3">
								{ image.url && (
									<img
										src={ image.url }
										alt="category img"
										style={ {
											maxHeight: "250px",
											maxWidth: "250px",
										} }
									/>
								) }
							</div>
						</form>
					) : (
						<p className="mt-4 text-info">
							Cannot create a new ad now.
							<ul>
								<li>Only two ads are allowed</li>
								<li>Only Managers/Admins can create an ad</li>
							</ul>
						</p>
					) }
				</div>
			</div>
			<div className="row mt-5">
				<div className="col-12 p-3 bg-white shadow-sm">
					<h5 className="text-success">
						<strong>Frequently Ordered</strong>
					</h5>
					<table className="table table-bordered table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>name</th>
								{/* <th>category</th> */ }
								<th>unit price</th>
								<th>order count</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ products.map( ( prod, index ) => (
								<tr key={ prod.id }>
									<td>{ ++index }</td>
									<td>
										<a href={ `/p/${ prod.slug }` }>{ prod.name }</a>
									</td>
									{/* <td>{prod.category.name}</td> */ }
									<td>{ cedisLocale.format( prod.newPrice ) }</td>
									<td>{ prod.orderCount }</td>
									<td>
										<img
											src={ generateFileUrl( prod.imageFileName ) }
											alt=""
											height="50"
										/>
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default DashboardPage;

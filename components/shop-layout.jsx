import CharityAlert from "./charity";
import NavBar from "./nav/navbar";
import SubNav from "./nav/subNav";
import TopNav from "./nav/topNav";
import Footer from './footer'

const ShopLayout = ( { children } ) =>
{
    return (
        <>
            <TopNav />
            <NavBar />
            <SubNav />
            <CharityAlert />
            { children }
            <Footer />
        </>

    );
}

export default ShopLayout;
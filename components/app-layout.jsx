import { shopContext } from '../context/shopContext';
import ShopLayout from './shop-layout'
import { useContext, useEffect, useState } from 'react';
import AdminTemplate from './admin-template'
import { CSR } from '../helpers/utilities';
import { isAuthenticated } from '../helpers/auth';
import { useRouter } from 'next/router';

const AppLayout = ( { Page, props } ) =>
{
    const router = useRouter()
    const { getLayout } = useContext( shopContext );

    function adminAuth ()
    {
        if ( !isAuthenticated() )
        {
            router.replace( "/auth/login" );
            return false;
        }
        return true
    }

    return (
        <>
            {
                CSR &&
                    // for now, only routes using admin layouts need auth
                    getLayout() === "shop" ?
                    <ShopLayout>
                        <Page { ...props } />
                    </ShopLayout> :

                    getLayout() === 'admin' && adminAuth() ?
                        <AdminTemplate>
                            <Page { ...props } />
                        </AdminTemplate>
                        : getLayout() === '' &&
                        <Page { ...props } />

            }

        </>
    );
}

export default AppLayout;
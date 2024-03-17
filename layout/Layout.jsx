import Meta from './Meta'
import Header from './Header'
import Footer from './Footer'
import GlobalState, { Context } from '../context/GlobalState'
import Notifcation from '../components/common/Notification'
import {PageLoadingIndicator} from '../components/common/LoadingIndicator'


export default function Layout({ children }) {

  const store = GlobalState()


    return (
        <>
            <Meta />
            <Context.Provider value={store}>
                <main className='flex flex-col min-h-screen '>
                    <Header/>
                    <Notifcation />
                    <div className='flex flex-grow bg-[#f7f7f7] min-h-[500px]'>
                        {/* {children} */}
                        {store.loading ? <PageLoadingIndicator /> : children}
                    </div>
                    <Footer/>
                </main>
            </Context.Provider>
        </>
    )
}
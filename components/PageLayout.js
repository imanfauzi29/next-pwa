import ThemedApp from "../gentelella/ThemedApp";
import AuthenticatedSidebar from "./AuthenticatedSidebar";
import TopNav from "../gentelella/TopNav";
import Footer from "../gentelella/Footer";
import {signOut } from 'next-auth/client'
import UiAvatars from "../utils/UiAvatars";
import Cookies from 'js-cookie';

export default function PageLayout({ children, session }) {
    return (
        <ThemedApp>
            <AuthenticatedSidebar session={session} />
            <TopNav session={session}>
                <li>
                    <a href='#' className='user-profile dropdown-toggle' data-toggle='dropdown'
                       aria-expanded='false'>
                        <img src={UiAvatars.url(session.user.name)} alt=''/>{session.user.name}

                    </a>
                    <ul
                        className="dropdown-menu dropdown-usermenu dropdown-menu-right"
                        style={{ left: '100px' }}>
                        <li
                            className="nav-item dropdown open"
                            style={{ paddingLeft: '15px' }}>
                            <button
                                className="dropdown-item"
                                onClick={() =>{
                                    Cookies.remove('preferences')
                                    signOut()
                                }}>
                                <i className="fa fa-sign-out pull-right" /> Log
                                Out
                            </button>
                        </li>
                    </ul>
                </li>
            </TopNav>
            {children}
            <Footer>
                &copy; {new Date().getFullYear()} LiFT Revamp - <a href="www.lifewood.com">www.lifewood.com</a>
            </Footer>
        </ThemedApp>
    );
}

import React from 'react';

import {toggleMenu} from './custom';
import dynamic from "next/dynamic"
import ButtonSwitchLanguage from "../components/ButtonSwitchLanguage"


const TopNav = ({children, session}) => (
    <div className="top_nav">
        <div className="nav_menu">
            <nav>
                <div className="nav toggle">
                    <a id="menu_toggle" onClick={toggleMenu}>
                        <i className="fa fa-bars"/>
                    </a>
                </div>

                <ul className="nav navbar-nav navbar-right">{children}</ul>
                <ul className="nav navbar-nav navbar-right">
                    <ButtonSwitchLanguage session={session}/>
                </ul>
            </nav>
        </div>
    </div>
);

export default TopNav;

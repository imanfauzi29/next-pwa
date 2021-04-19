import React from 'react';


//TODO: Check Token


const ThemedApp = ({children}) => (
    <div id='container' className='nav-md'>
        <div className='container body'>
            <div className='main_container'>
                {children}
            </div>
        </div>
    </div>
);

export default ThemedApp;


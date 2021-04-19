import React from 'react';

class PageRoles extends React.Component {   
    constructor(menu) {
        super(menu)
        this.menu = menu
    }

    checkPageRoles = (currentPath, sessionRoles) => {
        let expectedRoles = undefined
        if (this.menu != undefined || this.menu != null) {
            expectedRoles = this.menu[currentPath]
        }
        
        if (expectedRoles === undefined || sessionRoles === undefined) {
            return true;
        } else {
            return sessionRoles.some(r => expectedRoles.indexOf(r) >= 0);
        }
    }
}

export default PageRoles
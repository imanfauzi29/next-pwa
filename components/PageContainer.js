import React, {Component} from "react";
import Utils from "../utils/Utils";

export default class PageContainer extends Component {
    componentDidMount() {
        if (typeof window !== "undefined") {
            Utils.appendScript("/app/static/js/reinit-sidebar-menu.js")
        }
    }
    render() {
        return (
            <div className="right_col" role="main" style={{height: 'auto'}}>
                {this.props.children}
            </div>
        )
    }
}



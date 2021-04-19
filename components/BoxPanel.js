import React, {Component} from "react";
import { Button } from "react-bootstrap";

export default class BoxPanel extends Component {
    state = {
        isCollapsed: true
    }

    collapseFilter = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed})
    }
    render() {
        let hasTitle = typeof this.props.title !== "undefined";
        let hasPanelHeight = typeof this.props.panelHeight !== "undefined";
        let hasContentHeight = typeof this.props.contentHeight !== "undefined";
        let hasCollapsed = typeof this.props.collapsed !== "undefined";

        let title = hasTitle ? (
            <div className="x_title">
                <h2>{this.props.title}</h2>
                <div className="clearfix"/>
            </div>
        ) : ""

        let panelHeight = hasPanelHeight ? {height: this.props.panelHeight} : {}
        let contentHeight = hasContentHeight ? {height: this.props.contentHeight} : {}

        let icon = this.state.isCollapsed ? 'fa fa-chevron-down' : 'fa fa-chevron-up'

        let collapsed = hasCollapsed ? (
            <div className="x_title">
                <h2>{this.props.title}</h2>
                <ul className="nav navbar-right panel_toolbox">
                    <li>
                        <Button variant="link" size="sm" className="collapse-link text-secondary btn-default" onClick={this.collapseFilter}>
                            <i className={icon}></i>
                        </Button>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>
        ) : title

        return (
            
            <div className="x_panel" style={panelHeight}>
                {collapsed}
                <div className={`x_content ${this.state.isCollapsed && hasCollapsed ? 'collapse' : ''}`} style={contentHeight}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}



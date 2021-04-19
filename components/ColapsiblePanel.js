import React, {Component} from "react";

export default class CollapsiblePanel extends Component {

    onVisibilityChange = () => { 
        this.props.onVisibilityChange(!this.props.isExpanded)
    }

    render() {
        let icon = this.props.isExpanded ? 'fa fa-chevron-up' : 'fa fa-chevron-down'
        let contentVisibility = this.props.isExpanded ? {display: 'block'} : {display: 'none'}
        let heightPanel = this.props.isExpanded ? {} : {height: 'auto'}
        return (
            <div className="x_panel" style={heightPanel}>
                <div className="x_title">
                    <h2>{this.props.title}</h2>
                    <ul className="nav navbar-right panel_toolbox">
                        <li>
                            <a className="collapse-link" onClick={() => { 
                                this.onVisibilityChange()
                            }}>
                                <i className={icon}/>
                            </a>
                        </li>
                    </ul>
                    <div className="clearfix"/>
                </div>
                <div className="x_content" style={contentVisibility}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

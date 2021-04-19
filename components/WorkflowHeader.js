import React, {Component} from "react";

export default class WorkflowHeader extends Component {
     constructor(props) {
         super(props)

     }
    render() {
        return (
           <div className="nav_menu" >  
              {this.props.children}
           </div> 
        )
    }
}
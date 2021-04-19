import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import cellEditFactory from 'react-bootstrap-table2-editor'
import ReactDOM from 'react-dom'
export default class GridDataTable extends React.Component {

    render() {
        return (<div>
                <BootstrapTable 
                ref={ref => this._bootstraptable = ref}
                keyField='id'
                data={this.props.data} 
                wrapperClasses="table-responsive grid-wrap"
                classes="text-nowrap"
                columns={ this.props.columns }
                cellEdit={ cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    autoSelectText: true,
                    
                }) }
                 />
        </div>)
    }
}
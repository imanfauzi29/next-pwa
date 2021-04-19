import axios from 'axios'
import React from 'react'
import Form from 'react-jsonschema-form'
import DynamicForm from '../../services/DynamicForm'

class JSONSchema extends React.Component {
    constructor(props) {
        super(props)
        this.dynamicForm = new DynamicForm(props.session)
        this.state = {
            JSONSchema: {},
            UISchema: {},
            formData: {}
        }
    }

    componentDidMount() {
        let schema = this.props.schema
        this.setState({JSONSchema: schema})
        // this.dynamicForm.getForm().then(res => {
        //     let schema = JSON.parse(res.data.json_schema)
        //     this.setState({JSONSchema: schema})
        // })
        // this.dynamicForm.getContentTask().then(res => {
            
        //     console.log(res);
        //     let schema = JSON.parse(res.data.json_schema)
        //     let value = JSON.parse(res.data.json_value)
        //     this.setState({JSONSchema: schema, formData: value})
        // })
    }

    onSubmit = ({formData}, e) => {
        // let schema = JSON.stringify(this.state.JSONSchema)
        // let ui = JSON.stringify(this.state.UISchema)
        // let value = JSON.stringify(formData)
        // let body = {
        //     task_id: 4,
        //     small_batch_id: 2,
        //     content_id: 1,
        //     json_schema: schema,
        //     json_ui: ui,
        //     json_value: value
        // }

        // console.log(body);
        // this.dynamicForm.saveCurrentTask(body)
        // .then(res => {
        //     console.log(res);
        // })
    }

    render() {
        console.log(this.state);
        return (
            <>
            {/* {
            this.state.JSONSchema && <Form schema={this.state.JSONSchema} onSubmit={this.onSubmit} formData={this.state.formData} />
    } */}
    <Form schema={this.state.JSONSchema} onSubmit={this.onSubmit} formData={{dsada: "wes"}} />
            </>
        )
    }
}

export default JSONSchema

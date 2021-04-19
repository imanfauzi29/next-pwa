import React, {useState, useEffect} from 'react';
import t from "../../translator/helper";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import TaskTypeService from '../../services/TaskTypeService';
import ProjectService from '../../services/ProjectService';

export default function RequestTask(props) {
    const [projectList, setProjectList] = useState([])
    const [taskTypeList, setTaskTypeList] = useState([])
    const language = props.language
    const [projectId, setProjectId] = useState({})
    const [zeebeProcessId, setZeebeProcessId] = useState({})

    useEffect(() => {
        getTaskType()
    }, [])

    const getTaskType = () => {
        let taskTypeService = new TaskTypeService(props.session)
        taskTypeService.getTaskType("?page=1&perPage=100").then(res => {
            if (res.records != null) {
                let record = res.records
                let optionTaskType = []
                record.forEach(taskType => {
                    optionTaskType.push({label: `${taskType.task_type_id} - ${taskType.task_name}`, value: taskType.zeebe_process_id})
                });
                setTaskTypeList(optionTaskType)
            }
        })
    }

    const changeTaskType = (zeebeProcessId) => {
        setZeebeProcessId({zeebe_process_id: zeebeProcessId})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        props.onRequestTask(zeebeProcessId)
    }

    return (
            <Row>
              <Col sm={12} md={12} lg={12}>
              <Form >
                <Col sm={12} md={4} lg={4}>
                  <Form.Group>
                      <Form.Label>{t("filter:Select Task Type", props.language)}</Form.Label>
                      <Select
                          id="task_type"
                          name="task_type"
                          placeholder={`- ${t("filter:Select Task Type", props.language)} -`}
                          options={taskTypeList}
                          autosize={true}
                          isClearable={false}
                          classNamePrefix="select"
                          backspaceRemovesValue={false}
                          onChange={(selectedOption) => {
                              changeTaskType(selectedOption.value)
                          }}
                      />
                  </Form.Group>
                </Col>
                <Col sm={12} md={12} lg={12}>
                  <Form.Group>
                    <Button
                        size="sm"
                        type="button"
                        onClick={onSubmit}
                        variant="primary">
                        <i className="fa fa-plus-circle"/>{' '}{t("button:Request Task", language)}
                    </Button>
                  </Form.Group>
                </Col>
              </Form>
              </Col>
            </Row>
    )
}

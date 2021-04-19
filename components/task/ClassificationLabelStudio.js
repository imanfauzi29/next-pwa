import {LabelStudio} from "label-studio";
import React, { useEffect, useState } from "react";
import 'label-studio/build/static/css/main.css';
import UserTaskService from "../../services/UserTaskService";
import ProjectService from '../../services/ProjectService';
import EventBus from "eventing-bus";

const ClassificationLabelStudio = ({allPanels, classificationConfig, classificationtask, dataTask, session, totalSubmit}) => {
    const [config, setConfig] = useState([])
    const projectService = new ProjectService(session)
    const [user, setUser] = useState(session.user)
    let all = [
        "panel",
        "update",
        "controls",
        "side-column",
        "completions:menu",
        "completions:add-new",
        "completions:delete",
        "predictions:menu"
    ]
    let other = [
        "controls"
    ]

    const _prepData = function (c, includeId) {
        var completion = {
            lead_time: (new Date() - c.loadedDate) / 1000,  // task execution time
            result: c.serializeCompletion()
        };
        if (includeId) {
            completion.id = parseInt(c.id);
        }

        let completions = JSON.stringify({
            completions: [completion],
            predictions: [],
            data: {
                image: classificationtask.data.image
            },
            id: classificationtask.content_id,
            user:{
                pk: user.image.user.id,
                firstName: user.name,
                lastName: ""
            }
        })

        return completions;
    };

    const notifySubmit = (data) => {
        EventBus.publish('submitRow', data)
    }

    let label = LabelStudio('label-studio', {
        config: classificationConfig,

        interfaces: other,

        user: {
            pk: user.image.user.id,
            firstName: user.name,
            lastName: ""
        },
        task: classificationtask,

        onLabelStudioLoad: function (LS) {
            let c = LS.completionStore.addCompletion({
                userGenerate: true
            });
            LS.completionStore.selectCompletion(c.id);
        },

        onSubmitCompletion: function (ls, c) {
            ls.setFlags({isLoading: true});

            let payload = {
                task_id: dataTask.task_id,
                small_batch_id: dataTask.small_batch_id,
                content_id: parseInt(classificationtask.content_id),
                image: classificationtask.data.image,
                completion_json: _prepData(c)
            };

            let userTaskService = new UserTaskService(session)
            userTaskService.saveCurrentContentLabelStudio(payload).then(res => {
                let total = res.data.total_done
                let completion = JSON.parse(_prepData(c))
                let data = {total: total, completion: completion}
                ls.setFlags({isLoading: false})
                notifySubmit(data)
            })

        },

        updateCompletion: function (ls, completion) {
            console.log("on update")
            console.log(result)
        }
    });
    return (<div/>)
}


export default ClassificationLabelStudio
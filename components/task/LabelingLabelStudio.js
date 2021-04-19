import { LabelStudio } from "label-studio"
import React, { useEffect } from "react"
import UserTaskService from "../../services/UserTaskService"
import EventBus from "eventing-bus"

const LabelingLabelStudio = ({
    allPanels,
    labelingConfig,
    labelingTask,
    dataTask,
    session,
    totalTask
}) => {
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

    const user = session.user

    const _prepData = function (c, includeId) {
        let completion = {
            lead_time: (new Date() - c.loadedDate) / 1000, // task execution time
            result: c.serializeCompletion()
        }
        if (includeId) {
            completion.id = parseInt(c.id)
        }

        let completions = JSON.stringify({
            completions: [completion],
            predictions: [],
            data: {
                image: labelingTask.data.image
            },
            id: labelingTask.content_id,
            user: {
                pk: user.image.user.id,
                firstName: user.name,
                lastName: ""
            }
        })

        return completions
    }

    const notifySubmit = (data) => {
        EventBus.publish('submitRow', data)
    }

    let label = LabelStudio("label-studio", {
        config: labelingConfig,
        interfaces: all,

        user: {
            pk: user.image.user.id,
            firstName: user.name,
            lastName: ""
        },
        task: labelingTask,

        onLabelStudioLoad: function (LS) {
            let c = LS.completionStore.addCompletion({
                userGenerate: true
            })
            LS.completionStore.selectCompletion(c.id)
        },

        onSubmitCompletion: function (ls, c) {
            ls.setFlags({ isLoading: true })

            let payload = {
                task_id: dataTask.task_id,
                small_batch_id: dataTask.small_batch_id,
                content_id: parseInt(labelingTask.content_id),
                image: labelingTask.data.image,
                completion_json: _prepData(c)
            }

            let userTaskService = new UserTaskService(session)
            userTaskService.saveCurrentContentLabelStudio(payload).then(res => {
                ls.setFlags({isLoading: false})
                let data = {
                    labelingTask: JSON.parse(_prepData(c)),
                    totalDone: res.data.total_done
                }
                notifySubmit(data)
            })
        }
    })
    return <div />
}

export default LabelingLabelStudio

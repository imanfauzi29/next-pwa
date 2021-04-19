import {LabelStudio} from "label-studio";
import React, { useEffect, useState } from "react";
import 'label-studio/build/static/css/main.css';
import ProjectService from '../../services/ProjectService';
import EventBus from "eventing-bus";

const DataEntryLabelStudio = ({allPanels, classificationConfig, dataEntryTask, dataTask, session, totalSubmit, setLineHelper}) => {
    const [config, setConfig] = useState([])
    const [widthLineHelper, setWidthLineHelper] = useState(false)
    const [user, setUser] = useState(session.user)
    let all = [
        "update",
        "controls",
        "side-column",
    ]
    let other = [
        "controls",
    ]

    useEffect(() => {
        if (typeof document !== 'undefined') {
            let ctrlImage = document.getElementsByClassName("ImageView_block__3BAO-")
            ctrlImage[0].style.display = "none"

            let result = document.getElementsByClassName("App_menu__X-A5N")
            result[0].style.display = "none"

            let btnSubmit = document.getElementsByClassName("ls-submit-btn")
            btnSubmit.length === 0 ? btnSubmit : btnSubmit[0].style.display = "none"

            let btnUpdate = document.getElementsByClassName("ls-update-btn")
            btnUpdate.length === 0 ? btnUpdate : btnUpdate[0].style.display = "none"

            let lsTaskInfo = document.getElementsByClassName("ls-task-info")
            lsTaskInfo[0].style.display = "none"

            let lsSegment = document.getElementsByClassName("ls-segment")
            let lsWidth = lsSegment[0].clientWidth
            dataEntryTask.data.maxWidth = `${lsWidth}px`
            notifySetLineHelper(`${lsWidth}px`)
            
        }

    })

    const _prepData = function (c, includeId) {
        let completion = {
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
                image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/bee6c9a9-78f2-4294-ad27-6ca52060f5a5/dc6du5w-92b68c4d-c41c-44f2-9cdf-38ca4d895c99.jpg"
            },
            id: 1,
        })

        return completions;
    };

    const notifySubmit = (data) => {
        EventBus.publish('submitControl', data)
    }

    const notifySetLineHelper = (width) => {
        !widthLineHelper || setLineHelper ? () => {
            setWidthLineHelper(true)
            EventBus.publish('setWidthLineHelper', width)
        }: "";
    }

    let label = LabelStudio('label-studio', {
        config: `
        <View style="display: flex;">
            <View style="flex: 100%">
                <Image name="img" value="$image" maxWidth="$maxWidth" rotateControl="true" zoomControl="true" brightnessControl="true"></Image>
                <View style="display: none">
                <RectangleLabels name="tag" toName="img">
    <Label value="Planet" background="red"></Label>
    <Label value="Moonwalker" background="yellow"></Label>
    <Label value="sdsd" background="pink"></Label>
    <Label value="Tes" background="cyan"></Label>
    <Label value="Oposas"></Label>
    <Label value="KJsdsf" background="blue"></Label>
    <Label value="Isndsl"></Label>
    <Label value="jsdhfksdf" background="blue"></Label>
    <Label value="Ksjdksl"></Label>
    <Label value="sdfdsf" background="blue"></Label>
    <Label value="kdjsflsdf"></Label>
    <Label value="Jsdlsdsd" background="blue"></Label>
    <Label value="jfkdsfds"></Label>
    <Label value="OPksjds" background="blue"></Label>
    <Label value="sddsd"></Label>
    <Label value="sds" background="blue"></Label>
    <Label value="Tes" background="blue"></Label>
    <Label value="Oposas"></Label>
    <Label value="KJsdsf" background="blue"></Label>
    <Label value="Isndsl"></Label>
    <Label value="jsdhfksdf" background="blue"></Label>
    <Label value="Ksjdksl"></Label>
    <Label value="sdfdsf" background="blue"></Label>
    <Label value="kdjsflsdf"></Label>
    <Label value="Jsdlsdsd" background="blue"></Label>
    <Label value="jfkdsfds"></Label>
    <Label value="OPksjds" background="blue"></Label>
    <Label value="sddsd"></Label>
    <Label value="sds" background="blue"></Label>
    <Label value="Tes" background="blue"></Label>
    <Label value="Oposas"></Label>
    <Label value="KJsdsf" background="blue"></Label>
    <Label value="Isndsl"></Label>
    <Label value="jsdhfksdf" background="blue"></Label>
    <Label value="Ksjdksl"></Label>
    <Label value="sdfdsf" background="blue"></Label>
    <Label value="kdjsflsdf"></Label>
    <Label value="Jsdlsdsd" background="blue"></Label>
    <Label value="jfkdsfds"></Label>
    <Label value="OPksjds" background="blue"></Label>
    <Label value="sddsd"></Label>
    <Label value="sds" background="blue"></Label>
  </RectangleLabels>
</View>
            </View>
            </View>`,

        interfaces: all,

        user: {
            pk: user.image.user.id,
            firstName: user.name,
            lastName: ""
        },
        task: dataEntryTask,

        onLabelStudioLoad: function (LS) {
            let c = LS.completionStore.addCompletion({
                userGenerate: true
            });
            LS.completionStore.selectCompletion(c.id);
        },

        onSubmitCompletion: function (ls, c) {
            // ls.setFlags({isLoading: true});

            let payload = {
                // task_id: dataTask.task_id,
                // small_batch_id: dataTask.small_batch_id,
                // content_id: parseInt(classificationtask.content_id),
                // image: classificationtask.data.image,
                completion_json: _prepData(c)
            };

            notifySubmit(payload)

            // let userTaskService = new UserTaskService(session)
            // userTaskService.saveCurrentContentLabelStudio(payload).then(res => {
            //     let total = res.data.total_done
            //     let completion = JSON.parse(_prepData(c))
            //     let data = {total: total, completion: completion}
            //     ls.setFlags({isLoading: false})
            //     notifySubmit(data)
            // })

        },

        onUpdateCompletion: function (ls, c) {
            console.log(JSON.stringify(c))
            let payload = {
                completion_json: _prepData(c)
            };
            notifySubmit(payload)
        }
    });
    return (<div/>)
}


export default DataEntryLabelStudio
import {LabelStudio} from "label-studio";
import React, { useEffect, useState } from "react";
import 'label-studio/build/static/css/main.css';
import ProjectService from '../../services/ProjectService';
import EventBus from "eventing-bus";

const LabelStudioDataEntryImage = ({allPanels, classificationConfig, dataEntryTask, dataTask, session, totalSubmit, setLineHelper}) => {
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
            let lsWidth = lsSegment[0].clientWidth - 12
            dataEntryTask.data.maxWidth = `${lsWidth}px`
            notifySetLineHelper(`${lsWidth}px`)
            
        }

    })

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
        if (!widthLineHelper || setLineHelper) {
            setWidthLineHelper(true)
            EventBus.publish('setWidthLineHelper', width)
        }
    }

    let label = LabelStudio('label-studio', {
        config: `
        <View style="display: flex;">
            <View style="flex: 100%">
                <Image name="img" value="$image" maxWidth="$maxWidth" rotateControl="true" zoomControl="true" brightnessControl="true"></Image>
                <View style="display: none;">
                <RectangleLabels name="tag" toName="img">
                <Label value="Tes 0" hotkey="ctrl+alt+0"></Label><Label value="Tes 1" hotkey="ctrl+alt+1"></Label><Label value="Tes 2" hotkey="ctrl+alt+2"></Label><Label value="Tes 3" hotkey="ctrl+alt+3"></Label><Label value="Tes 4" hotkey="ctrl+alt+4"></Label><Label value="Tes 5" hotkey="ctrl+alt+5"></Label><Label value="Tes 6" hotkey="ctrl+alt+6"></Label><Label value="Tes 7" hotkey="ctrl+alt+7"></Label><Label value="Tes 8" hotkey="ctrl+alt+8"></Label><Label value="Tes 9" hotkey="ctrl+alt+9"></Label><Label value="Tes 10" hotkey="ctrl+alt+10"></Label><Label value="Tes 11" hotkey="ctrl+alt+11"></Label><Label value="Tes 12" hotkey="ctrl+alt+12"></Label><Label value="Tes 13" hotkey="ctrl+alt+13"></Label><Label value="Tes 14" hotkey="ctrl+alt+14"></Label><Label value="Tes 15" hotkey="ctrl+alt+15"></Label><Label value="Tes 16" hotkey="ctrl+alt+16"></Label><Label value="Tes 17" hotkey="ctrl+alt+17"></Label><Label value="Tes 18" hotkey="ctrl+alt+18"></Label><Label value="Tes 19" hotkey="ctrl+alt+19"></Label><Label value="Tes 20" hotkey="ctrl+alt+20"></Label><Label value="Tes 21" hotkey="ctrl+alt+21"></Label><Label value="Tes 22" hotkey="ctrl+alt+22"></Label><Label value="Tes 23" hotkey="ctrl+alt+23"></Label><Label value="Tes 24" hotkey="ctrl+alt+24"></Label><Label value="Tes 25" hotkey="ctrl+alt+25"></Label><Label value="Tes 26" hotkey="ctrl+alt+26"></Label><Label value="Tes 27" hotkey="ctrl+alt+27"></Label><Label value="Tes 28" hotkey="ctrl+alt+28"></Label><Label value="Tes 29" hotkey="ctrl+alt+29"></Label><Label value="Tes 30" hotkey="ctrl+alt+30"></Label><Label value="Tes 31" hotkey="ctrl+alt+31"></Label><Label value="Tes 32" hotkey="ctrl+alt+32"></Label><Label value="Tes 33" hotkey="ctrl+alt+33"></Label><Label value="Tes 34" hotkey="ctrl+alt+34"></Label><Label value="Tes 35" hotkey="ctrl+alt+35"></Label><Label value="Tes 36" hotkey="ctrl+alt+36"></Label><Label value="Tes 37" hotkey="ctrl+alt+37"></Label><Label value="Tes 38" hotkey="ctrl+alt+38"></Label><Label value="Tes 39" hotkey="ctrl+alt+39"></Label><Label value="Tes 40" hotkey="ctrl+alt+40"></Label><Label value="Tes 41" hotkey="ctrl+alt+41"></Label><Label value="Tes 42" hotkey="ctrl+alt+42"></Label><Label value="Tes 43" hotkey="ctrl+alt+43"></Label><Label value="Tes 44" hotkey="ctrl+alt+44"></Label><Label value="Tes 45" hotkey="ctrl+alt+45"></Label><Label value="Tes 46" hotkey="ctrl+alt+46"></Label><Label value="Tes 47" hotkey="ctrl+alt+47"></Label><Label value="Tes 48" hotkey="ctrl+alt+48"></Label><Label value="Tes 49" hotkey="ctrl+alt+49"></Label><Label value="Tes 50" hotkey="ctrl+alt+50"></Label><Label value="Tes 51" hotkey="ctrl+alt+51"></Label><Label value="Tes 52" hotkey="ctrl+alt+52"></Label><Label value="Tes 53" hotkey="ctrl+alt+53"></Label><Label value="Tes 54" hotkey="ctrl+alt+54"></Label><Label value="Tes 55" hotkey="ctrl+alt+55"></Label><Label value="Tes 56" hotkey="ctrl+alt+56"></Label><Label value="Tes 57" hotkey="ctrl+alt+57"></Label><Label value="Tes 58" hotkey="ctrl+alt+58"></Label><Label value="Tes 59" hotkey="ctrl+alt+59"></Label><Label value="Tes 60" hotkey="ctrl+alt+60"></Label><Label value="Tes 61" hotkey="ctrl+alt+61"></Label><Label value="Tes 62" hotkey="ctrl+alt+62"></Label><Label value="Tes 63" hotkey="ctrl+alt+63"></Label><Label value="Tes 64" hotkey="ctrl+alt+64"></Label><Label value="Tes 65" hotkey="ctrl+alt+65"></Label><Label value="Tes 66" hotkey="ctrl+alt+66"></Label><Label value="Tes 67" hotkey="ctrl+alt+67"></Label><Label value="Tes 68" hotkey="ctrl+alt+68"></Label><Label value="Tes 69" hotkey="ctrl+alt+69"></Label><Label value="Tes 70" hotkey="ctrl+alt+70"></Label><Label value="Tes 71" hotkey="ctrl+alt+71"></Label><Label value="Tes 72" hotkey="ctrl+alt+72"></Label><Label value="Tes 73" hotkey="ctrl+alt+73"></Label><Label value="Tes 74" hotkey="ctrl+alt+74"></Label><Label value="Tes 75" hotkey="ctrl+alt+75"></Label><Label value="Tes 76" hotkey="ctrl+alt+76"></Label><Label value="Tes 77" hotkey="ctrl+alt+77"></Label><Label value="Tes 78" hotkey="ctrl+alt+78"></Label><Label value="Tes 79" hotkey="ctrl+alt+79"></Label><Label value="Tes 80" hotkey="ctrl+alt+80"></Label><Label value="Tes 81" hotkey="ctrl+alt+81"></Label><Label value="Tes 82" hotkey="ctrl+alt+82"></Label><Label value="Tes 83" hotkey="ctrl+alt+83"></Label><Label value="Tes 84" hotkey="ctrl+alt+84"></Label><Label value="Tes 85" hotkey="ctrl+alt+85"></Label><Label value="Tes 86" hotkey="ctrl+alt+86"></Label><Label value="Tes 87" hotkey="ctrl+alt+87"></Label><Label value="Tes 88" hotkey="ctrl+alt+88"></Label><Label value="Tes 89" hotkey="ctrl+alt+89"></Label><Label value="Tes 90" hotkey="ctrl+alt+90"></Label><Label value="Tes 91" hotkey="ctrl+alt+91"></Label><Label value="Tes 92" hotkey="ctrl+alt+92"></Label><Label value="Tes 93" hotkey="ctrl+alt+93"></Label><Label value="Tes 94" hotkey="ctrl+alt+94"></Label><Label value="Tes 95" hotkey="ctrl+alt+95"></Label><Label value="Tes 96" hotkey="ctrl+alt+96"></Label><Label value="Tes 97" hotkey="ctrl+alt+97"></Label><Label value="Tes 98" hotkey="ctrl+alt+98"></Label><Label value="Tes 99" hotkey="ctrl+alt+99"></Label><Label value="Tes 100" hotkey="ctrl+alt+100"></Label><Label value="Tes 101" hotkey="ctrl+alt+101"></Label><Label value="Tes 102" hotkey="ctrl+alt+102"></Label><Label value="Tes 103" hotkey="ctrl+alt+103"></Label><Label value="Tes 104" hotkey="ctrl+alt+104"></Label><Label value="Tes 105" hotkey="ctrl+alt+105"></Label><Label value="Tes 106" hotkey="ctrl+alt+106"></Label><Label value="Tes 107" hotkey="ctrl+alt+107"></Label><Label value="Tes 108" hotkey="ctrl+alt+108"></Label><Label value="Tes 109" hotkey="ctrl+alt+109"></Label><Label value="Tes 110" hotkey="ctrl+alt+110"></Label><Label value="Tes 111" hotkey="ctrl+alt+111"></Label><Label value="Tes 112" hotkey="ctrl+alt+112"></Label><Label value="Tes 113" hotkey="ctrl+alt+113"></Label><Label value="Tes 114" hotkey="ctrl+alt+114"></Label><Label value="Tes 115" hotkey="ctrl+alt+115"></Label><Label value="Tes 116" hotkey="ctrl+alt+116"></Label><Label value="Tes 117" hotkey="ctrl+alt+117"></Label><Label value="Tes 118" hotkey="ctrl+alt+118"></Label><Label value="Tes 119" hotkey="ctrl+alt+119"></Label><Label value="Tes 120" hotkey="ctrl+alt+120"></Label><Label value="Tes 121" hotkey="ctrl+alt+121"></Label><Label value="Tes 122" hotkey="ctrl+alt+122"></Label><Label value="Tes 123" hotkey="ctrl+alt+123"></Label><Label value="Tes 124" hotkey="ctrl+alt+124"></Label><Label value="Tes 125" hotkey="ctrl+alt+125"></Label><Label value="Tes 126" hotkey="ctrl+alt+126"></Label><Label value="Tes 127" hotkey="ctrl+alt+127"></Label><Label value="Tes 128" hotkey="ctrl+alt+128"></Label><Label value="Tes 129" hotkey="ctrl+alt+129"></Label><Label value="Tes 130" hotkey="ctrl+alt+130"></Label><Label value="Tes 131" hotkey="ctrl+alt+131"></Label><Label value="Tes 132" hotkey="ctrl+alt+132"></Label><Label value="Tes 133" hotkey="ctrl+alt+133"></Label><Label value="Tes 134" hotkey="ctrl+alt+134"></Label><Label value="Tes 135" hotkey="ctrl+alt+135"></Label><Label value="Tes 136" hotkey="ctrl+alt+136"></Label><Label value="Tes 137" hotkey="ctrl+alt+137"></Label><Label value="Tes 138" hotkey="ctrl+alt+138"></Label><Label value="Tes 139" hotkey="ctrl+alt+139"></Label><Label value="Tes 140" hotkey="ctrl+alt+140"></Label><Label value="Tes 141" hotkey="ctrl+alt+141"></Label><Label value="Tes 142" hotkey="ctrl+alt+142"></Label><Label value="Tes 143" hotkey="ctrl+alt+143"></Label><Label value="Tes 144" hotkey="ctrl+alt+144"></Label><Label value="Tes 145" hotkey="ctrl+alt+145"></Label><Label value="Tes 146" hotkey="ctrl+alt+146"></Label><Label value="Tes 147" hotkey="ctrl+alt+147"></Label>
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


export default LabelStudioDataEntryImage
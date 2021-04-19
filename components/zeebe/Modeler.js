import Utils from "../../utils/Utils";

export default function ZeebeModeler({
                                         xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1u8bzd9" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.0.0-dev">
  <bpmn:process id="REPLACE_YOUR_PROCESS_ID" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1e2zfch">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="159" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
                                     }) {

    useEffect(() => {
        Utils.appendCss("/app/static/css/zeebe-modeler.css")
        Utils.appendCss("/app/static/css/bpmn-font/css/bpmn-embedded.css")
        Utils.appendCss("/app/static/css/diagram-js.css")
        Utils.appendScript("/app/static/js/zeebe-modeler.js")
    }, []);

    return (

        <div className="content with-diagram" id="js-drop-zone">
            <div className="message intro">
                <div className="note">
                    <textarea id="js-load-workflow" value={xml} style={{display: "none"}}
                              readOnly={true}/>
                </div>
            </div>
            <div className="message error">
                <div className="note">
                    <p>Ooops, we could not display the BPMN 2.0 diagram.</p>
                    <div className="details">
                        <span>Import Error Details</span>
                        <pre/>
                    </div>
                </div>
            </div>

            <div className="canvas" id="js-canvas"/>
            <div className="properties-panel-parent" id="js-properties-panel" style={{display: "none"}}/>
        </div>
    )
}

import React, {useEffect, useState} from "react";

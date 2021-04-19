import dynamic from 'next/dynamic';
import { Component } from 'react';
import SessionHelper from '../../utils/SessionHelper';
import BatchService from '../../services/BatchService';
import UserTaskService from '../../services/UserTaskService';
import ProjectService from '../../services/ProjectService';
import {Form} from "react-bootstrap";
import BoxPanel from "../../components/BoxPanel";
import Fullscreen from "react-full-screen";
import EventBus from "eventing-bus"
import Alerts from "../../utils/Alerts";

const LabelStudioDataEntryImage = dynamic(
    () => import("./LabelStudioDataEntryImage"),
    { ssr: false }
);
class DataEntryImage extends Component {
    static async getInitialProps(ctx) {
        let { idAssignTask } = ctx.query
        return { session: await SessionHelper.CheckSession(ctx), idAssignTask: idAssignTask};
    }

    constructor(props) {
        super(props)

        this.batchService = new BatchService(props.session)
        this.userTaskService = new UserTaskService(props.session)
        this.projectService = new ProjectService(props.session)
        this.state = {
            language: props.session.preferedLanguage,
            onFullScreen: {
                isFull: false,
                icon: "fa fa-expand"
            },
            onZoningImage: {
                icon: "fa-eye",
                hide: false,
            },
            lineHelper: {
                isShow: true,
                maxWidth: "1149px",
                setInitial: true
            },
            statCompletion: {
                isThereLs: false,
                countLabel: 0,
            },
            initialRotate: 0,
            dataEntryTask: {
                completions:[], 
                predictions:[], 
                data:{
                    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/bee6c9a9-78f2-4294-ad27-6ca52060f5a5/dc6du5w-92b68c4d-c41c-44f2-9cdf-38ca4d895c99.jpg"
                }, 
                id: 1
            }
        }

        EventBus.on("submitControl", this.handleSubmit)
        EventBus.on("setWidthLineHelper", this.setWidthLineHelper)
        EventBus.on("eventAttributeLabel", this.dispatchEventKeyboard)

    }

    componentDidMount() {

    }

    componentDidUpdate() {
    }

    handleSubmit = (data) => {
        let dataTask = JSON.parse(data.completion_json)
        // dataTask[0].result[0].value.rotation = 90

        this.setState({ 
            dataEntryTask: dataTask
        });
    }

    dispatchEventKeyboard = (indexCode) => {
        if (typeof document !== 'undefined') {
            let eventLabel = document.getElementsByClassName("ant-tag")
            eventLabel[indexCode].click();
        }
    }

    checkStatusLsCompletion = () => {
        let lsCompletion = this.state.dataEntryTask
        let isCompletion = lsCompletion.completions.length > 0 && lsCompletion.completions[0].result.length > 0
        let statusCompletion = false

        if (isCompletion) {
            let statCompletion = this.state.statCompletion
            statCompletion.isThereLs = true
            statCompletion.countLabel = lsCompletion.completions.length > 0 ? lsCompletion.completions[0].result.length : 0
            // this.setState({statCompletion: statCompletion})
            statusCompletion = true
        } else {
            statusCompletion = false
        }

        return statusCompletion
    }

    /**
     * 
     * This bottom is function for image control 
     */
    onSelectLineImg = (isHide) => {
        this.setValueLabeling()
        this.setState({ 
            lineHelper: { isShow: isHide}
        })
    }

    onFullScreen = () => {
        let stateFS = this.state.onFullScreen
        this.setValueLabeling()
        !stateFS.isFull ? this.setState({
            onFullScreen: {
                isFull: true, 
                icon: "fa fa-compress"
            }
        }) : this.setState({
            onFullScreen: {
                isFull: false, 
                icon: "fa fa-expand"
            }
        })
    };

    setValueLabeling = () => {
        if (typeof document !== 'undefined') {
            let setSubmit = document.querySelector(".ls-submit-btn")
            if (setSubmit === null) {
                document.querySelector(".ls-update-btn").click()
            } else {
                setSubmit.click()
            }
        }
    }

    onZoningImage = (isHide) => {
        if (typeof document !== 'undefined') {
            let stateZonImage = this.state.onZoningImage
            stateZonImage.hide = isHide
            
            if (isHide === true) {
                let active = document.querySelectorAll(".anticon-eye")
                for (const i of Array(active.length).keys()) {
                    active[i].click()
                }
                stateZonImage.icon = "fa-eye-slash"
            } else if (isHide === false) {
                let nonActive = document.querySelectorAll(".anticon-eye-invisible")
                for (const i of Array(nonActive.length).keys()) {
                    nonActive[i].click()
                }
                stateZonImage.icon = "fa-eye"
            }
        }
    }

    onPanImage = () => {
        if (typeof document !== "undefined") {
           document.querySelector(".anticon-drag").click()
        }
    }

    onZoomIn = () => {
        if (typeof document !== "undefined") {
            document.querySelector(".anticon-zoom-in").click()
         }
    }

    onZoomOut = () => {
        if (typeof document !== "undefined") {
            document.querySelector(".anticon-zoom-out").click()
         }
    }

    onBrightness = (e) => {
        if (typeof document !== "undefined") {
            let img = document.getElementsByTagName("img")
            img[5].style.filter = `brightness(${e.target.value}%)`
        }
    }

    onRotateRight = () => {
        if (typeof document !== "undefined") {
            this.checkStatusLsCompletion() ? Alerts.withUserConfirmation(`You have ${this.state.statCompletion.countLabel} label on image rotation ${this.state.initialRotate}deg, Change rotation will impact labels position not correct, If you prefer to continue please adjust existing label`, () => {
                document.querySelector(".anticon-rotate-right").click()
            }, "en", "warning", "Title") : document.querySelector(".anticon-rotate-right").click()
        }
    }

    onRotateLeft = () => {
        if (typeof document !== "undefined") {
            this.checkStatusLsCompletion() ? Alerts.withUserConfirmation(`You have ${this.state.statCompletion.countLabel} label on image rotation ${this.state.initialRotate}deg, Change rotation will impact labels position not correct, If you prefer to continue please adjust existing label`, () => {
                document.querySelector(".anticon-rotate-left").click()
            }, "en", "warning") : document.querySelector(".anticon-rotate-left").click()
        }
    }

    setWidthLineHelper = (value) => {
        let stLineHelper = this.state.lineHelper
        stLineHelper.maxWidth = value
        stLineHelper.setInitial = false
        
        this.setState({ 
            lineHelper: stLineHelper
        })
    }

    render() {
        let hrDisplay = this.state.lineHelper.isShow
        let heightImageLabel = (this.props.heightDE * 85) / 100
        return (
            <Fullscreen
            onChange={isFull => {
                let stLineHelper = this.state.lineHelper
                stLineHelper.setInitial = true

                isFull ? this.setState({
                    lineHelper: stLineHelper,
                    onFullScreen: {
                        isFull: isFull, 
                        icon: "fa fa-compress"
                    }
                }) : this.setState({
                    lineHelper: stLineHelper,
                    onFullScreen: {
                        isFull: isFull, 
                        icon: "fa fa-expand"
                    }
                })
            }}
            enabled={this.state.onFullScreen.isFull} >
                <div className="image-control-panel d-flex" style={{boxShadow: "2px 2px 5px #bdc7c9", height: "50px"}}>
                    <div className="btn-group" style={{borderRight: "1px solid #a2b29f", borderWidth: "thin"}}>
                        <button className="btn btn-sm btn-default ant-btn-drag" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onPanImage}
                                data-original-title="Move Image">
                            <i className="fa fa-arrows-alt"></i>
                        </button>
                        <button className="btn btn-sm btn-default ant-btn-zoom-in" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onZoomIn}
                                data-original-title="Zoom In">
                            <i className="fa fa-search-plus"></i>
                        </button>
                        <button className="btn btn-sm btn-default ant-btn-zoom-out" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onZoomOut}
                                data-original-title="Zoom Out">
                            <i className="fa fa-search-minus"></i></button>
                        <button className="btn btn-sm btn-default ant-btn-rotate-left" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onRotateLeft}
                                data-original-title="Rotate Left">
                            <i className="fa fa-rotate-left"></i>
                        </button>
                        <button className="btn btn-sm btn-default ant-btn-rotate-right" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onRotateRight}
                                data-original-title="Rotate Right">
                            <i className="fa fa-rotate-right"></i>
                        </button>
                        <button className="btn btn-sm btn-default ant-btn-increase" type="button"
                                data-placement="top" data-toggle="tooltip"
                                data-original-title="Increase Image">
                            <i className="fa fa-file-image-o increase-45"></i>
                        </button>
                        <button className="btn btn-sm btn-default ant-btn-decrease" type="button"
                                data-placement="top" data-toggle="tooltip"
                                data-original-title="Descrease Image">
                            <i className="fa fa-file-image-o decrease-45"></i>
                        </button>
                        <input type="range" step="1" min="0" max="400" id="brightness" onChange={this.onBrightness} defaultValue={"100"}  />
                        <button className="btn btn-sm btn-default ant-btn-fullscreen" type="button"
                                data-placement="top" data-toggle="tooltip"
                                onClick={this.onFullScreen}
                                data-original-title="Fullscreen Image">
                            <i className={this.state.onFullScreen.icon}></i>
                        </button>
                    </div>
                    <div className="btn-group" style={{marginLeft: "10px", marginRight: "10px", padding: "10px"}}>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Line on Image" onClick={() => {
                                this.onSelectLineImg(!this.state.lineHelper.isShow)
                            }} checked={this.state.lineHelper.isShow} />
                        </Form.Group>
                    </div>
                    <div className="btn-group"style={{borderLeft: "1px solid #a2b29f", marginLeft: "10px", padding: "10px"}}>
                        <Form.Group>
                            <Form.Check type="checkbox" style={{marginLeft:"10px"}} label="Hide Label on Image" 
                            onClick={() => {
                                this.onZoningImage(!this.state.onZoningImage.hide)
                            }} />
                        </Form.Group>
                    </div>
                </div>
                <div style={{position: "relative", overflow: "hidden"}}>
                    <hr className="hr-data-entry" style={{background: hrDisplay ? "#e84545": "", width: "100%", maxWidth: this.state.lineHelper.maxWidth, marginLeft: "0px"}}></hr>
                    <div id="label-studio" className="fixed" style={{height: `${heightImageLabel}px`}}>
                        <LabelStudioDataEntryImage
                            dataEntryTask={this.state.dataEntryTask}
                            setLineHelper={this.state.lineHelper.setInitial}
                            session={this.props.session}/>
                    </div>
                </div>
            </Fullscreen>
        );
    }
}

export default DataEntryImage;

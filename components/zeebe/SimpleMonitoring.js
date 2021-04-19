import Iframe from "react-iframe";
import "./SimpleMonitoring.module.css"

export default function ZeebeSimpleMonitoring() {
    return (<Iframe url="https://zeebemonitoring.lifewood.dev/"
                    width="100%"
                    height="100%"
                    id="myId"
                    className="zeebe-simple-monitor"
                    display="initial"
                    position="relative"/>)
}

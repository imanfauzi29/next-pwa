import Sidebar from "../../gentelella/Sidebar";
import React from "react";

const FileManagerMenu = () => {
    return (
        <Sidebar.Menu.Section title='Master'>.
            <Sidebar.Menu.Item icon="home" url="/" title="Home"/>

            <Sidebar.Menu.Section.Category icon='file' title='File Management'>
                <Sidebar.Menu.Item url="/fm/Batch" title="Batch"/>
            </Sidebar.Menu.Section.Category>
        </Sidebar.Menu.Section>
    )
}

export default FileManagerMenu
import Sidebar from "../../gentelella/Sidebar";
import React from "react";

const SiteManagerMenu = () => {
    return (
        <Sidebar.Menu.Section title='Master'>.
            <Sidebar.Menu.Item icon="home" url="/" title="Home"/>
        </Sidebar.Menu.Section>
    )
}

export default SiteManagerMenu
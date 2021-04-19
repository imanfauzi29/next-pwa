import Sidebar from "../../gentelella/Sidebar";
import React from "react";

const AdministratorMenu = ({}) => {
    return (
        <Sidebar.Menu.Section title='Master'>.
            <Sidebar.Menu.Item icon="home" url="/" title="Home"/>

            <Sidebar.Menu.Section.Category icon='briefcase' title='Projects Management'>
                <Sidebar.Menu.Item url="/project" title="Projects"/>
                <Sidebar.Menu.Item url="/project/attributes" title="Projects Attribute"/>
                <Sidebar.Menu.Item url="/workflow" title="Workflow"/>
            </Sidebar.Menu.Section.Category>

            <Sidebar.Menu.Section.Category icon='map-marker' title='Site Management'>
                <Sidebar.Menu.Item url="/site" title="Site"/>
                <Sidebar.Menu.Item url="/site-manager" title="Site Manager"/>
            </Sidebar.Menu.Section.Category>

            <Sidebar.Menu.Section.Category icon='file' title='File Management'>
                <Sidebar.Menu.Item url="/file-management/batch" title="Batch"/>
            </Sidebar.Menu.Section.Category>

            <Sidebar.Menu.Section.Category icon='cogs' title='System'>
                <Sidebar.Menu.Item url="/workflow/monitoring" title="Monitoring Workflow"/>
                <Sidebar.Menu.Item url="/task-type" title="Task Type" />
            </Sidebar.Menu.Section.Category>

            <Sidebar.Menu.Section.Category icon='users' title='User Management'>
                <Sidebar.Menu.Item url="/user" title="User"/>
                <Sidebar.Menu.Item url="/permission" title="Permissions"/>
                <Sidebar.Menu.Item url="/role" title="Roles"/>
            </Sidebar.Menu.Section.Category>
        </Sidebar.Menu.Section>
    )
}

export default AdministratorMenu
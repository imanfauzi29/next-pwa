import Sidebar from "../gentelella/Sidebar"
import React, {useEffect, useState} from "react"
import t from "../translator/helper"
import UiAvatars from "../utils/UiAvatars"
import PreferencesHelper from "../utils/PreferencesHelper";
import translateColumn from "../translator/columns";

const AuthenticatedSidebar = ({ session }) => {
    //TODO: role based menu
    // let role = state.state.getState().auth.role
    let logo = <i className="fa fa-cloud-upload" />
    let roles = session.user.image.roles
    let menu = session.user.image.menu
    const [lang, setLang] = useState(session.preferedLanguage);

    useEffect(() => {
        let lang = PreferencesHelper.getLanguagePreferencesFromCookie(lang)
       setLang(lang)
    },[]);



    return (
        <Sidebar>
            <Sidebar.Title logo={logo} title="LiFT Revamp" />
            <div className="clearfix" />
            <Sidebar.Profile
                avatar={UiAvatars.url(session.user.name)}
                name={session.user.name}
                session={session}
                role={roles.join("/")}
                language={lang}
            />
            <br />

            <Sidebar.Menu>
                <Sidebar.Menu.Section title={t("menu:Master", lang)}>
                    <Sidebar.Menu.Item
                        icon="home"
                        roles={roles}
                        menu={menu}
                        url="/dashboard"
                        title={t("menu:Home", lang)}
                    />
                    <Sidebar.Menu.Item
                        icon="tasks"
                        roles={roles}
                        menu={menu}
                        url="/my-task"
                        title={t("menu:My Task", lang)}
                    />
                    <Sidebar.Menu.Section.Category
                        icon="briefcase"
                        title={t("menu:Projects Management", lang)}>
                        <Sidebar.Menu.Item
                            roles={roles}
                            url="/project"
                            menu={menu}
                            title={t("menu:Projects", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/project/attributes"
                            title={t("menu:Project Attribute", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/workflow"
                            title={t("menu:Workflow", lang)}
                        />
                    </Sidebar.Menu.Section.Category>
                    <Sidebar.Menu.Section.Category
                        icon="map-marker"
                        title={t("menu:Site Management", lang)}>
                        <Sidebar.Menu.Item
                            roles={roles}
                            url="/site"
                            menu={menu}
                            title={t("menu:Site", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            url="/site-manager"
                            menu={menu}
                            title={t("menu:Site Manager", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/site-user"
                            title={t("menu:Site User", lang)}
                        />
                    </Sidebar.Menu.Section.Category>
                    <Sidebar.Menu.Section.Category
                        icon="file"
                        title={t("menu:File Management", lang)}>
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/file-management/batch"
                            title={t("menu:Batch", lang)}
                        />
                    </Sidebar.Menu.Section.Category>
                    <Sidebar.Menu.Section.Category
                        icon="cogs"
                        title={t("menu:System", lang)}>
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/workflow/monitoring"
                            title={t("menu:Monitor Workflow", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/task-type"
                            title={t('menu:Task Type', lang)}
                        />
                    </Sidebar.Menu.Section.Category>
                    <Sidebar.Menu.Section.Category
                        icon="users"
                        title={t("menu:User Management", lang)}>
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/user"
                            title={t("menu:User", lang)}
                        />
                        <Sidebar.Menu.Item
                            roles={roles}
                            menu={menu}
                            url="/role"
                            title={t("menu:Role", lang)}
                        />
                    </Sidebar.Menu.Section.Category>
                </Sidebar.Menu.Section>
            </Sidebar.Menu>

            <Sidebar.Footer>
                {/* <Sidebar.Footer.Entry
                    icon="cog"
                    title={t("menu:Setting", lang)}
                />
                <Sidebar.Footer.Entry
                    icon="fullscreen"
                    title={t("menu:Fullscreen", lang)}
                />
                <Sidebar.Footer.Entry
                    icon="eye-close"
                    title={t("menu:Lock", lang)}
                />
                <Sidebar.Footer.Entry
                    icon="off"
                    title={t("menu:Logout", lang)}
                /> */}
                    <div className="w-100 text-center py-2" style={{backgroundColor: "#172D44", fontSize: "12px"}}>App version {process.env.APP_VERSION}</div>
            </Sidebar.Footer>
        </Sidebar>
    )
}
export default AuthenticatedSidebar

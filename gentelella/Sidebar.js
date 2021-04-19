import React from "react"
import Link from "next/link"
import PageRoles from "../utils/roles/AppRoles"
import t from "../translator/helper"

const Title = ({ logo, title }) => (
    <div className="navbar nav_title" style={{ border: 0 }}>
        <Link href="/">
            <a className="site_title">
                {logo} <span>{title}</span>
            </a>
        </Link>
    </div>
)

const Profile = ({ avatar, name, role, language }) => (
    <div className="profile clearfix">
        <div className="profile_pic">
            <img src={avatar} alt="..." className="img-circle profile_img" />
        </div>
        <div className="profile_info">
            <span>{t("common:Welcome", language)},</span>
            <h2>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</h2>
            <h2>
                {t("common:As", language)} {role}
            </h2>
        </div>
        <div className="clearfix"></div>
    </div>
)

const Footer = ({ children }) => (
    <div className="sidebar-footer hidden-small">{children}</div>
)

const Entry = ({ icon, title }) => {
    const className = `glyphicon glyphicon-${icon}`

    return (
        <a data-toggle="tooltip" data-placement="top" title={title}>
            <span className={className} aria-hidden="true" />
        </a>
    )
}
Footer.Entry = Entry

const Menu = ({ children }) => (
    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
        {children}
    </div>
)

const Section = ({ children, title }) => (
    <div className="menu_section">
        <h3>{title}</h3>
        <ul className="nav side-menu">{children}</ul>
    </div>
)
Menu.Section = Section

const Category = ({ children, icon, title }) => {
    const iconClass = `fa fa-${icon}`

    return (
        <li>
            <a>
                <i className={iconClass} /> {title}{" "}
                <span className="fa fa-chevron-down" />
            </a>
            <ul className="nav child_menu">{children}</ul>
        </li>
    )
}
Menu.Section.Category = Category

const MenuItem = ({ icon, url, title, roles, menu }) => {
    const iconClass = `fa fa-${icon}`
    // TODO: Warning: Extra attributes from the server: class
    // Reason: after page loaded auto add class="current=page" at li
    const pageRole = new PageRoles(menu)
    let hasPermissions = pageRole.checkPageRoles(url, roles)

    return hasPermissions ? (
        <li>
            <Link href={url}>
                <a>
                    <i className={iconClass} /> {title}
                </a>
            </Link>
        </li>
    ) : (
        ""
    )
}

Menu.Item = MenuItem

const Sidebar = ({ children }) => (
    <div className="col-md-3 left_col">
        <div className="left_col scroll-view">{children}</div>
    </div>
)

Sidebar.Title = Title
Sidebar.Profile = Profile
Sidebar.Footer = Footer
Sidebar.Menu = Menu

export default Sidebar
export { Footer, Menu, Profile, Title, MenuItem }

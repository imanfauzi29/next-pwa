import Router from "next/dist/next-server/server/router";
import {getSession} from "next-auth/client";
import PageRoles from "./roles/AppRoles";
import PreferencesHelper from "./PreferencesHelper";


export default class SessionHelper {
    static async CheckSession(ctx) {
        const session = await getSession(ctx)
        let isNoSession = session == null || session.user == null || session.user.image == null;
        if (isNoSession) {
            let isClient = typeof window !== 'undefined'
            if (isClient) {
                Router.push('/app/auth/login')
            } else {
                ctx.res.writeHead(302, {Location: '/app/auth/login'}).end()
            }
        }
        let roles = session.user.image.roles;
        let currentPath = ctx.pathname
        let revampMenu = session.user.image.menu
        let pageRoles = new PageRoles(revampMenu);
        const hasRoles = pageRoles.checkPageRoles(currentPath, roles);

        let operator = roles.indexOf("Operation")
        if (operator >= 0 && !hasRoles) {
            ctx.res.writeHead(302, {Location: '/app/my-task'}).end()
        }
        if (!hasRoles) {
            ctx.res.writeHead(302, {Location: '/app/forbidden'}).end()
        }
        let newVar = await PreferencesHelper.persistUserPreference(ctx, session);
        return newVar
    }
}
import jsHttpCookie from "cookie";
import Cookies from "js-cookie";

export default class PreferencesHelper {

    static async persistUserPreference(ctx, userSession) {
        let {req, res} = ctx
        if (req && req.headers) {
            const cookies = req.headers.cookie;
            if (typeof cookies === 'string') {
                const cookie = jsHttpCookie.parse(cookies);
                if (cookie.preferences !== undefined) {
                    let pref = JSON.parse(cookie.preferences);
                    userSession.preferedLanguage = pref.language;
                } else {
                    userSession.preferedLanguage = userSession.user.image.user.lang
                }
            }
        } else {
            userSession.preferedLanguage = userSession.user.image.user.lang
        }

        return userSession
    }

    static getLanguagePreferencesFromCookie(defaultLang) {
        let preferences = Cookies.get('preferences');
        if (preferences === undefined) {
            Cookies.set('preferences', {language: defaultLang});
            return defaultLang
        } else {
            let parse = JSON.parse(preferences);
            return parse.language
        }
    }
}
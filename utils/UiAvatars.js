export default class UiAvatars {
    static url(name) {
        return `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`
    }
}